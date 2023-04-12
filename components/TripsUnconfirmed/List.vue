<template>
  <div class="flex flex-col">
    <div v-if="errorMessage !== ''">
      <h3>There was an error fetching unconfirmed trips from the database.</h3>
      <p>{{ errorMessage }}</p>
      <button class="btn btn-success" @click="() => fetchTrips()">Try Reloading</button>
    </div>
    <Loading v-if="loading" />
    <div v-else-if="!allTripsConfirmed">
      <TripsUnconfirmedFirstItem v-if="firstTrip" :trip="firstTrip" @confirm="tripConfirmed" />
      <TripsUnconfirmedItem v-if="remainingTrips.length > 0" v-for="trip in remainingTrips" :key="trip.id" :trip="trip"
        @confirm="tripConfirmed" />
    </div>
    <div v-else>
      <h3 class="text-center">All trips have been confirmed!</h3>
      <div class="flex flex-col md:flex-row justify-evenly items-center mt-8">
        <NuxtLink to="/trips/adjust">
          <button class="btn btn-info btn-wide">Adjust Times</button>
        </NuxtLink>
        <NuxtLink to="/drive">
          <button class="btn btn-success btn-wide">Drive!</button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Trip } from '@prisma/client';

const supabase = useSupabaseClient();

const loading = ref(true);
const errorMessage = ref('');
const unconfirmedTrips: Ref<Trip[]> = ref([]);

const firstTrip = computed(() => unconfirmedTrips.value[0]);
const remainingTrips = computed(() => unconfirmedTrips.value.slice(1));
const allTripsConfirmed = computed(() => unconfirmedTrips.value.length === 0);

async function tripConfirmed() {
  await fetchTrips();
}

/**
 * Fetches all unconfirmed trips from the database.
 * Sorts them by pickup time, earliest to latest.
 * Sets the unconfirmedTrips value to the sorted trips.
 * If there is an error, it sets the errorMessage value to the error message.
 */
async function fetchTrips() {
  loading.value = true;
  errorMessage.value = '';
  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('confirmed', false);
    if (error) throw error;
    const sorted = sortTripsByTime(data);
    unconfirmedTrips.value = sorted;
  } catch (e: any) {
    errorMessage.value = e.message;
    console.error(e);
  }
  loading.value = false;
}

/**
 * Sorts the trips by pickup time, earliest to latest.
 */
function sortTripsByTime(trips: Trip[]): Trip[] {
  return trips.sort((a: Trip, b: Trip) => {
    const hourA = a.pickupTime.split(':')[0];
    const hourB = b.pickupTime.split(':')[0];
    const minuteA = a.pickupTime.split(':')[1];
    const minuteB = b.pickupTime.split(':')[1];
    const timeA = parseInt(hourA) * 60 + parseInt(minuteA);
    const timeB = parseInt(hourB) * 60 + parseInt(minuteB);
    return timeA - timeB;
  });
}

onMounted(async () => {
  await fetchTrips();
  loading.value = false;
});
</script>