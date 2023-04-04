import { getDestinationAsLonLat } from "~/server/maps";

export default defineEventHandler(async (event) => {
  const { destination } = await readBody(event) as { destination: string; };

  if (!destination)
    return setResponseStatus(400, 'Request was missing destination');

  try {
    const { lat, lon } = await getDestinationAsLonLat(destination);

    if (!lat || !lon) sendError(event, 'Error getting destination as lon/lat');

    console.info(`API returning lon/lat for ${destination}: ${lat}, ${lon}`);
    return { lat, lon };
  } catch (e: any) {
    console.error('Error getting destination as lon/lat', e);
    sendError(event, 'Error getting destination as lon/lat');
  }
});
