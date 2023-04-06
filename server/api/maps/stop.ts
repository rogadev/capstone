import type { Stop } from "@prisma/client";
import type { PostgrestError } from "@supabase/supabase-js";
import * as supabase from "~/server/db/supabase";
import { getDistanceAndDuration } from "~/server/maps";

export default defineEventHandler(async (event) => {
  const { origin, destination, stop } = await readBody(event) as { origin: string, destination: string, stop: Stop; };

  if (!origin || !destination || !stop)
    return {
      status: 400,
      statusText: 'Request must include origin, destination, and stop in the body. Expected body: { origin: string, destination: string, stop: Stop }'
    };

  if (!origin.length === 2 || !destination || !stop)
    return {
      status: 400,
      statusText: 'Request must include origin, destination, and stop in the body. Expected body: { origin: string, destination: string, stop: Stop }'
    };

  try {
    const { distance, duration } = await getDistanceAndDuration(origin, destination) as { distance: number, duration: number; };

    if (!distance || !duration) throw new Error('Error getting distance and duration');

    stop.distance = distance;
    stop.duration = duration;
    const stopUpdated = await updateStop(stop);

    if (!stopUpdated) throw new Error('Error updating stop');

    console.info(`API returning distance and duration for ${origin} to ${destination}: ${distance}, ${duration}`);
    return { distance, duration };
  } catch (e: error) {
    console.error("'/api/maps/stop' encountered an error:", e);
    sendError(event, 'Error getting distance and duration');
  }
});

async function updateStop(stop: Stop) {
  if (!stop) {
    console.error("'/api/maps/stop' updateStop() encountered an error updating stop (no stop provided to updateStop() method - server/api/maps/stop.ts)");
    sendError(event, 'Error updating stop');
  }
  console.info("Updating stop", stop.id);

  try {
    const success = await supabase.updateStop({ ...stop, updatedAt: new Date().toISOString() });
    if (!success) throw new Error('Supabase encountered an error updating stop', stop.id);
    console.info("'/api/maps/stop' updateStop() successfully updated stop:", stop.id);
    return true;
  } catch (error: PostgrestError | Error) {
    console.error("'/api/maps/stop' updateStop() encountered an error updating stop:", error);
    return false;
  }
};