<template>
  <div class="container m-4">
    <Auth v-if="!user" />
    <div v-else class="container px-4 md:px-0">
      <NewTripsForm />
      <div v-if="trips.length > 0">
        <div v-for="(trip, index) in trips">
          <NewTripForm :trip="trip" :key="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'driver',
  middleware: 'auth',
});
useHead({
  title: 'Add New Trip',
});

const user = useSupabaseUser();
const tripStore = useTripsStore();
const trips = computed(() => tripStore.tripsToConfirm);
</script>