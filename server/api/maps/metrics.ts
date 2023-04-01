import { getDistanceAndDuration } from "~/server/maps";
const { DEV } = useRuntimeConfig();
const IN_DEV = DEV.toLowerCase() === 'true';

export default defineEventHandler(async (event) => {
  const { origin, destination } = await readBody(event);
  if (!origin || !destination) {
    return { status: 400, body: 'Request was missing origin or destination' };
  }
  try {
    const { distance, duration } = await getDistanceAndDuration(origin, destination);
    return { distance, duration };
  } catch (e: any) {
    return sendError(event, IN_DEV ?
      `An error occurred getting distance and duration. (${__filename})` :
      'Error getting distance and duration');
  }
})

