<template>
  <div class="min-h-screen bg-gray-100">
    <TimeTable :stops="stopsToday" />
  </div>
</template>


<script lang="ts" setup>
import type { Stop } from '@prisma/client';
const loading = ref(false);
const allStops = ref<Stop[]>([]);
const todayDateString = ref(new Date().toISOString().split('T')[0]);
const stopsToday = computed(() => allStops.value.filter(stop => stop.date === todayDateString.value));

// fetch our stops
async function fetchStops() {
  loading.value = true;
  const response = await fetch('/api/stops');
  allStops.value = await response.json();
  loading.value = false;
}

onMounted(fetchStops);

// ABANDONED: This will be a super stretch goal

definePageMeta({
  layout: 'driver',
  middleware: 'auth'
});
useHead({
  title: 'Sandbox',
});
</script>