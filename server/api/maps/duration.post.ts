import { getDuration } from "~/server/maps";

export default defineEventHandler(async (event) => {
  const { origin, destination } = await readBody(event) as { origin: [number, number], destination: string; };

  if (!origin || !destination)
    return {
      status: 400,
      statusText: 'Bad Request',
    };

  try {
    console.log('Attempting to get duration...');
    const duration = await getDuration(origin, destination);

    if (!duration) throw new Error('No duration returned from Google Maps API');
    return duration;
  } catch (e: any) {
    sendError(event, `An error occurred getting distance and duration. ('/api/maps/metrics')\n\n${e.message ?? e})`);
  }
})

