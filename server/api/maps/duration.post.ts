import { getDuration } from "~/server/maps";

export default defineEventHandler(async (event) => {
  const { origin, destination } = await readBody(event) as { origin: [number, number], destination: string; };
  console.log('origin', origin);
  console.log('destination', destination);

  if (!origin || !destination)
    return {
      status: 400,
      statusText: 'Bad Request',
    };

  try {
    console.log('Attempting to get duration...');
    const duration = await getDuration(origin, destination);
    console.log('duration', duration);

    if (!duration) throw new Error('No duration returned from Google Maps API');
    return duration;
  } catch (e: any) {
    sendError(event, `An error occurred getting distance and duration. ('/api/maps/metrics')\n\n${e.message ?? e})`);
  }
})

