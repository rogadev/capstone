import supabase from "~/server/db/supabase";

// ✅ Working ✅
export default defineEventHandler(async (event) => {
  const trips = await supabase.fetchAllTrips();
  return {
    statusCode: 200,
    body: JSON.stringify(trips),
  };
});