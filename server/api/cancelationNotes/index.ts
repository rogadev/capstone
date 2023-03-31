import { createCancelationNote } from "~~/server/db/supabase";
import type { CancelationNote } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const cancelationNote: CancelationNote = readBody(event);
  const response = await createCancelationNote(cancelationNote);
  return response;
});