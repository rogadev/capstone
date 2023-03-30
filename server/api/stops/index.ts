import { fetchAllStops } from '~/server/db/supabase';

// ✅ Working ✅
export default defineEventHandler(async (event) => {
  const response = await fetchAllStops();
  if (response.error) console.error(response.error);
  return response;
});
