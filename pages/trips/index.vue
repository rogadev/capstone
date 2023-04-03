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
  <div class="container mx-auto">
    <div class="m-4">
      <div class="mb-4 text-center w-full container">
        <h2 class="text-4xl font-bold">Confirm Trips</h2>
      </div>
      <TripsUnconfirmedList />
    </div>
  </div>
</template>
