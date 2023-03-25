<template>
  <div class="container mx-auto">
    <Auth v-if="!user" />
    <NewTripsForm v-else />
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
</script>