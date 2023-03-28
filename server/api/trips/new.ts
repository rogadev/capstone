import supabase from '~/server/db/supabase.ts';

export default defineEventHandler(async (event) => {
  const trip = await readBody(event);
  if (!trip) {
    return { status: 400, body: 'Request was missing trip details' };
  }
  try {
    const { error, data } = await supabase.from('trips').insert(trip);
    if (error) throw error;
    return { status: 200, body: data };
  } catch (e) {
    return { status: 500, body: e.message };
  }
  return {};
});