import supabase from '~~/server/db';

export default defineEventHandler(async (event) => {
  const tripIdString = event.context.params.id as string;
  const tripID = parseInt(tripIdString);
  try {
    const { error, data } = await supabase.from('stops').select('*').eq('tripId', tripID) as { error: PostgrestError | null, data: Stop[] | null; };
    if (error) throw error;
    if (!data) return sendNoContent(event);
    console.info(`Returning ${data.length} stops for trip ${tripID}...`);
    return { data };
  } catch (e: PostgrestError | Error) {
    console.error(`Error fetching stops for trip ${tripID}:`, e);
    sendError(event, 'Error fetching stops for trip');
  }
});
