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
    <div class="flex flex-col justify-center items-center m-4 mb-8">
      <ButtonLink to="/trips/new" class="btn btn-primary btn-wide">
        New Trip
      </ButtonLink>
    </div>
    <!-- Unconfirmed Trips -->
    <div class="m-4">
      <div class="mb-4 text-center w-full container">
        <h2 class="text-2xl font-bold">Confirm Trips</h2>
      </div>
      <UnconfirmedTrips />
    </div>
  </div>
</template>
