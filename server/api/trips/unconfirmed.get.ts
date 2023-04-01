import supabase from "~/server/db/supabase";

// ✅ Working ✅
export default defineEventHandler(async (event) => {
  const trips = await supabase.fetchAllUnconfirmedTrips();
  return {
    statusCode: 200,
    body: JSON.stringify(trips),
  };
});