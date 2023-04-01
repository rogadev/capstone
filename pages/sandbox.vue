<template>
  <div>
    <DriveStopItem :stop="stop" :stopIsNext="true" />
  </div>
</template>

<script lang="ts" setup>
import type { Stop } from '@prisma/client';

const stop: Stop = reactive({
  id: 1,
  tripId: 123,
  createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday's date
  updatedAt: null,
  date: '2023-04-01',
  passenger: 'John Doe',
  street: '805 Wentworth Street',
  city: 'Nanaimo',
  arrivalTime: 960, // 4:00 pm in minutes from midnight
  departureTime: 965, // 5 minutes after arrivalTime
  distance: null,
  name: null,
  unit: null,
  notes: null,
  type: 'pickup',
  closed: false,
  status: 'scheduled',
});
</script>