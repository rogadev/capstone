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
    console.log("nextStop", nextStop);
    return nextStop;
  });

  // TODO - extract all this store logic and put it in the component. Something is not working right and I feel like we're doing extra work for nothing.

  // ✅ Working ✅
  const fetchStops = async () => {
    try {
      const response = await fetch('/api/stops');
      if (!response.ok) throw new Error(response.statusText);
      const { data } = await response.json();
      const openStops = data.filter((stop: Stop) => stop.closed === false);
      stops.value = openStops;
    } catch (e) {
      error(e, 'stores/stops.ts');
    }
  };

  // ✅ Working ✅
  const getStopsForDate = (date: string) => {
    if (!stops.value) return [];
    const relevantStops: Stop[] = [];
    for (const stop of stops.value) {
      if (stop.date === date) relevantStops.push(stop);
    }
    return relevantStops;
  };

  // Moves the stop status forward
  async function updateStopStatus(stop: Stop, status: 'scheduled' | 'enroute' | 'completed' | 'canceled') {
    const previousClosedStatus = stop.closed;
    if (previousClosedStatus === 'canceled' || previousClosedStatus === 'completed') stop.closed = true;
    const updatedStop = { ...stop, status };
    const response = await fetch('/api/stops/update/one', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStop),
    });
    if (response.error) console.error(response.error);
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
    log("stopStore attempting to cancel stop", stop.id);
    const { tripId } = stop;
    log('Associated with trip', tripId);
    const tripObjectToUpdate: Trip = await fetchTrip(tripId);
    const stopsToUpdate: Stop[] = stops.value.filter((stop) => stop.tripId === tripId);
    const cancelationNote: CancelationNote = { tripId, cancelationType, notes, };
    // ✅ Working ✅

    // Update Trip
    log('Updating Trip', tripObjectToUpdate);
    const updatedTrip = { ...tripObjectToUpdate, closed: true, canceled: true };
    log('... to', updatedTrip);
    const { data, error } = await updateTrip(updatedTrip);
    if (error) throw error;
    log('Trip updated successfully', data.id);
    await fetchStops();
  }

  // TODO
  // WIP - requires testing - It seems that the full trip is completing for some reason
  // Only one stop at a time should be completing.
  // I feel like I may have somehow accidentally made duplicate trips with duped ID's
  // But this definitely needs to be tested.
  async function completeStop(stop: stop, notes: string) {
    const { tripId } = stop;
    const tripToUpdate: Trip = await fetchTrip(tripId);
    const stopsToUpdate: Stop[] = stops.value.filter((stop) => stop.tripId === tripId);
    const updatedTrip = { ...tripToUpdate, closed: true, completed: true };
    const tripUpdateResult = await updateTrip(updatedTrip);
    // create completion note
    const completionNote: CompletionNote = { tripId, notes };
    // update stops
    const updatedStops = stopsToUpdate.map(async (stop) => {
      stop.status = 'completed';
      const response = await fetch('/api/stops/update/one', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stop),
      });
      if (!response.ok) throw new Error(response.statusText);
      return stop;
    });
    // Fetch all stops again with updated stop data.
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