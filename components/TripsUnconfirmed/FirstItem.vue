<template>
  <div class="w-full mx-auto mb-8">
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
      <form class="p-4 border border-neutral rounded-md" @submit.prevent="() => updateTrip()">
        <div class="flex flex-row items-center gap-4 font-bold text-lg">
          <Icon name="mdi:account-details" class="text-2xl p-1 h-10 w-10" />
          <h3>
            Passenger Details
          </h3>
        </div>
        <div id="input-fields" class="flex flex-wrap gap-4">
          <EditTripInput name="passengerName" :required="true" label="Passenger Name" size="300"
            :value="trip.passengerName" v-model="trip.passengerName" />
          <EditTripInput name="passengerPhone" type="phone" :required="false" label="Passenger Phone" size="3"
            :value="trip.passengerPhone" v-model="trip.passengerPhone" />
        </div>
        <div class="flex flex-row items-center gap-4 font-bold text-lg mt-8">
          <Icon name="material-symbols:person-pin-circle" class="text-2xl p-1 h-10 w-10" />
          <h3>
            Pickup
          </h3>
        </div>
        <div id="input-fields" class="flex flex-wrap gap-4">
          <EditTripInput name="pickupTime" :required="true" label="Pickup Time" size="1" :value="trip.pickupTime"
            @focusout="(e) => formatTime(e)" />
          <EditTripInput name="pickupAddressName" :required="true" label="Location Name" size="4"
            :value="trip.pickupAddressName ?? generateLocationName(trip.pickupAddressStreet, trip.pickupAddressCity)" />
        </div>
        <div id="input-fields" class="flex flex-wrap gap-4">
          <EditTripInput name="pickupAddressUnit" :required="false" label="Unit" size="1"
            :value="trip.pickupAddressUnit ?? ''" />
          <EditTripInput name="pickupAddressStreet" :required="true" label="Street" size="3"
            :value="trip.pickupAddressStreet" />
          <EditTripInput name="pickupAddressCity" :required="true" label="City" size="2"
            :value="trip.pickupAddressCity" />
        </div>
        <div class="flex flex-row items-center gap-4 font-bold text-lg mt-8">
          <Icon name="material-symbols:home-pin" class="text-2xl p-1 h-10 w-10" />
          <h3>
            Destination
          </h3>
        </div>
        <div id="input-fields" class="flex flex-wrap gap-4">
          <EditTripInput name="dropOffTime" :required="false" label="Drop Off Time" size="1"
            :value="trip.dropOffTime ?? ''" @focusout="(e) => formatTime(e)" />
          <EditTripInput name="dropOffAddressName" :required="true" label="Location Name" size="3"
            :value="trip.dropOffAddressName ?? generateLocationName(trip.dropOffAddressStreet, trip.dropOffAddressCity)" />
        </div>
        <div id="input-fields" class="flex flex-wrap gap-4">
          <EditTripInput name="dropOffAddressUnit" :required="false" label="Unit" size="1"
            :value="trip.dropOffAddressUnit ?? ''" />
          <EditTripInput name="dropOffAddressStreet" :required="true" label="Street" size="3"
            :value="trip.dropOffAddressStreet" />
          <EditTripInput name="dropOffAddressCity" :required="true" label="City" size="2"
            :value="trip.pickupAddressCity" />
        </div>
        <div id="feedback-message" v-if="feedbackMessage !== ''">
          <p class="text-center text-red-500">{{ feedbackMessage }}</p>
        </div>
        <div class="mt-8 grid grid-cols-6 gap-4 justify-center">
          <button :disabled="updating" type="button" :class="{ 'loading btn-disabled': updating }"
            class="btn btn-error w-full col-span-2" @click="deleteCurrentTrip">
            <Icon name="tabler:trash-x-filled" class="w-5 h-5 mr-2" />
            <span>
              Delete Trip
            </span>
          </button>
          <button :disabled="updating" type="submit" :class="{ 'loading btn-disabled': updating }"
            class="btn btn-success w-full col-span-4">
            <Icon name="carbon:checkmark-filled" class="w-5 h-5 mr-2" />
            <span>
              Confirm Trip Details
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Trip } from '@prisma/client';

const loading = ref(true);
const props = defineProps({
  trip: {
    type: Object as PropType<Trip>,
    required: true,
  },
});
const trip = ref(props.trip);

const emits = defineEmits(['confirm']);

const updating = ref(false);
const success = ref(false);
const feedbackMessage = ref('');

async function deleteCurrentTrip() {
  updating.value = true;
  feedbackMessage.value = '';
  const response = await fetch(`/api/trips/delete/${trip.value.id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    console.error('Error deleting trip');
    feedbackMessage.value = 'There was an error deleting this trip.';
    success.value = false;
  } else {
    console.info('Trip deleted');
    feedbackMessage.value = 'Trip deleted successfully!';
    success.value = true;
    emits('confirm');
  }
  updating.value = false;
}

async function updateTrip() {
  updating.value = true;
  feedbackMessage.value = '';
  const response = await fetch('/api/trips/confirm', {
    method: 'POST',
    body: JSON.stringify(trip.value.id),
  });
  const { error } = await response.json();
  if (!response.ok) {
    console.error('Error updating trip', error);
    feedbackMessage.value = 'There was an error updating this trip.';
    success.value = false;
  } else {
    console.info('Trip updated');
    feedbackMessage.value = 'Trip updated successfully!';
    success.value = true;
    emits('confirm');
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
  loading.value = false;
});
</script>