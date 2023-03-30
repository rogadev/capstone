import { fetchStop } from '~~/server/db/supabase';

export default defineEventHandler(async (event) => {
  const stopID = event.context.params.id;
  const response = await fetchStop(stopID);
  return response;
});
