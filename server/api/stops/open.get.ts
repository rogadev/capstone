import { PostgrestError } from '@supabase/supabase-js';
import * as supabase from '~/server/db/supabase';

export default defineEventHandler(async (event) => {
  try {
    const { data, error } = await supabase.fetchAllStops() as { data: Stop[] | null; error: PostgrestError | null; };
    if (error) throw error;
    if (!data)
      return {
        status: 404,
        statusText: 'No stops found, open or otherwise.'
      };
    console.info('API fetched all stops successfully. Sorting stops...');
    const openStops = data.filter((stop: Stop) => stop.closed === false);
    // NOTE - We may want an empty array of stops returned if all stops are closed. Don't throw error or respond with 404.
    return openStops;
  } catch (e: PostgrestError | Error) {
    console.error('Error fetching all stops:', e);
    sendError(event, 'Encountered an error fetching all stops.');
  }
});