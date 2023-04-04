import type { Stop } from "@prisma/client";
import type { PostgrestError } from "@supabase/supabase-js";
import * as supabase from "~~/server/db/supabase";
import { getDistanceAndDuration } from "~~/server/maps";

export default defineEventHandler(async (event) => {
  const { origin, destination, stop } = await readBody(event) as { origin: string, destination: string, stop: Stop; };

  if (!origin || !destination || !stop)
    return setResponseStatus(400, 'Request was missing origin, destination, or stop');

  if (!origin.length === 2 || !destination || !stop)
    return setResponseStatus(400, 'Request was missing origin, destination, or stop');

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
  console.info("'/api/maps/stop' updating stop:", stop.id);

  if (!stop) sendError(event, 'Error updating stop (no stop provided to updateStop() method)');

  let success: boolean;
  stop = {
    ...stop,
    updatedAt: new Date().toISOString(),
  };

  try {
    const { error } = await supabase.from('stops').update(updatedStop).eq('id', stop.id) as { error: PostgrestError | null; };
    if (error) throw error;
    success = true;
  } catch (error: PostgrestError | Error) {
    console.error("'/api/maps/stop' updateStop() encountered an error updating stop:", error);
    success = false;
  }
  return success;
};