import supabase from "~/server/db";
import { errorLog } from "~~/server/utils/logging";

export default defineEventHandler(async (event) => {
  try {
    const { data } = await supabase.from('trips').select('*') as { data: Trip[] | null; };
    console.log(data.length);
    return {
      statusCode: 200,
      data: data,
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