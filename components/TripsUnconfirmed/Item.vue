<template>
  <div>
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
          :href="formatPickupMapLink(originLocationString)">
          {{ trip.pickupAddressStreet }}, {{ trip.pickupAddressCity }}
        </a>
      </div>

      <span>to</span>

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
      <NuxtLink :to="`/trips/edit/${trip.id}`" :class="{ 'loading btn-disabled': loading }"
        class="btn w-[100px] btn-info">
        Edit
      </NuxtLink>
      <button :class="{ 'loading btn-disabled': loading }" @click="() => confirmTrip(trip.id)"
        class="btn w-[100px] btn-success">Confirm</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Trip } from '@prisma/client';
const props = defineProps({
  trip: {
    type: Object as PropType<Trip>,
    required: true,
  },
});
const loading = ref(false);
const emits = defineEmits(['confirm', 'toggleModal']);

const originLocationString = computed(() => {
  return props.trip.pickupAddressStreet + ', ' + props.trip.pickupAddressCity;
});

const confirmTrip = async (id: number) => {
  loading.value = true;
  const tripId = id;
  const response = await fetch('/api/trips/confirm', {
    method: 'POST',
    body: JSON.stringify(tripId),
  });
  if (!response.ok) {
    console.error('Error confirming trip');
  } else {
    emits('confirm', id);
  }
  loading.value = false;
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

onMounted(() => {

});
</script>