import * as supabase from '~/server/db/supabase';

export default defineEventHandler(async (event) => {
  const stopIdString = event.context.params.id;
  if (!stopIdString) return setResponseStatus(400, 'Request was missing stop id parameter');
  const stopId = parseInt(stopIdString);
  console.info('Fetching stop', stopId);
  try {
    const { data, error } = await supabase.fetchStop(stopId) as { data: Stop | null, error: PostgrestError | null; };
    if (error) throw error;
    if (!data) {
      console.error(`Stop ${stopId} not found. Responding with 404...`);
      return sendNoContent(event);
    }
    console.info('Stop fetched successfully');
    return { data };
  } catch (e: PostgrestError | Error) {
    console.error(`Error fetching stop ${stopId}:`, e);
    sendError(event, 'Error fetching stop. This was not expected.');
  }
});
