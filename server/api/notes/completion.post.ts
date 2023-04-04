import supabase from '~~/server/db';
import type { CompletionNote } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const note = readBody(event) as CompletionNote;
  try {
    console.log('Creating completion note...');
    const { error } = await supabase.from('completion_notes').insert(note) as { error: PostgrestError | null; };
    if (error) throw error;
    return { statusCode: 200 };
  } catch (e: any) {
    console.error("'/api/notes/completion' encountered an error:", e);
    sendError(event, 'Error creating completion note');
  }
});