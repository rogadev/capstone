import supabase from '~/server/db/supabase.ts';

export default defineEventHandler(async (event) => {
  const trip = await readBody(event);
  if (!trip) {
    return { status: 400, body: 'Request was missing trip details' };
  }
  console.log(trip);
  try {
    const { error, data } = await supabase.from('Trips').insert(trip);
    if (error) {
      return { status: 500, body: error.message };
    }
    return { status: 200, body: data };
  } catch (e) {
    return { status: 500, body: e.message };
  }

  return {};
});