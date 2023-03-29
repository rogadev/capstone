import { Client } from '@googlemaps/google-maps-services-js';
const { GOOGLE_MAPS_API_KEY } = useRuntimeConfig();

const client = new Client({});

/**
 * Get distance and duration between two addresses.
 * @param origin Origin string including street address and city.
 * @param destination Destination string including street address and city.
 * @returns Distance in km. 
 * @returns Duration in minutes.
 */
export async function getDistanceAndDuration(origin: string, destination: string):
  Promise<{ distance: number, duration: number; }> {
  const response = await client.distancematrix({
    params: {
      origins: [origin],
      destinations: [destination],
      key: GOOGLE_MAPS_API_KEY,
      units: 'metric',
    },
    timeout: 1000, // milliseconds
  });

  const element = response.data.rows[0].elements[0];

  const distanceKM = Number.parseFloat((element.distance.value / 1000).toFixed(2));
  const durationMinutes = Number.parseInt(element.duration.value / 60) || 1; // Duration should be at least 1 minute.

  return {
    distance: distanceKM,
    duration: durationMinutes,
  };
}
