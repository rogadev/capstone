import type { Trip } from '@prisma/client';
import { updateTrip } from '~~/server/db/supabase';

export default defineEventHandler(async (event) => {
  const trip: Trip = await readBody(event);
  const { data, error } = await updateTrip(trip);
  if (error) throw error;
  return { data, error };
});
