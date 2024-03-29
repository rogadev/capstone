import { PostgrestError } from '@supabase/supabase-js';
import * as supabase from '~/server/db/supabase';

export default defineEventHandler(async (event) => {
  try {
    const { data, error } = await supabase.fetchAllStops() as { data: Stop[] | null; error: PostgrestError | null; };
    if (error) throw error;
    if (!data)
      return {
        status: 404,
        statusText: 'No stops found.'
      };
    console.info('API fetched all stops successfully. Responding with stops...');
    return data;
  } catch (e: PostgrestError | Error) {
    console.error('Error fetching all stops:', e);
    sendError(event, 'Encountered an error fetching all stops.');
  }
});