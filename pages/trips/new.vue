<template>
  <div class="container m-4">
    <Auth v-if="!user" />
    <div v-else class="container px-4 md:px-0">
      <NewTripsForm :handleSubmit="generateTrips" :generated="generated" :generating="generating" :error="error" />
      <div class="flex flex-row gap-16 items-baseline">
        <h3>Trip Date <small>(tomorrow by default):</small></h3>
        <input v-model="tripDate" type="date" name="date" id="date" class="input input-sm input-accent">
      </div>
      <div v-if="trips.length > 0">
        <div v-for="(trip, index) in trips">
          <NewTripForm :showTrip="!submittedTripIds.has(index)" :trip="trip" :index="index"
            :handleSubmit="submitNewTrip" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'driver',
  middleware: 'auth',
});
useHead({
  title: 'Add New Trip',
});
const user = useSupabaseUser();
const trips: Ref<GeneratedTrip[]> = ref([]);
const submittedTripIds: Ref<Set<number>> = ref(new Set());
const generated = ref(false);
const generating = ref(false);
const error = ref('');
const tripDate = ref(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

async function generateTrips(e: Event) {
  e.preventDefault();
  error.value = '';
  generating.value = true;
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const prompt = formData.get('prompt') as string;
  if (prompt === '') {
    error.value = 'Please enter your trips before generating.';
    return generating.value = false;
  }
  try {
    const result = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    trips.value = await result.json();
    generating.value = false;
    generated.value = true;
  } catch (e) {
    error.value = "Oops! Something went wrong.";
    console.error(e);
    generating.value = false;
    generated.value = false;
  }
};

async function submitNewTrip(e: Event) {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const index = Number.parseInt(formData.get('index') as string);
  const trip: GeneratedTrip = {
    pickup_time: formData.get('pickup_time') as string,
    passenger_name: formData.get('passenger_name') as string,
    passenger_phone: formData.get('passenger_phone') as string,
    pickup_name: formData.get('pickup_name') as string,
    pickup_location_unit: formData.get('pickup_location_unit') as string,
    pickup_location_street: formData.get('pickup_location_street') as string,
    pickup_location_city: formData.get('pickup_location_city') as string,
    drop_off_name: formData.get('drop_off_name') as string,
    drop_off_location_unit: formData.get('drop_off_location_unit') as string,
    drop_off_location_street: formData.get('drop_off_location_street') as string,
    drop_off_location_city: formData.get('drop_off_location_city') as string,
    drop_off_time: formData.get('drop_off_time') as string,
    notes: formData.get('notes') as string,
  };

  try {
    const response = await fetch('/api/new/trip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ trip, date: tripDate.value }),
    });
    if (response.status === 200) {
      // console.log('success');
      submittedTripIds.value.add(index);
    }
  } catch (e) {
    console.error(e);
  }
};
</script>