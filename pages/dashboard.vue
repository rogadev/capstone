<template>
  <div v-if="user" class="container mx-auto">
    <div class="mx-4 md:mx-0 mt-6">
      <h1 class="text-4xl font-bold text-center mb-4">
        Dashboard
      </h1>
<<<<<<< Updated upstream

      <div class="flex flex-col md:flex-row justify-center md:justify-evenly items-center md:items-start gap-4 ">
        <div class="flex flex-col justify-center">
          <ButtonLink to="/trips/new" classes="btn-primary w-[180px] lg:btn-wide">
            <span class="flex items-center gap-4">
              <Icon name="material-symbols:add-circle-outline-rounded" classes="h-5 mr-2" />
              Enter Trips
            </span>
          </ButtonLink>
          <div class="text-center mt-2 mb-4">
            Total trips created: <span class="font-bold text-lg pl-1">{{ numberOfTrips }}</span>
=======
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row justify-center md:justify-evenly items-center md:items-start gap-4 ">
          <div class="flex flex-col justify-center">
            <ButtonLink to="/trips/new" classes="btn-primary w-[180px] lg:btn-wide">
              <span class="flex items-center gap-4">
                <Icon name="material-symbols:add-circle-outline-rounded" classes="h-5 mr-2" />
                Enter Trips
              </span>
            </ButtonLink>
            <div class="text-center mt-2 mb-4">
              Total trips created: <span class="font-bold text-lg pl-1">{{ numberOfTrips }}</span>
            </div>
>>>>>>> Stashed changes
          </div>
        </div>
        <div class="flex flex-col justify-center">
          <ButtonLink to="/trips" classes="btn-primary w-[180px] lg:btn-wide">
            <span class="flex items-center gap-4">
              <Icon name="bx:trip" classes="h-5 mr-2" />
              Confirm Trips
            </span>
          </ButtonLink>
          <div class="text-center mt-2 mb-4">
            Trips to confirm: <span class="font-bold text-lg pl-1">{{ numberOfUnconfirmedTrips }}</span>
          </div>
        </div>
        <div class="flex flex-col justify-center">
          <ButtonLink to="/drive" classes="btn-primary w-[180px] lg:btn-wide">
            <span class="flex items-center gap-4">
              <Icon name="bx:car" classes="h-5 mr-2" />
              Drive
            </span>
          </ButtonLink>
          <div class="text-center mt-2 mb-4">
            Trips today: <span class="font-bold text-lg pl-1">{{ numberOfTripsToday }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="m-6">
      <h2 class="text-3xl font-bold text-center mb-4">Upcoming Trips</h2>
      <div class="flex flex-col gap-4">
        <UpcomingTripTable :trips="trips" />
      </div>
    </div>
  </div>
  <Auth v-else />
</template>

<script lang="ts" setup>
import { Trip } from '@prisma/client';
definePageMeta({
  layout: 'driver',
  middleware: 'auth'
});
useHead({
  title: 'Driver Dashboard',
});
const user = useSupabaseUser();

const trips: Ref<Trip[]> = ref([]);
const numberOfTrips = computed(() => trips.value.length.toLocaleString('en-US'));
const numberOfTripsToday = computed(() => trips.value.filter(trip => trip.date === new Date().toISOString().split('T')[0]).length);
const numberOfUnconfirmedTrips = computed(() => trips.value.filter(trip => trip.confirmed === false).length);

async function fetchTrips() {
  try {
    // Responds with all trips.
    const response = await fetch('/api/trips', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error(response.statusText);
    const allTrips = await response.json();
    trips.value = allTrips;
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  fetchTrips();
});
</script>