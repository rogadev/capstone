export const useTripsStore = defineStore('trips', () => {
  const supabase = useSupabaseClient();

  const tripsToConfirm: Ref<GeneratedTrip[]> = ref([]);

  async function generateTrips(prompt: string, date: string) {
    let error = null;
    let data = null;
    // VALIDATION
    if (prompt === '') {
      error = 'Please enter your trips before generating.';
    } else {
      // GENERATE TRIPS
      try {
        const result = await fetch('/api/generate/trips', {
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
  };

  return { tripsToConfirm, generateTrips };
});