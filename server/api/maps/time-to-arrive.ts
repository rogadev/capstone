import { getDistanceAndDurationLatLonToStringLocations } from '~/server/maps';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { origin, destination } = body as ReadBody;
  const { duration } = await getDistanceAndDurationLatLonToStringLocations(origin, destination);
  return duration;
});