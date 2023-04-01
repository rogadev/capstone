import type { Stop } from "@prisma/client";
import type { PostgrestError } from "@supabase/supabase-js";
import supabase from "~~/server/db/supabase";
import { getDistanceAndDuration } from "~~/server/maps";

export default defineEventHandler(async (event) => {
  const { origin, destination, stop } = await readBody(event) as { origin: [number, number], destination: string, stop: Stop; };
  if (!origin.length === 2 || !destination || !stop) return { status: 400, body: "Request to '/api/maps/stop' was missing parameter(s) origin, destination, or stop" };
  try {
    const { distance, duration } = await getDistanceAndDuration(origin, destination);
    stop.distance = distance;
    const { data, error } = await supabase.updateStop(stop) as { data: Stop | null; error: Error | PostgrestError | null; };
    if (error) {
      console.error(error, '/server/api/maps/stop.ts');
      return { status: 500, body: error.message ?? error };
    }
    return { status: 200, body: data };
  } catch (e) {
    console.error(e);
  }
});