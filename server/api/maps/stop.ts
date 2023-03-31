import type { Stop } from "@prisma/client";
import type { PostgrestError } from "@supabase/supabase-js";
import { errorLog } from "~~/server/utils/logging";
import supabase from "~~/server/db/supabase";
import { getDistanceAndDuration } from "~~/server/maps";

const { log } = console;
function initLog(origin, destination, stopID) {
  log('API request to update stop', stopID, ' by adding distance and duration from current location.');
  log('origin:', origin);
  log('destination:', destination);
}

export default defineEventHandler(async (event) => {
  const { origin, destination, stop } = await readBody(event) as { origin: string; destination: string; stop: Stop; };
  if (!origin || !destination || !stop) return { status: 400, body: "Request to '/api/maps/stop' was missing parameter(s) origin, destination, or stop" };
  initLog(origin, destination, stop.id);
  try {
    const { distance, duration } = await getDistanceAndDuration(origin, destination);
    stop.distance = distance;
    const { data, error } = await supabase.updateStop(stop) as { data: Stop | null; error: Error | PostgrestError | null; };
    if (error) {
      errorLog(error, __filename);
      return { status: 500, body: error.message ?? error };
    }
    return { status: 200, body: data };
  } catch (e) {
    sendError(event, e);
  }
});