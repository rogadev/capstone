import type { Stop, Trip, CompletionNote, CancelationNote } from '@prisma/client';

export const useStopStore = defineStore('auth', () => {
  const stops = ref<Stop[]>([]);
  const StopStatus = ["scheduled", "enroute", "arrived", "departed", "completed", "canceled"];

  // ✅ Working ✅
  const fetchStops = async () => {
    try {
      const response = await fetch('/api/stops');
      if (!response.ok) throw new Error(response.statusText);
      const { data } = await response.json();
      stops.value = data;
    } catch (error) {
      console.error(error);
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
    const updatedStop = { ...stop, status };
    const response = await fetch(`/api/stops/update/${stop.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStop),
    });
    if (response.error) console.error(response.error);
    else stops.value = response.data;
  };

  /**
   * Cancels a stop and updates the associated trip and any additional related stops
   * @param stop The stop to be cancelled
   * @param cancelationType The reason for the cancelation
   * @param notes Any notes related to the cancelation
   * @returns { success: boolean, error: Error }
   */
  async function cancelStop(stop: Stop, cancelationType: string, notes: string = '') {
    const { tripId } = stop;
    const tripToUpdate: Trip = await fetchTrip(tripId);
    const stopsToUpdate: Stop[] = stops.value.filter((stop) => stop.tripId === tripId);
    const cancelationNote: CancelationNote = { tripId, cancelationType, notes, };
    // ✅ Working ✅

    // Update Trip
    const updatedTrip = { ...tripToUpdate, closed: true, canceled: true };
    const tripUpdateResult = await updateTrip(updatedTrip);
    await fetchStops();

    // try {
    //   response = await fetch(`/api/trips/update/${tripId}`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ ...trip, closed: true, canceled: true }),
    //   });
    //   if (response.error) errors.push(response.error);

    //   for (const stop of stopsToUpdate) {
    //     if (stop.status !== 'cancelled') {
    //       response = await fetch(`/api/stops/update/${stop.id}`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ ...stop, status: 'cancelled' }),
    //       });
    //       if (response.error) errors.push(response.error);
    //       else stops.value = response.data;
    //     }
    //   }

    //   response = await fetch('/api/cancelationNotes', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(cancelationNote),
    //   });
    //   if (response.error) errors.push(response.error);

    //   if (errors.length > 0) throw new Error(errors.join(', '));
    //   else return { success: true, error: null };
    // } catch (error) {
    //   console.error(error);
    //   return { success: false, error };
    // } finally {
    //   response = await fetch('/api/stops');
    //   if (response.error) console.error(response.error);
    //   else stops.value = response.data;
    //   console.log(stops.value);
    // }
  };

  // const completeStop = async (stop: Stop, notes: string = '') => {
  //   let response: { data: Trip | Stop | CompletionNote, error: Error; };
  //   const tripId = stop.tripId;
  //   response = await supabase.fetchTrip(tripId);
  //   if (response.error) throw response.error;
  //   const trip = response.data as Trip;
  //   const completionNote: CompletionNote = {
  //     tripId,
  //     notes,
  //   };
  //   try {
  //     response = await supabase.updateTrip({ ...trip, closed: true });
  //     if (response.error) throw response.error;
  //     response = await supabase.updateStop({ ...stop, status: 'completed', closed: false });
  //     if (response.error) throw response.error;
  //     response = await supabase.createCompletionNote(completionNote);
  //     if (response.error) throw response.error;
  //     stops.value = response.data;
  //     return { success: true, error: null };
  //   } catch (error) {
  //     console.error(error);
  //     return { success: false, error };
  //   }
  // };

  // const addStop = async (stop: Stop) => {};

  async function fetchTrip(tripId: number) {
    const response = await fetch(`/api/trips/${tripId}`);
    if (response.error) throw response.error;
    const { data } = await response.json();
    return data[0];
  }

  async function updateTrip(trip: Trip) {
    const response = await fetch(`/api/trips/update/one`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trip),
    });
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return { data, error: null };
  }

  return {
    stops,
    StopStatus,
    // addStop,
    fetchStops,
    cancelStop,
    // completeStop,
    // incStopStatus,
    // decStopStatus,
    getStopsForDate,
  };
});




// async function incrementStop(stop: Stop) {
//   switch (stop.status) {
//     case StopStatus[0]:
//       stop.status = StopStatus[1];
//       break;
//     case StopStatus[1]:
//       stop.status = StopStatus[2];
//       break;
//     case StopStatus[2]:
//       stop.status = StopStatus[3];
//       break;
//     case StopStatus[3]:
//       stop.status = StopStatus[4];
//       break;
//     default:
//       break;
//   }
//   // Send data to update the database
//   // Render the change on the screen by modifying the stops ref
// }
// async function decrementStop(stop: Stop) {
//   switch (stop.status) {
//     case StopStatus[1]:
//       stop.status = StopStatus[0];
//       break;
//     case StopStatus[2]:
//       stop.status = StopStatus[1];
//       break;
//     case StopStatus[3]:
//       stop.status = StopStatus[2];
//       break;
//     case StopStatus[4]:
//       stop.status = StopStatus[3];
//       break;
//     default:
//       break;
//   }
//   // Send data to update the database
//   // Render the change on the screen by modifying the stops ref
// }
// async function toggleCancel(stop: Stop) {
//   if (stop.status === StopStatus[5]) {
//     stop.status = StopStatus[0];
//     // Send data to update the database
//     // Render the change on the screen by modifying the stops ref
//     return;
//   } else {
//     stop.status = StopStatus[5];
//     // Send data to update the database
//     // Render the change on the screen by modifying the stops ref
//   }
// }