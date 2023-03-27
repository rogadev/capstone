import supabase from '~/server/db/supabase.ts';

export default defineEventHandler(async (event) => {
  const trip = await readBody(event);
  if (!trip) {
    return { status: 400, body: 'Request was missing trip details' };
  }
  console.log(trip);
  try {
    // update the trip in the database. 'confirmed' should be set to true now.
    const { data, error } = await supabase.from('Trips').update(trip).match({ id: trip.id });
    if (error) {
      return { status: 500, body: error.message };
    }
    return { status: 200, body: data };
  } catch (e) {
    console.log('An error occurred updating the trip', e.message);
    return { status: 500, body: e.message };
  }
});