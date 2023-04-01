import { NuxtLink } from '../../.nuxt/components';
<template>
  <div class="container m-4">
    <Auth v-if="!user" />
    <div v-else class="container px-4 md:px-0">
      <TripsGenerateForm />
      <div v-if="trips.length > 0">
        <TripsValidateItem v-for="(trip, index) in trips" :trip="trip" :key="index" />
      </div>
      <div class="flex flex-col items-center">
        <NuxtLink to="/trips">
          <button class="btn btn-primary btn-wide">Confirm Added Trips</button>
        </NuxtLink>
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
const { tripsToValidate } = useTripStore();
const trips = computed(() => tripsToValidate);
</script>