import supabase from "~~/server/db";

export default defineEventHandler(async (event) => {
  const tripID = event.context.params.id;
  console.log('deleting trip number', tripID);
  const { error } = await supabase.from("trips").delete().eq("id", tripID);
  console.log(error);
  if (error) return sendError(event, error.message);
  return { status: 200, body: "OK" };
});