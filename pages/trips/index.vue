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
  <div>
    <h1>Trips</h1>
    <nuxt-link to="/trips/new">
      <button type="button" class="btn btn-primary btn-wide">
        New Trip
      </button>
    </nuxt-link>
  </div>
</template>
