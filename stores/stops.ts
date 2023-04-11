import type { Stop, Trip, CompletionNote, CancelationNote } from '@prisma/client';

export const useStopStore = defineStore('stops', () => {

  const { log, error } = console;

  const stops = ref<Stop[]>([]);
  const StopStatus = ["scheduled", "enroute", "arrived", "departed", "completed", "canceled"];

  const sortedStops = computed(() => {
    if (!stops.value.length) return null;
    const sorted = stops.value.sort((a, b) => {
      return a.arrivalTime > b.arrivalTime ? 1 : -1;
    });
    return sorted;
  });

  const nextStop = computed(() => {
    if (!sortedStops.value.length) return null;
    const nextStop = sortedStops.value.find((stop) => stop.status !== "completed" && stop.status !== "canceled");
    return nextStop;
  });

  // TODO - extract all this store logic and put it in the component. Something is not working right and I feel like we're doing extra work for nothing.

  // ✅ Working ✅
  const fetchStops = async () => {
    try {
      // Responds with an array of open stops, or an empty array if all stops are closed.
      const response = await fetch('/api/stops/open');
      if (!response.ok) throw new Error(response.statusText);
      const openStops = await response.json() as Stop[];
      stops.value = openStops;
    } catch (e) {
      console.error(e, 'stores/stops.ts');
    }
  };

  const getStopsForDate = (date: Date | string) => {
    if (!stops.value) return [] as Stop[];
    const dateString = new Date(date).toISOString().split('T')[0];
    const relevantStops: Stop[] = [];
    for (const stop of stops.value) {
      if (stop.date === dateString) relevantStops.push(stop);
    }
    return relevantStops;
  };

  // Moves the stop status forward
  async function updateStopStatus(stop: Stop, status: 'scheduled' | 'enroute' | 'arrived' | 'completed' | 'canceled') {
    const previousClosedStatus = stop.closed;
    if (previousClosedStatus === 'canceled' || previousClosedStatus === 'completed') stop.closed = true;
    const updatedStop = { ...stop, status };
    // Expects stop object as body. Responds with 200 if the update was successful.
    const response = await fetch('/api/stops/update/one', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStop),
    });
    if (!response.ok) throw new Error(response.statusText);

    // Refresh the stops with a new fetch
    await fetchStops();
  };

  /**
   * Cancels a stop and updates the associated trip and any additional related stops
   * @param stop The stop to be cancelled
   * @param cancelationType The reason for the cancelation
   * @param notes Any notes related to the cancelation
   * @returns { success: boolean, error: Error }
   */
  async function cancelStop(stop: Stop, cancelationType: string, notes: string = '') {
    console.log("stopStore attempting to cancel stop", stop.id);
    const { tripId } = stop;
    console.log('Associated with trip', tripId);
    const tripObjectToUpdate: Trip | null = await fetchTrip(tripId);
    const stopsToUpdate: Stop[] = stops.value.filter((stop) => stop.tripId === tripId);
    const cancelationNote: CancelationNote = { tripId, cancelationType, notes, };

    // Update Trip
    console.log('Updating Trip', tripObjectToUpdate);
    const updatedTrip = { ...tripObjectToUpdate, closed: true, canceled: true };
    console.log('... to', updatedTrip);
    const { data, error } = await updateTrip(updatedTrip);
    if (error) throw error;
    console.log('Trip updated successfully', data.id);
    await fetchStops();
  }


  // TODO - we really only need the stop id. It would be better to refactor this accordingly and update the front end to align.
  /**
   * Completes a stop and updates the associated trip and any additional related stops
   * @param stop The stop to be completed
   * @param notes Any notes related to the completion
   * */
  async function completeStop(stop: Stop, notes: string) {
    // Responds with 200 if successful. Updates the stop and creates completion note in the db.
    const stopResponse = await fetch('/api/stops/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: stop.id, note: notes }),
    });
    if (!stopResponse.ok) throw new Error(stopResponse.statusText);
    // Evaluate if trip is fully complete.
    const { tripId } = stop;
    const relatedStops = stops.value.filter((s) => s.tripId === tripId);
    const bothStopsClosed = relatedStops.every((s) => s.closed === true);
    // if both stops are closed, update the trip to closed:
    if (bothStopsClosed) {
      const tripToUpdate: Trip = await fetchTrip(tripId);
      const updatedTrip = { ...tripToUpdate, closed: true, completed: true, notes };
      const tripUpdateResult = await updateTrip(updatedTrip);
    }
    // NOTE - No need to create completion note - our back end is doing this for us.

    // Refresh our stops data with a new fetch.
    await fetchStops();
  }

  async function fetchTrip(tripId: number) {
    log('Stops Store fetching trip', tripId);
    const response = await fetch(`/api/trips/${tripId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(response.statusText);
    await fetchStops();
  }

  async function updateTrip(trip: Trip) {
    log('updating trip', trip.id);
    const response = await fetch(`/api/trips/update/one`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trip),
    });
    if (!response.ok) throw new Error(response.statusText);
    await fetchStops();
  }

  return {
    stops,
    StopStatus,
    fetchStops,
    cancelStop,
    completeStop,
    getStopsForDate,
    updateStopStatus,
  };

});