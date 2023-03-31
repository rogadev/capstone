<script lang="ts" setup>
definePageMeta({
  layout: 'driver',
  middleware: 'auth',
});
useHead({
  title: 'Trips',
});
</script>

<template>
  <div class="container">
    <div class="flex flex-row justify-evenly items-center gap-4 m-4 mb-8">
      <ButtonLink to="/trips/new" class="btn btn-primary w-[150px] sm:btn-wide">
        Add Trips
      </ButtonLink>
      <ButtonLink to="/drive" class="btn btn-primary w-[150px] sm:btn-wide">
        Drive
      </ButtonLink>
    </div>
    <!-- Unconfirmed Trips -->
    <div class="m-4">
      <div class="mb-4 text-center w-full container">
        <h2 class="text-2xl font-bold">Confirm Trips</h2>
      </div>
      <TripsUnconfirmedList />
    </div>
  </div>
</template>
