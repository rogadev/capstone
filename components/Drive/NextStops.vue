<template>
  <div class="mx-8 my-1 p-2 border border-white rounded-md">
    <div class="container mx-auto text-center">
      <p>{{ arrivalTimeString }}</p>
      <p>{{ timeUntilArrival }} until arrival</p>
      <p>{{ stop.passenger }} at {{ stop.street }}, {{ stop.city }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Stop } from '@prisma/client';
const props = defineProps({
  stop: {
    type: Object as PropType<Stop>,
    required: true,
  },
});

let interval: any;
const currentMinutes = ref(0);
const timeUntilArrival = computed(() => {
  const now = new Date();
  const slashDate = props.stop.date.replace(/-/g, '/');
  const arrivalDate = new Date(slashDate);
  arrivalDate.setMinutes(props.stop.arrivalTime);
  const timeDiffMs = arrivalDate.getTime() - now.getTime();
  const timeDiffMinutes = Math.floor(timeDiffMs / 1000 / 60);
  const hours = Math.floor(timeDiffMinutes / 60);
  const minutes = timeDiffMinutes % 60;
  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hoursString}h ${minutesString}m`;
});

onMounted(() => {
  interval = setInterval(() => {
    currentMinutes.value = new Date().getHours() * 60 + new Date().getMinutes();
  }, 1000);
  onUnmounted(() => clearInterval(interval));
});


const arrivalTimeString = computed(() => {
  const hours = Math.floor(props.stop.arrivalTime / 60);
  const minutes = props.stop.arrivalTime % 60;
  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hoursString}:${minutesString}`;
});

</script>