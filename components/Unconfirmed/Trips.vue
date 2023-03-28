<template>
  <div class="flex flex-col border border-gray-400 p-4 rounded-md">
    <div v-if="errorMessage !== ''">
      <h3>There was an error fetching unconfirmed trips from the database.</h3>
      <p>{{ errorMessage }}</p>
      <button class="btn btn-success" @click="() => fetchTrips()">Try Reloading</button>
    </div>
    <UnconfirmedTrip v-for="trip in unconfirmedTrips" :key="trip.id" :trip="trip" @confirm="visuallyConfirmTrip" />
  </div>
</template>

<script lang="ts" setup>
import type { Trip } from '@prisma/client';

const supabase = useSupabaseClient();
const unconfirmedTrips: Ref<Trip[]> = ref([]);
const errorMessage = ref('');

/**
 * Fetches all unconfirmed trips from the database.
 * Sorts them by pickup time, earliest to latest.
 * Sets the unconfirmedTrips value to the sorted trips.
 * If there is an error, it sets the errorMessage value to the error message.
 */
async function fetchTrips() {
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
}

/**
 * Removes the trip from the list of unconfirmed trips to be displayed
 */
function visuallyConfirmTrip(tripId: number) {
  unconfirmedTrips.value = unconfirmedTrips.value.filter(trip => trip.id !== tripId);
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

onMounted(fetchTrips);
</script>