import supabase from '~~/server/db';
import type { CompletionNote } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const note: CompletionNote = readBody(event);
  const { error } = await supabase.from('completion_notes').insert(note);
  if (error) sendError(event, error.message);
  return { statusCode: 200 };
});