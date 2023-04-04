import { Stop, Trip } from '@prisma/client';
import { PostgrestError } from '@supabase/supabase-js';
import * as supabase from '~/server/db/supabase';

export default defineEventHandler(async (event) => {
  const idString = event.context.params.id as string;
  const stopId = parseInt(idString);

  if (!stopId) return setResponseStatus(400, 'Request was missing stop id parameter');

  console.log(`Canceling stop ${stopId}...`);

  // fetch the stop data for this stop id
  console.info('Fetching stop data for stop', stopId);
  let stop: Stop;
  try {
    const { data, error } = await supabase.fetchStop(stopId) as { data: Stop | null, error: PostgrestError | null; };

    if (error) throw error;
    if (!data) {
      console.error(`Stop ${stopId} not found. Responding with 404...`);
      return sendNoContent(event, 404);
    }

    console.info('Stop data fetched successfully');
    stop = data;
  } catch (e: PostgrestError | Error) {
    console.error(`Error fetching stop data for stop ${stopId}:`, e);
    sendError(event, 'Error fetching stop data');
  }

  const tripID = stop.tripId;
  console.info('Fetching trip data for trip', tripID);

  // Fetch the trip data for this trip id
  let trip: Trip;
  try {
    const { data, error } = await supabase.fetchTrip(tripID) as { data: Trip | null, error: PostgrestError | null; };
    if (error) throw error;
    if (!data) {
      console.error(`Trip ${tripID} not found. Responding with 404...`);
      sendError(event, `No trip found for stop ${stopId}, with trip id ${tripID}. This was not expected.`);
    }
    console.info('Trip data fetched successfully');
    trip = data;
  } catch (e: PostgrestError | Error) {
    console.error(`Error fetching trip data for trip ${tripID}:`, e);
    sendError(event, 'Error fetching trip data. This was not expected.');
  }

  // Update trip to canceled status
  console.info('Updating trip', tripID, 'to canceled status');
  try {
    const successful = await supabase.updateTrip({ ...trip, status: 'canceled', closed: true, canceled: true });
    if (!successful) throw new Error('Update failed');
  } catch (e: Error) {
    console.error(`Error updating trip ${tripID} to canceled status:`, e);
    sendError(event, 'Error updating trip to canceled status. This was not expected.');
  }

  // Get the stops for this trip
  console.info('Fetching stops for trip', tripID);
  let stops: Stop[];
  try {
    const { data, error } = await supabase.fetchStops(tripID) as { data: Stop[], error: PostgrestError | null; };
    if (error) throw error;
    console.info('Stops fetched successfully');
    stops = data;
  } catch (e: Error | PostgrestError) {
    console.error(`Error fetching stops for trip ${tripID}:`, e);
    sendError(event, 'Error fetching stops for trip. This was not expected.');
  }

  // Update the trip
  console.info('Updating trip', tripID);
  try {
    const updatedTrip: Trip = { ...tripData, status: 'canceled', closed: true, canceled: true };
    const successful = await supabase.updateTrip(updatedTrip);
    if (!successful) throw new Error('Update failed');
    console.info('Trip updated successfully');
  } catch (e: Error) {
    console.error(`Error updating trip ${tripID}:`, e);
    sendError(event, 'Error updating trip. This was not expected.');
  }

  // Update the stops
  console.info('Updating stops for trip', tripID);
  for (const stop of stopsData) {
    try {
      stop.status = 'canceled';
      stop.closed = true;
      const successful = await supabase.updateStop(stop);
      if (!successful) throw new Error('Update failed');
    } catch (e: Error) {
      console.error(`Error updating stop ${stop.id}:`, e);
      sendError(event, 'Error updating stop. This was not expected.');
    }
  }
  console.info('Stops updated successfully');
  return setResponseStatus(200, 'Trip canceled successfully');
});