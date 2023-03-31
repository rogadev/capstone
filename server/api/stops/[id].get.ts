import { fetchStop } from '~/server/db/supabase';

// ✅ Working ✅
export default defineEventHandler(async (event) => {
  const stopID = event.context.params.id;
  const response = await fetchStop(stopID);
  if (response.error) console.error(response.error);
  return response;
});
