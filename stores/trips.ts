import { nanoid } from 'nanoid';
import type { Trip } from '@prisma/client';

export const useTripStore = defineStore('tripsToValidate', () => {
  const supabase = useSupabaseClient();

  const tripsToValidate: Ref<GeneratedTrip[]> = ref([]);

  /**
   * Validate a trip and add remove it from the tripsToValidate store.
   */
  function validateTrip(tripID: string) {
    tripsToValidate.value = tripsToValidate.value.filter((trip) => trip.id !== tripID);
    return tripsToValidate.value;
  }

  /**
   * Generate trip(s) from a prompt and date.
   * Generates trips using '/api/trips/generate' endpoint.
   * Endpoint uses ChatGPT to generate trips.
   * Sets the tripsToValidate store with the generated trips.
   * Returns an array of trips to validate.
   */
  async function generateTripsToValidate(prompt: string, date: string) {
    let error = null;
    let data = null;
    // VALIDATION
    if (!prompt || prompt === '') {
      error = 'Please enter your trips before generating.';
      return { error, data: null };
    }
    if (!date || date === '') {
      error = 'Please select a date before generating.';
      return { error, data: null };
    }
    // GENERATE TRIPS
    try {
      // Expects { prompt, date } object. Responds with array of trips if successful. Nothing saved to DB, yet.
      const response = await fetch('/api/trips/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, date }),
      });
      data = await response.json();
    } catch (e) {
      console.error(e);
      error = "Oops! Something went wrong.";
    }
    if (!data) return { error, data: null };

    // FORMAT THE DATA - ADD TO THE STORE
    for (const trip of data) {
      const formattedTrip: GeneratedTrip = {
        id: nanoid(),
        date: trip.date,
        raw: trip.raw,
        passenger_name: trip.passenger_name,
        passenger_phone: trip.passenger_phone,
        pickup_time: trip.pickup_time,
        pickup_name: trip.pickup_name,
        pickup_location_unit: trip.pickup_location_unit,
        pickup_location_street: trip.pickup_location_street,
        pickup_location_city: trip.pickup_location_city,
        drop_off_name: trip.drop_off_name,
        drop_off_location_unit: trip.drop_off_location_unit,
        drop_off_location_street: trip.drop_off_location_street,
        drop_off_location_city: trip.drop_off_location_city,
        drop_off_time: trip.drop_off_time,
        notes: trip.notes,
      };
      tripsToValidate.value.push(formattedTrip);
    }
    // RETURN RESULTS
    return { error, data: tripsToValidate.value };
  }

  // STORE PROVIDES...
  return { tripsToValidate, generateTripsToValidate, validateTrip };
});