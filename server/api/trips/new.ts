import supabase from '~/server/db/supabase.ts';
import { errorLog } from '~~/server/utils/logging';

const { log } = console;
export default defineEventHandler(async (event) => {
  const trip = await readBody(event);
  if (!trip) {
    return { status: 400, body: 'Request was missing trip details' };
  }
  try {
    const { error, data } = await supabase.createTrip(trip);
    if (error) throw error;
    log("Message from '/api/trips/new': Trip added to database.");
    return { status: 200, body: data };
  } catch (e) {
    errorLog(e, 'Error in /api/trips/new.ts');
    return { status: 500, body: e.message };
  }
});