import { CompletionNote } from "@prisma/client";
import supabase from "~~/server/db";

export default defineEventHandler(async (event) => {
  const { id, note } = await readBody(event) as { id: string, note: string | null; };
  if (!id) return { status: 400, body: "Request was missing stop id parameter" };
  const stopId = parseInt(id);

  if (note) {
    console.info("Adding completion note to stop", stopId);
    const completionNote: CompletionNote = {
      stopId,
      note,
    };
    try {
      const { error } = await supabase.from("completion_notes").insert(completionNote) as { error: PostgrestError | null; };
      if (error) throw error;
    } catch (e: PostgrestError | Error) {
      console.error(`Error adding completion note to stop ${stopId}:`, e);
      sendError(event, "Error adding completion note to stop. This was not expected.");
    }
  }

  console.info("Updating stop", stopId);
  try {
    const { error } = await supabase.from("stops").update({ notes: note, status: 'completed', closed: true }).eq("id", id) as { error: PostgrestError | null; };
    if (error) throw error;
    console.info("Stop", stopId, "updated successfully");
    return setResponseStatus(200);
  } catch (e: PostgrestError | Error) {
    console.error(`Error updating stop ${stopId}:`, e);
    sendError(event, "Error updating stop. This was not expected.");
  }

});