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
      <div class="prose mb-4">
        <h2>Add Trips</h2>
      </div>
      <ButtonLink to="/trips/new" class="btn btn-primary btn-wide">
        New Trip
      </ButtonLink>
    </div>
    <!-- Unconfirmed Trips -->
    <div class="m-4">
      <div class="mb-4 text-center w-full container">
        <h2 class="text-2xl font-bold">Unconfirmed Trips</h2>
      </div>
      <TripsUnconfirmed />
    </div>
  </div>
</template>
