<template>
  <div class="container m-4">
    <Auth v-if="!user" />
    <div v-else class="container px-4 md:px-0">
      <GenerateTripsForm />
      <div v-if="trips.length > 0">
        <ValidateTripForm v-for="(trip, index) in trips" :trip="trip" :key="index" />
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
const { tripsToValidate } = useTripsToValidateStore();
const trips = computed(() => tripsToValidate);
</script>