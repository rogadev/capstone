export const useTripsStore = defineStore('trips', () => {
  const supabase = useSupabaseClient();

  const tripsToConfirm: Ref<GeneratedTrip[]> = ref([]);

  async function generateTrips(prompt: string, date: string) {
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
      const result = await fetch('/api/trips/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      data = await result.json();
    } catch (e) {
      console.error(e);
      error = "Oops! Something went wrong.";
    }

    // UPDATE STORE
    if (data) {
      // add date to each trip
      for (const trip of data) {
        trip.date = date;
      }
      // update store
      tripsToConfirm.value = data;
    }
    // RETURN RESULTS
    console.log(data);
    return { error, data: tripsToConfirm.value };
  }

  return { tripsToConfirm, generateTrips };
});