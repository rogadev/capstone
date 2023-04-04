import { Client, type DistanceMatrixResponse } from '@googlemaps/google-maps-services-js';

const { GOOGLE_MAPS_API_KEY } = useRuntimeConfig();
const client = new Client({});

/**
 * Get distance and duration between two addresses.
 * @param origin Origin string including street address and city.
 * @param destination Destination string including street address and city.
 * @returns Distance in km and Duration in minutes.
*/
export async function getDistanceAndDuration(origin: string, destination: string) {
  try {
    const response: DistanceMatrixResponse = await client.distancematrix({
      params: {
        origins: [origin],
        destinations: [destination],
        key: GOOGLE_MAPS_API_KEY,
        units: 'metric',
      },
      timeout: 1000,
    });
    const data = response.data.rows[0].elements[0];
    if (!data) throw new Error('No data returned from Google Maps API');
    const inKM = formatDistance(data.distance.value);
    const inMinutes = formatDuration(data.duration.value);
    return {
      distance: inKM,
      duration: inMinutes,
    };
  } catch (error) {
    console.error('Error getting distance and duration from Google Maps API - server/maps/index.ts - getDistanceAndDuration()');
    sendError(event, error);
  }
}

/**
 * Get the lat/lon from a destination string.
 * @param destination Destination string like '123 Main St, Nanaimo'
 * @returns { lat: number, lon: number; }
 */
export async function getDestinationAsLonLat(destination: string): Promise<{ lat: number, lon: number; }> {
  const response = await client.geocode({ params: { address: destination, key: GOOGLE_MAPS_API_KEY } });
  // if (!response.ok) sendError(event, 'Error getting destination as lon/lat');
  const { data } = response;
  if (data?.status !== 'OK') sendError(event, 'Error getting destination as lon/lat');
  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lon: lng };
}

/**
 * Distance in km, rounded to 2 decimal places.
 */
function formatDistance(distance: number) {
  return Number.parseFloat((distance / 1000).toFixed(2));
}

/**
   * Duration in minutes, rounded to 1 decimal place, and rounded to 1 if duration is less than 0.5 minutes.
   */
function formatDuration(duration: number) {
  return Number.parseInt(duration / 60) || 1;
}