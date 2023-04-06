import { PostgrestError } from "@supabase/supabase-js";
import supabase from "~/server/db";

export default defineEventHandler(async (event) => {
  console.log("Attempting to fetch all trips from the database...");
  try {
    // Use the supabase client to fetch all trips from the database
    const { data, error } = await supabase.from("trips").select("*") as { data: Trip[] | null; error: PostgrestError | null; };
    if (error) throw error;
    if (!data)
      return {
        status: 404,
        statusText: "No trips found.",
      };

    console.info('Successfully fetched all trips from the database. Returning data...');
    return data;
  } catch (error: PostgrestError | Error) {
    console.error('Supabase encountered an error fetching all trips from the database:', error);
    sendError(event, 'Error fetching trips. This was not expected.');
  }
});