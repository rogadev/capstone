import { PostgrestError } from "@supabase/supabase-js";
import supabase from "~~/server/db";

export default defineEventHandler(async (event) => {
  const tripIdString = event.context.params.id;
  if (!tripIdString)
    return {
      status: 400,
      statusText: "Request must include trip id in the path. Expected path: /api/trips/{id}",
    };

  const tripID = parseInt(tripIdString);

  console.info(`Deleting trip with id ${tripID}...`);
  try {
    const { error } = await supabase.from("trips").delete().eq("id", tripID) as { error: PostgrestError | null; };
    if (error) throw error;
    console.info(`Trip with id ${tripID} deleted successfully.`);
    return {};
  } catch (e: PostgrestError | Error) {
    console.error(`Error deleting trip with id ${tripID}:`, e);
    sendError(event, "Error deleting trip. This was not expected.");
  }
});