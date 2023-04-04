import { getDistanceAndDuration } from "~/server/maps";

export default defineEventHandler(async (event) => {
  const { origin, destination } = await readBody(event) as { origin: string, destination: string; };

  if (!origin || !destination)
    return setResponseStatus(400, 'Request was missing origin or destination');

  if (typeof origin !== 'string' || typeof destination !== 'string')
    return setResponseStatus(400, 'Request had invalid origin or destination');

  try {
    const { distance, duration } = await getDistanceAndDuration(origin, destination);

    if (!distance || !duration) sendError(event, 'Error getting distance and duration');

    return { distance, duration };
  } catch (e: any) {
    return sendError(event, `An error occurred getting distance and duration. ('/api/maps/metrics')\n\n${e.message ?? e})`);
  }
})

