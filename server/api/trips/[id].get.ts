import { Trip } from '@prisma/client';
import * as supabase from '~~/server/db/supabase';

export default defineEventHandler(async (event) => {
  const stripIdString = event.context.params.id;
  if (!stripIdString) sendError(event, 'Request to \'/api/trips/[id]\' was somehow missing parameter id');
  const tripID = parseInt(stripIdString);

  try {
    const { data, error } = await supabase.fetchTrip(tripID) as { data: Trip | null; error: PostgrestError | null; };
    if (error) throw error;
    if (!data) return setResponseStatus(404, `Trip with id ${tripID} not found`);
    console.info(`API fetched trip with id ${tripID} successfully. Responding with trip...`);
    return data;
  } catch (e: PostgrestError | Error) {
    console.error(`Error fetching trip with id ${tripID}:`, e);
    sendError(event, 'Error fetching trip. This was not expected.');
  }
});
