<template>
  <div class="flex flex-col border border-gray-400 p-4 rounded-md">
    <UnconfirmedTrip v-for="trip in unconfirmedTrips" :key="trip.id" :trip="trip" @confirm="confirmTrip" />
  </div>
</template>

<script lang="ts" setup>
import type { Trip } from '@prisma/client';

const supabase = useSupabaseClient();
const unconfirmedTrips: Ref<Trip[]> = ref([]);

async function fetchTrips() {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('confirmed', false);

  if (error) {
    console.log(error);
  } else {
    const sorted = data.sort((a: Trip, b: Trip) => {
      const hourA = a.pickupTime.split(':')[0];
      const hourB = b.pickupTime.split(':')[0];
      const minuteA = a.pickupTime.split(':')[1];
      const minuteB = b.pickupTime.split(':')[1];
      const timeA = parseInt(hourA) * 60 + parseInt(minuteA);
      const timeB = parseInt(hourB) * 60 + parseInt(minuteB);
      return timeA - timeB;
    });
    unconfirmedTrips.value = sorted;
  }
}

function confirmTrip(tripId: number) {
  unconfirmedTrips.value = unconfirmedTrips.value.filter(trip => trip.id !== tripId);
}

onMounted(fetchTrips);
</script>