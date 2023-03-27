import { getDistanceAndDuration } from "~/server/maps";

export default defineEventHandler(async (event) => {
  const { origin, destination } = await readBody(event);
  if (!origin || !destination) {
    return { status: 400, body: 'Request was missing origin or destination' };
  }
  try {
    const { distance, duration } = await getDistanceAndDuration(origin, destination);
    setResponseStatus(200);
    return { distance, duration };
  } catch (e) {
    console.log('An error occurred getting distance and duration', e.message);
    setResponseStatus(500);
    return { body: e.message };
  }
})

