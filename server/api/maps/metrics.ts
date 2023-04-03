import { getDistanceAndDuration } from "~/server/maps";

export default defineEventHandler(async (event) => {
  const { origin, destination } = await readBody(event);
  if (!origin || !destination) {
    return { status: 400, body: 'Request was missing origin or destination' };
  }
  try {
    const { distance, duration } = await getDistanceAndDuration(origin, destination);
    return { distance, duration };
  } catch (e: any) {
    return sendError(event, `An error occurred getting distance and duration. ('/api/maps/metrics')\n\n${e.message ?? e})`);
  }
})

