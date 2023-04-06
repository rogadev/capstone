import { Trip } from "@prisma/client";
import * as supabase from "~/server/db/supabase";

export default defineEventHandler(async (event) => {
  console.log("Attempting to fetch all unconfirmed trips from the database...");
  try {
    const { data, error } = await supabase.fetchAllUnconfirmedTrips() as { data: Trip[] | null; error: PostgrestError | null; };
    if (error) throw error;
    if (!data)
      return {
        status: 404,
        statusText: "No unconfirmed trips found.",
      };

    console.info(`API fetched all unconfirmed trips successfully. Responding with trips...`);
    return data;
  } catch (error: PostgrestError | Error) {
    console.error(`Error fetching all unconfirmed trips:`, error);
    sendError(event, 'Error fetching all unconfirmed trips. This was not expected.');
  }
});