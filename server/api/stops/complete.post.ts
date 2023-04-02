import supabase from "~~/server/db";

export default defineEventHandler(async (event) => {
  // NOTE uses new supabase client directly exported from /server/db/index.ts
  const { id, note } = await readBody(event);
  const { error } = await supabase.from("stops").update({ notes: note, status: 'completed', closed: true }).eq("id", id);
  if (error) return { status: 500, body: error.message };
  return { status: 200, body: "ok" };
});