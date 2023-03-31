<template>
  <div class="flex flex-col justify-center">
    <DriveCurrentStopItem v-if="currentStop" @deleted="refreshStops" :stop="currentStop" />
    <div v-else class="text-center">No Stops</div>
    <DriveNextStops v-if="nextStops.length > 0" v-for="stop in nextStops" :key="stop.id" :stop="stop" />
  </div>
</template>

<script lang="ts" setup>
import type { Stop } from '@prisma/client';
const { fetchStops, getStopsForDate } = useStopStore();

const props = defineProps({
  date: {
    type: String,
    required: true,
  }
});

const todaysStops: ComputedRef<Stop[]> = computed(() => {
  return getStopsForDate(props.date);
});

const currentStop: ComputedRef<Stop> = computed(() => {
  return todaysStops.value[0];
});
const nextStops: ComputedRef<Stop[]> = computed(() => {
  return todaysStops.value.slice(1);
});

async function refreshStops() {
  await fetchStops();
}

onBeforeMount(async () => {
  await fetchStops();
});
</script>


<style scoped>
li.closed {
  opacity: 0.5;
}

.status {
  display: inline-block;
  width: 100px;
  text-align: center;
}

.status.scheduled {
  background-color: #e7e7e7;
  color: black;
}

.status.enroute {
  background-color: #70bfe4;
  color: black;
}

.status.arrived {
  background-color: #aafda7;
  color: black;
}

.status.departed {
  background-color: #5fff59;
  color: black;
}

.status.completed {
  background-color: #1efc01;
  color: black;
}

.status.canceled {
  background-color: #ff4545;
  color: white;
}
</style>