import { Client, type DistanceMatrixResponse } from '@googlemaps/google-maps-services-js';

const { GOOGLE_MAPS_API_KEY } = useRuntimeConfig();
const client = new Client({});

/**
 * Get distance and duration between two addresses.
 * @param origin Origin string including street address and city.
 * @param destination Destination string including street address and city.
 * @returns {Promise<{ distance: number, duration: number; }>} Distance in km and duration in minutes.
*/
export async function getDistanceAndDuration(origin: string, destination: string):
  Promise<{ distance: number, duration: number; }> {
  const response: DistanceMatrixResponse = await client.distancematrix({
    params: {
      origins: [origin],
      destinations: [destination],
      key: GOOGLE_MAPS_API_KEY,
      units: 'metric',
    },
    timeout: 1000, // milliseconds
  });
  const data = response.data.rows[0].elements[0];
  if (!data) sendError(event, 'Data expected but no data returned from Google Maps API. 🤷');
  /**
   * Distance in km, rounded to 2 decimal places.
   */
  const distanceKM = Number.parseFloat((data.distance.value / 1000).toFixed(2));
  /**
   * Duration in minutes, rounded to 1 decimal place, and rounded to 1 if duration is less than 0.5 minutes.
   */
  const durationMinutes = Number.parseInt(data.duration.value / 60) || 1; // Duration should be at least 1 minute.
  return {
    distance: distanceKM,
    duration: durationMinutes,
  };
}

/**
 * Get the lat/lon from a destination string.
 * @param destination Destination string like '123 Main St, Anytown, USA'
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
