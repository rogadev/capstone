import { updateStop } from "~~/server/db/supabase";

export default defineEventHandler(async (event) => {
  const { origin, destination, stop } = await readBody(event);
  if (!origin || !destination) {
    return { status: 400, body: 'Request was missing origin or destination' };
  }
  try {
    const { distance, duration } = await getDistanceAndDuration(origin, destination);
    setResponseStatus(200);
    if (!stop.distance) stop.distance = distance;
    const result = await updateStop(stop);
    if (result.error) throw result.error;
    return result;
  } catch (e) {
    console.log('An error occurred getting distance and duration', e);
    setResponseStatus(500);
    return { body: e.message };
  }
});