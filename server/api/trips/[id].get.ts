import { Trip, Stop } from '@prisma/client';
import supabase from '~~/server/db/supabase';

const { log } = console;
// ✅ Working ✅
export default defineEventHandler(async (event) => {
  const tripID = Number.parseInt(event.context.params.id);
  if (!tripID) return { status: 400, body: 'Request to \'/api/trips/[id]\' was missing parameter id' };
  log('API request to fetch trip with id', tripID);
  const { data, error } = await supabase.fetchTrip(tripID); // Will handle errors internally
  return { data, error };
});
