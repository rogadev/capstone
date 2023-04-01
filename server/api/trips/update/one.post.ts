import type { Trip } from '@prisma/client';
import supabase from '~~/server/db/supabase';

export default defineEventHandler(async (event) => {
  const trip: Trip = await readBody(event);
  const { data, error } = await supabase.updateTrip(trip) as { data: Trip | null; error: Error | null; };
  if (error) throw error;
  return { data, error };
});
