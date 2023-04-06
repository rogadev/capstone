import { CompletionNote } from "@prisma/client";
import supabase from "~~/server/db";

export default defineEventHandler(async (event) => {
  const { id, note } = await readBody(event) as { id: string, note: string | null; };
  if (!id) return { status: 400, body: "Request was missing stop id parameter" };
  const stopId = parseInt(id);

  if (note) {
    console.info("Creating completion note for stop", stopId);
    const completionNote: CompletionNote = {
      stopId,
      note,
    };
    try {
      const { error } = await supabase.from("completion_notes").insert(completionNote) as { error: PostgrestError | null; };
      if (error) throw error;
    } catch (e: PostgrestError | Error) {
      console.error(`Error creating completion note for stop ${stopId}:`, e);
      sendError(event, "Error creating completion note. This was not expected.");
    }
  }

  console.info("Updating stop", stopId);
  try {
    const { error } = await supabase.from("stops").update({ notes: note, status: 'completed', closed: true }).eq("id", id) as { error: PostgrestError | null; };
    if (error) throw error;
    console.info("Stop", stopId, "updated successfully");
  } catch (e: PostgrestError | Error) {
    console.error(`Error updating stop ${stopId}:`, e);
    sendError(event, "Error updating stop. This was not expected.");
  }

  console.info("Checking if all stops for this trip are completed");
  try {
    const { data, error } = await supabase.from('stops').select('tripId').eq('id', stopId).single() as { data: { tripId: number; }[]; error: PostgrestError | null; };
    if (error) throw error;
    if (!data) throw new Error("No trip found for stop. This was unexpected, as we should absolutely have a stop for this id.");
    const tripId = data.tripId;
    console.log("Trip id for stop", stopId, "is", tripId);
    const { data: stops, error: stopsError } = await supabase.from('stops').select('id').eq('tripId', tripId) as { data: { id: number; }[]; error: PostgrestError | null; };
    if (stopsError) throw stopsError;
    if (!stops) throw new Error("No stops found for trip. This was unexpected, as we should absolutely have stops for this trip.");
    const stopIds = stops.map(s => s.id);
    console.log("Stop ids for trip", tripId, "are", stopIds);
    // are both stops completed?
    let stopsAreCompleted: boolean;
    const { data: completedStops, error: completedStopsError } = await supabase.from('stops').select('id').eq('tripId', tripId).eq('status', 'completed') as { data: { id: number; }[]; error: PostgrestError | null; };
    if (completedStopsError) throw completedStopsError;
    if (!completedStops) throw new Error("No completed stops found for trip. This was unexpected, as we should absolutely have completed stops for this trip.");
    const completedStopIds = completedStops.map(s => s.id);
    console.log("Completed stop ids for trip", tripId, "are", completedStopIds);
    stopsAreCompleted = completedStopIds.length === stopIds.length;
    console.log("Stops are completed?", stopsAreCompleted);
    if (stopsAreCompleted) {
      console.log("Marking trip", tripId, "as completed");
      const { error: tripError } = await supabase.from('trips').update({ closed: true }).eq('id', tripId) as { error: PostgrestError | null; };
      if (tripError) throw tripError;
    }
  } catch (e: PostgrestError | Error) {
    console.error(`Error checking if all stops for trip ${stopId} are completed:`, e);
    sendError(event, "Error checking if all stops for trip are completed. This was not expected.");
  }
  return {};
});
