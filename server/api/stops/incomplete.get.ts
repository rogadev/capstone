import { PostgrestError } from '@supabase/supabase-js';
import * as supabase from '~/server/db/supabase';

export default defineEventHandler(async (event) => {
  const response:
    { data: Stop[] | null; error: Error | null; } =
    { data: null, error: null };
  try {
    const { data, error } = await supabase.fetchAllStops() as { data: Stop[] | null; error: PostgrestError | null; };
    if (error) throw error;
    console.info('API fetched all stops successfully. Responding with stops...');
    response.data = data;
  } catch (e: PostgrestError | Error) {
    console.error('Error fetching all stops:', e);
    response.error = e;
  }
  response.data = response.data.filter((stop) => stop.closed === false);
  return response;
});