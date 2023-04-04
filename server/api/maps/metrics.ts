import { getDistanceAndDuration } from "~/server/maps";

export default defineEventHandler(async (event) => {
  const { origin, destination } = await readBody(event) as { origin: string, destination: string; };

  if (!origin || !destination)
    return {
      status: 400,
      statusText: 'Request must include origin and destination strings in the body. Expected body: { origin: string, destination: string }'
    };

  if (typeof origin !== 'string' || typeof destination !== 'string')
    return {
      status: 400,
      statusText: 'Request must include origin and destination strings in the body. Expected body: { origin: string, destination: string }'
    };

  try {
    console.log('Attempting to get distance and duration...');
    const { distance, duration } = await getDistanceAndDuration(origin, destination);

    if (!distance || !duration) sendError(event, 'Error getting distance and duration');

    return { distance, duration };
  } catch (e: any) {
    sendError(event, `An error occurred getting distance and duration. ('/api/maps/metrics')\n\n${e.message ?? e})`);
  }
})

