import { NuxtLink } from '../../.nuxt/components';
<template>
  <div class="container m-4">
    <Auth v-if="!user" />
    <div v-else class="px-4 md:px-0">
      <div v-if="!generated">
        <TripsGenerateForm @generated="() => generated = true" />
      </div>
      <div v-else>
        <TripsValidateItem v-for="(trip, index) in trips" :trip="trip" :key="index" />
      </div>
      <div v-if="generated && allTripsAreValidated" class="flex flex-col items-center">
        <h5 class="text-center font-semibold text-2xl">All trips validated!</h5>
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
const allTripsAreValidated = computed(() => trips.value.length < 1);
const generated = ref(false);
</script>