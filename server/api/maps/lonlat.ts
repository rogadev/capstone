import { getDestinationAsLonLat } from "~/server/maps";

export default defineEventHandler(async (event) => {
  const { destination } = await readBody(event);
  if (!destination) sendError(event, 'Request was missing destination');
  try {
    const { lat, lon } = await getDestinationAsLonLat(destination);
    return { status: 200, body: { lat, lon } };
  } catch (e: any) {
    sendError(event, 'Error getting destination as lon/lat');
  }
});
