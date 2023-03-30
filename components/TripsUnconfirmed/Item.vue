<template>
  <div class="flex flex-col justify-center sm:flex-row sm:justify-between text-center font-semibold">
    <div>{{ trip.pickupTime }} </div>
    <div>{{ dateFormat(trip.date) }}</div>
    <div class="text-center">{{ trip.passengerName }} <a class="link hover:link-hover link-secondary"
        :href="'tel:' + trip.passengerPhone">{{
          trip.passengerPhone }}</a></div>
  </div>
  <div class="flex flex-col items-center justify-center sm:flex-row sm:justify-evenly">
    <div class="text-center sm:text-left">
      <a class="link hover:link-hover link-secondary" target="_blank" rel="noopener noreferrer"
        :href="formatPickupMapLink(trip.pickupAddressStreet + ', ' + trip.pickupAddressCity)">
        {{ trip.pickupAddressStreet }}, {{ trip.pickupAddressCity }}
      </a>
    </div>

    <Icon name="circum:route" class="w-6 h-6" />

    <div class="text-center sm:text-right">
      <a class="link hover:link-hover link-secondary" target="_blank" rel="noopener noreferrer"
        :href="formatDropOffMapLink(trip.pickupAddressStreet, trip.pickupAddressCity, trip.dropOffAddressStreet, trip.dropOffAddressCity)">
        {{ trip.dropOffAddressStreet }}, {{ trip.dropOffAddressCity }}
      </a>
    </div>
  </div>
  <div class="text-center sm:text-right text-accent font-semibold" v-if="trip.dropOffTime && trip.dropOffTime !== ''">
    Appointment Time: {{ trip.dropOffTime }}
  </div>

  <div class="flex flex-row gap-6 justify-evenly items-center my-4">
    <button class="btn w-[100px] btn-error">Cancel</button>
    <button class="btn w-[100px] btn-info">Edit</button>
    <button @click="() => confirmTrip(trip.id)" class="btn w-[100px] btn-success">Confirm</button>
  </div>
</template>

<script lang="ts" setup>
import type { Trip } from '@prisma/client';
defineProps({
  trip: {
    type: Object as PropType<Trip>,
    required: true,
  },
});
const emit = defineEmits(['confirm']);

const confirmTrip = async (id: number) => {
  const tripId = id;
  const response = await fetch('/api/trips/confirm', {
    method: 'POST',
    body: JSON.stringify(tripId),
  });
  const { error, success } = await response.json();
  if (!error && success) {
    emit('confirm', id);
  }
};

const dateFormat = (date: Date | string) => {
  return Intl.DateTimeFormat('us-en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

const formatPickupMapLink = (address: string) => {
  // Create a url safe slug from the address string
  address = address
    .toLowerCase() // convert to lowercase
    .replace(/[^\w\s-]/g, '') // remove non-word characters
    .trim() // remove leading/trailing spaces
    .replace(/[-\s]+/g, '-') // replace spaces/hyphens with a single hyphen
    .replace(/^-+|-+$/g, ''); // remove leading/trailing hyphens
  return `https://www.google.com/maps/dir/Your+location/${encodeURIComponent(address)}`;
};

const formatDropOffMapLink = (fromStreet: string, fromCity: string, toStreet: string, toCity: string) => {
  let from = fromStreet + ', ' + fromCity;
  let to = toStreet + ', ' + toCity;
  // Create a url safe slug from the address string
  from = from
    .toLowerCase() // convert to lowercase
    .replace(/[^\w\s-]/g, '') // remove non-word characters
    .trim() // remove leading/trailing spaces
    .replace(/[-\s]+/g, '-') // replace spaces/hyphens with a single hyphen
    .replace(/^-+|-+$/g, ''); // remove leading/trailing hyphens
  to = to
    .toLowerCase() // convert to lowercase
    .replace(/[^\w\s-]/g, '') // remove non-word characters
    .trim() // remove leading/trailing spaces
    .replace(/[-\s]+/g, '-') // replace spaces/hyphens with a single hyphen
    .replace(/^-+|-+$/g, ''); // remove leading/trailing hyphens
  return `https://www.google.com/maps/dir/${encodeURIComponent(from)}/${encodeURIComponent(to)}`;
};


// [
//   {
//     "raw": "5:45 pm Glen K home from Community dialysis to 555 Aurora Street in Parksville. Please call the unit and get his actual time so you know exactly what time to be there."
//     "passenger_name": "Glen K"
//     "passenger_phone": ""
//     "pickup_location_name": "Nanaimo Dialysis"
//     "pickup_location_unit": ""
//     "pickup_location_street": "1351 Estevan Rd"
//     "pickup_location_city": "Nanaimo"
//     "drop_off_location_name": "Home"
//     "drop_off_location_unit": ""
//     "drop_off_location_street": "555 Aurora Street"
//     "drop_off_location_city": "Parksville"
//     "drop_off_time": ""
//     "notes": "Please call the unit and get his actual time so you know exactly what time to be there."
//   }
// ]
</script>