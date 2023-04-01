import supabase from '~~/server/db/supabase';

/**
 * Get all stops related to a given tripID
 */
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const tripID = event.context.params.id;
  const result = await supabase.fetchStops(tripID);
  return result;
});
