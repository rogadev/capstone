<template>
  <div class="flex flex-row justify-between items-center font-bold">
    <p class="text-left">{{ stopType }}</p>
    <div class="text-center">
      <p>Arrive In</p>
      <p v-if="!arrivingLate">{{ stopIsToday ? timeUntilArrival : stop.date }}</p>
    </div>
    <p class="text-right">{{ arrivalTimeString }}</p>
  </div>
  <div class="flex flex-row justify-between">
    <p>{{ stop.passenger }}</p>
    <p><span v-if="stop.unit && stop.unit !== ''">Unit {{ stop.unit }}, </span>{{ stop.street }}, {{ stop.city }}</p>
  </div>
</template>

<script lang="ts" setup>
import type { Stop } from '@prisma/client';
const props = defineProps({
  stop: {
    type: Object as PropType<Stop>,
    required: true,
  }
});
const stopType = computed(() => {
  if (props.stop.type === "pickup") {
    return "Pickup";
  } else {
    return "Drop Off";
  }
});

const timeRemaining = ref(true);

const timeUntilArrival = computed(() => {
  const now = new Date();
  const slashDate = props.stop.date.replace(/-/g, '/');
  const arrivalDate = new Date(slashDate);
  arrivalDate.setMinutes(props.stop.arrivalTime);
  const timeDiffMs = arrivalDate.getTime() - now.getTime();
  const timeDiffMinutes = Math.floor(timeDiffMs / 1000 / 60);
  if (timeDiffMinutes < 0) {
    timeRemaining.value = false;
    return "0h 0m";
  }
  const hours = Math.floor(timeDiffMinutes / 60);
  const minutes = timeDiffMinutes % 60;
  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hoursString}h ${minutesString}m`;
});

const tripDate = computed(() => {
  const date = new Date(props.stop.date.split('-').join('/')).toDateString();
  return date;
});

const stopIsToday = computed(() => {
  const today = new Date().toDateString();
  return tripDate.value === today;
});

const arrivalTimeString = computed(() => {
  const hours = Math.floor(props.stop.arrivalTime / 60);
  const minutes = props.stop.arrivalTime % 60;
  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hoursString}:${minutesString}`;
});

const arrivingLate = computed(() => {
  if (!stopIsToday.value) return false;
  return stopIsToday.value && arrivalTimeString.value === "00:00" && props.stop.status !== "completed";
});
</script>