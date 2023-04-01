import type { Stop, Trip, CompletionNote, CancelationNote } from '@prisma/client';

export const useStopStore = defineStore('auth', () => {
  const stops = ref<Stop[]>([]);
  const StopStatus = ["scheduled", "enroute", "arrived", "departed", "completed", "canceled"];

  // ✅ Working ✅
  const fetchStops = async () => {
    try {
      const response = await fetch('/api/stops');
      const { data } = await response.json();
      stops.value = data;
    } catch (error) {
      console.error(error);
    }
  };

  const getStopsForDate = (date: string) => {
    const relevantStops: Stop[] = [];
    for (const stop of stops.value) {
      if (stop.date === date) relevantStops.push(stop);
    }
    return relevantStops;
  };

  // Moves the stop status forward
  const incStopStatus = async (stop: Stop) => { };

  // Moves the stop status backward
  const decStopStatus = async (stop: Stop) => { };

  /**
   * Cancels a stop and updates the associated trip and any additional related stops
   * @param stop The stop to be cancelled
   * @param cancelationType The reason for the cancelation
   * @param notes Any notes related to the cancelation
   * @returns { success: boolean, error: Error }
   */
  const cancelStop = async (stop: Stop, cancelationType: string, notes: string = '') => {
    // Cancel Stop Validation
    if (!trip) throw new Error('useStopStore() - cancelStop() - Could not find trip with tripId:' + stop.tripId);
    if (!cancelationType) throw new Error('useStopStore() - cancelStop() - cancelationType is required');
    // Vars
    const errors = [];
    const tripId = stop.tripId;
    let trip: Trip;
    let stopsToUpdate: Stop[];
    let response: { data: Trip | Stop | CancelationNote | CompletionNote, error: Error; };
    // Fetch the trip associated to this stop
    try {
      response = await supabase.fetchTrip(tripId);
      if (response.error) throw response.error;
      trip = response.data;
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
    // Fetch all stops associated to this trip
    try {
      response = await supabase.fetchStops(tripId);
      if (response.error) throw response.error;
      stopsToUpdate = response.data;
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
    // Create the cancelation note
    const cancelationNote: CancelationNote = {
      tripId: trip.id,
      cancelationType,
      notes,
    };
    // Update the trip, stops, and create the cancelation note
    try {
      response = await supabase.updateTrip({ ...trip, closed: true, canceled: true });
      if (response.error) errors.push(response.error);

      for (const stop of stopsToUpdate) {
        if (stop.status !== 'cancelled') {
          response = await supabase.updateStop({ ...stop, status: 'cancelled' });
          if (response.error) errors.push(response.error);
          else stops.value = response.data;
        }
      }

      response = await supabase.createCancelationNote(cancelationNote);
      if (response.error) errors.push(response.error);

      if (errors.length > 0) throw new Error(errors.join(', '));
      else return { success: true, error: null };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    } finally {
      response = await supabase.fetchStops(tripId);
      if (response.error) console.error(response.error);
      else stops.value = response.data;
    }
  };

  const completeStop = async (stop: Stop, notes: string = '') => {
    let response: { data: Trip | Stop | CompletionNote, error: Error; };
    const tripId = stop.tripId;
    response = await supabase.fetchTrip(tripId);
    if (response.error) throw response.error;
    const trip = response.data as Trip;
    const completionNote: CompletionNote = {
      tripId,
      notes,
    };
    try {
      response = await supabase.updateTrip({ ...trip, closed: true });
      if (response.error) throw response.error;
      response = await supabase.updateStop({ ...stop, status: 'completed', closed: false });
      if (response.error) throw response.error;
      response = await supabase.createCompletionNote(completionNote);
      if (response.error) throw response.error;
      stops.value = response.data;
      return { success: true, error: null };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  };

  // TODO - Should add a stop to the database
  const addStop = async (stop: Stop) => { };

  return {
    stops,
    StopStatus,
    addStop,
    fetchStops,
    cancelStop,
    completeStop,
    incStopStatus,
    decStopStatus,
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