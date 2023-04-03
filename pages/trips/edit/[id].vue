<template>
  <div class="w-full mx-auto p-4">
    <div v-if="loading && feedbackMessage === ''">
      <Loading />
    </div>
    <div v-else-if="success">
      <div class="text-center">
        <h1 class="text-2xl font-semibold mb-8">{{ feedbackMessage }}</h1>
        <NuxtLink to="/trips" class="btn btn-success btn-wide">View Trips</NuxtLink>
      </div>
    </div>
    <div v-else>
      <form class="p-4 border border-white rounded-md" @submit.prevent="updateTrip">
        <h3>Passenger Details</h3>
        <div id="input-fields" class="flex flex-wrap gap-4">
          <EditTripInput name="passengerName" :required="true" label="Passenger Name" size="sm"
            :value="trip.passengerName" v-model="trip.passengerName" />
          <EditTripInput name="passengerPhone" type="phone" :required="true" label="Passenger Phone" size="sm"
            :value="trip.passengerPhone" v-model="trip.passengerPhone" />
        </div>
        <h3>Pickup Details</h3>
        <div id="input-fields" class="flex flex-wrap gap-4">
          <EditTripInput name="pickupTime" :required="true" label="Pickup Time" size="xs" :value="trip.pickupTime"
            @focusout="(e) => formatTime(e)" />
          <EditTripInput name="pickupAddressName" :required="true" label="Location Name" size="lg"
            :value="trip.pickupAddressName ?? generateLocationName(trip.pickupAddressStreet, trip.pickupAddressCity)" />
        </div>
        <div id="input-fields" class="flex flex-wrap gap-4">
          <EditTripInput name="pickupAddressUnit" :required="false" label="Unit" size="xs"
            :value="trip.pickupAddressUnit ?? ''" />
          <EditTripInput name="pickupAddressStreet" :required="true" label="Street" size="md"
            :value="trip.pickupAddressStreet" />
          <EditTripInput name="pickupAddressCity" :required="true" label="City" size="sm"
            :value="trip.pickupAddressCity" />
        </div>
        <h3>Destination Details</h3>
        <div id="input-fields" class="flex flex-wrap gap-4">
          <EditTripInput name="dropOffTime" :required="true" label="Drop Off Time" size="xs"
            :value="trip.dropOffTime ?? ''" @focusout="(e) => formatTime(e)" />
          <EditTripInput name="dropOffAddressName" :required="true" label="Location Name" size="sm"
            :value="trip.dropOffAddressName ?? generateLocationName(trip.dropOffAddressStreet, trip.dropOffAddressCity)" />
        </div>
        <div id="input-fields" class="flex flex-wrap gap-4">
          <EditTripInput name="dropOffAddressUnit" :required="false" label="Unit" size="xs"
            :value="trip.dropOffAddressUnit ?? ''" />
          <EditTripInput name="dropOffAddressStreet" :required="true" label="Street" size="md"
            :value="trip.dropOffAddressStreet" />
          <EditTripInput name="dropOffAddressCity" :required="true" label="City" size="sm"
            :value="trip.pickupAddressCity" />
        </div>
        <div id="feedback-message" v-if="feedbackMessage !== ''">
          <p class="text-center text-red-500">{{ feedbackMessage }}</p>
        </div>
        <div id="submit-button" class="mt-8">
          <button :disabled="updating" type="submit" :class="{ 'loading btn-disabled': updating }"
            class="btn btn-success w-full">Update
            Trip</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Trip } from '@prisma/client';

const loading = ref(true);
const { id } = useRoute().params as { id: string; };
definePageMeta({
  layout: 'driver',
  middleware: 'auth',
});
useHead({
  title: `Edit Trip #${id}`,
});

const trip = ref({} as Trip);
const updating = ref(false);
const success = ref(false);
const feedbackMessage = ref('');

async function fetchTrip() {
  const response = await fetch(`/api/trips/${id}`);
  if (!response.ok) {
    console.error('Error fetching trip');
    feedbackMessage.value = 'There was an error fetching this trip.';
    return;
  }
  const { data } = await response.json();
  trip.value = data;
}

async function updateTrip() {
  updating.value = true;
  feedbackMessage.value = '';
  const response = await fetch('/api/trips/update/one', {
    method: 'POST',
    body: JSON.stringify(trip.value),
  });
  if (!response.ok) {
    console.error('Error updating trip');
    feedbackMessage.value = 'There was an error updating this trip.';
    success.value = false;
  } else {
    console.info('Trip updated');
    feedbackMessage.value = 'Trip updated successfully!';
    success.value = true;
  }
  updating.value = false;
}

function formatTime(e: any) {
  const value = e.target.value;
  // Remove any whitespace
  const cleanedString = value.replace(/\s/g, '');
  // Use a regular expression to match the different time formats
  const timeRegex = /^(\d{1,2})(?::?)(\d{2})(am|pm)?$/i;
  const match = timeRegex.exec(cleanedString);
  // No match means its not a valid time
  if (!match) return e.target.value = null;
  // Extract the hour, minute, and am/pm
  let hour = parseInt(match[1]);
  const minute = match[2];
  const isPM = match[3]?.toLowerCase() === 'pm';
  // 24-hour-ify the time
  if (isPM && hour !== 12) hour += 12;
  else if (!isPM && hour === 12) hour = 0;
  // Format and return the time string
  e.target.value = `${hour.toString().padStart(2, '0')}:${minute}`;
}

function generateLocationName(street: string, city: string) {
  if (street === '1200 Dufferin Crescent') return 'NRGH';
  if (street === "1351 Estevan Rd") return 'Nanaimo Community Dialysis';
  return `${street}, ${city}`;
}

onMounted(async () => {
  await fetchTrip();
  loading.value = false;
});
</script>

<style scoped>
h3 {
  margin-top: 1rem;
  padding-left: .5rem;
  @apply font-bold text-lg;
}
</style>