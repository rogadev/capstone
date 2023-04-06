<template>
  <div class="min-h-screen bg-gray-100">
    <!-- drag and drop view goes here -->
  </div>
</template>


<script lang="ts" setup>
import type { Stop } from '@prisma/client';
const loading = ref(false);
const stops = ref<Stop[]>([]);

// fetch our stops
async function fetchStops() {
  loading.value = true;
  const response = await fetch('/api/stops/today');
  stops.value = await response.json();
  loading.value = false;
}

// ABANDONED: This will be a super stretch goal

definePageMeta({
  layout: 'driver',
  middleware: 'auth'
});
useHead({
  title: 'Sandbox',
});
</script>