import { Stop, Trip } from '@prisma/client';
import supabase from '~/server/db/supabase';

const { log } = console;

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  log('canceling trips and stops associated to stop', id);
  // fetch the stop data for this stop id
  log('fetching stop data for stop', id);
  const response = await supabase.fetchStop(id);
  if (response.error) sendError(response.error);
  const { data } = response;
  const stop: Stop = data;
  const tripID = stop.tripId;
  // Get the data for this trip
  log('fetching trip data for trip', tripID);
  const tripResponse = await supabase.fetchTrip(tripID);
  if (tripResponse.error) sendError(tripResponse.error);
  const { data: tripData } = tripResponse;
  const trip: Trip = tripData[0];
  // Get the stops for this trip
  log('fetching stops for trip', tripID);
  const stopsResponse = await supabase.fetchStops(tripID);
  if (stopsResponse.error) sendError(stopsResponse.error);
  const { data: stopsData } = stopsResponse;
  // Update the trip
  log('updating trip', tripID);
  const updatedTrip = { ...tripData, status: 'canceled', closed: true, canceled: true };
  const tripUpdateResponse = await supabase.updateTrip(updatedTrip);
  if (tripUpdateResponse.error) sendError(tripUpdateResponse.error);
  // Update the stops
  log('updating stops for trip', tripID);
  for (const stop of stopsData) {
    stop.status = 'canceled';
    stop.closed = true;
    const response = await supabase.updateStop(stop);
    if (response.error) sendError(event, response.error);
  }
  // ✅ Working ✅
  return { status: 200 };
});