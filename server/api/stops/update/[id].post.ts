import type { Stop } from '@prisma/client';
import { updateStop } from '~~/server/db/supabase';

export default defineEventHandler(async (event) => {
  const stop: Stop = event.context.params.id;
  const response = await updateStop(stop);
  return response;
});
