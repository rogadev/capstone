import supabase from "~/server/db";
import { errorLog } from "~~/server/utils/logging";

export default defineEventHandler(async (event) => {
  try {
    const { data } = await supabase.from('trips').select('*') as { data: Trip[] | null; };
    return {
      statusCode: 200,
      data: trips,
      error: null
    };
  } catch (error) {
    errorLog(error, 'server/db/supabase.ts');
    return {
      statusCode: 500,
      data: null,
      error: error
    };
  }
});