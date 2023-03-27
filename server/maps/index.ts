import { Client } from '@googlemaps/google-maps-services-js';
const { GOOGLE_MAPS_API_KEY } = useRuntimeConfig();

const client = new Client({});

export async function getDistanceAndDuration(origin: string, destination: string):
  Promise<{ distance: string, duration: string; }> {
  const response = await client.distancematrix({
    params: {
      origins: [origin],
      destinations: [destination],
      key: GOOGLE_MAPS_API_KEY,
    },
    timeout: 1000, // milliseconds
  });

  const element = response.data.rows[0].elements[0];

  return {
    distance: element.distance.text,
    duration: element.duration.text,
  };
}
