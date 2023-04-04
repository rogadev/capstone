<template>
  <div v-if="user" class="container mx-auto">
    <div class="mx-4 md:mx-0 mt-6">

      <h1 class="text-4xl font-bold text-center mb-4">
        Dashboard
      </h1>

      <div class="flex flex-col md:flex-row justify-center items-center gap-4 md:justify-evenly">
        <ButtonLink to="/trips/new" classes="btn-primary w-[180px] lg:btn-wide">
          <span class="flex items-center gap-4">
            <Icon name="material-symbols:add-circle-outline-rounded" classes="h-5 mr-2" />
            Enter Trips
          </span>
        </ButtonLink>
        <ButtonLink to="/trips" classes="btn-primary w-[180px] lg:btn-wide">
          <span class="flex items-center gap-4">
            <Icon name="bx:trip" classes="h-5 mr-2" />
            Confirm Trips
          </span>
        </ButtonLink>
        <ButtonLink to="/drive" classes="btn-primary w-[180px] lg:btn-wide">
          <span class="flex items-center gap-4">
            <Icon name="bx:car" classes="h-5 mr-2" />
            Drive
          </span>
        </ButtonLink>
      </div>

      <div>
        <p>Number of trips: {{ numberOfTrips }}</p>
        <p>Number of trips today: {{ numberOfTripsToday }}</p>
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
const numberOfTrips = computed(() => trips.value.length);
const numberOfTripsToday = computed(() => trips.value.filter(trip => trip.date === new Date().toISOString().split('T')[0]).length);

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
    // ✅ Working - April 3 - Post Backend Refactoring ✅
    trips.value = allTrips;
  } catch (error) {
    alert(error);
  }
}

onMounted(() => {
  fetchTrips();
});
</script>