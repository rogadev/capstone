import supabase from "~~/server/db/supabase";
import type { CancellationNote } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const cancelationNote: CancellationNote = readBody(event);
  const response = await supabase.createCancellationNote(cancelationNote);
  return response;
});