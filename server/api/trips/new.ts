import supabase from '~/server/db/supabase.ts';

export default defineEventHandler(async (event) => {
  const trip = await readBody(event);
  if (!trip) {
    return { status: 400, body: 'Request was missing trip details' };
  }
  try {
    const { error, data } = await supabase.createTrip(trip);
    if (error) throw error;
    console.log("Message from '/api/trips/new': Trip added to database.");
    return { status: 200, body: data };
  } catch (e) {
    console.log("Message from '/api/trips/new': There was an error adding trip to database.", e.message);
    return { status: 500, body: e.message };
  }
  return {};
});