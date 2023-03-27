<template>
  <div class="flex flex-col border border-gray-400 p-4 rounded-md">
    <div v-for="trip in trips" class="mb-6 font-semibold">
      <div class="flex flex-col justify-center sm:flex-row sm:justify-between text-center">
        <div>{{ trip.pickupTime }} </div>
        <div>{{ dateFormat(trip.date) }}</div>
        <div class="text-center">{{ trip.passengerName }} <a class="link hover:link-hover link-secondary"
            :href="'tel:' + trip.passengerPhone">{{
              trip.passengerPhone }}</a></div>
      </div>
      <div class="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
        <div class="text-center sm:text-left">
          <a class="link hover:link-hover link-secondary" target="_blank" rel="noopener noreferrer"
            :href="formatPickupMapLink(trip.pickupAddressStreet + ', ' + trip.pickupAddressCity)">
            {{ trip.pickupAddressStreet }}, {{ trip.pickupAddressCity }}
          </a>
        </div>
        <div>
          <Icon name="circum:route" class="w-6 h-6" />
        </div>
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
        <button class="btn w-[100px] btn-success">Confirm</button>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import type { Trip } from '@prisma/client';

const supabase = useSupabaseClient();
const trips: Ref<Trip[]> = ref([]);
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

onMounted(async () => {
  console.log('fetching trips');
  const { data, error } = await supabase
    .from('Trips')
    .select('*')
    .eq('confirmed', false);

  if (error) {
    console.log(error);
  } else {
    console.log('got trips');
    const sorted = data.sort((a: Trip, b: Trip) => {
      const hourA = a.pickupTime.split(':')[0];
      const hourB = b.pickupTime.split(':')[0];
      const minuteA = a.pickupTime.split(':')[1];
      const minuteB = b.pickupTime.split(':')[1];
      const timeA = parseInt(hourA) * 60 + parseInt(minuteA);
      const timeB = parseInt(hourB) * 60 + parseInt(minuteB);
      return timeA - timeB;
    });
    trips.value = sorted;
  }
});
</script>