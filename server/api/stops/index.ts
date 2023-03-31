import supabase from '~/server/db/supabase';

// ✅ Working ✅
export default defineEventHandler(async (event) => {
  const response = await supabase.fetchAllStops();
  if (response.error) console.error(response.error);
  const { data } = response;
  const stops = data.filter((stop) => stop.closed === false);
  return { data: stops, error: null };
});
