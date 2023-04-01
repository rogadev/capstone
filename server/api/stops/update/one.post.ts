import type { Stop } from '@prisma/client';
import supabase from '~~/server/db/supabase';

const { log } = console;
export default defineEventHandler(async (event) => {
  const stop: Stop = await readBody(event);
  log('API request to update stop:', stop.id);
  const response = await supabase.updateStop(stop);
  return response;
});
