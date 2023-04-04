import type { Stop } from '@prisma/client';
import * as supabase from '~~/server/db/supabase';

export default defineEventHandler(async (event) => {
  const stop = await readBody(event) as Stop;
  console.info('Updating stop', stop.id);
  try {
    const success = await supabase.updateStop(stop);
    if (!success) throw new Error('Update failed');
  } catch (e: Error) {
    console.error(`Error updating stop ${stop.id}:`, e);
    sendError(event, 'Error updating stop');
  }
});
