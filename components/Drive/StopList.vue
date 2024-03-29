<template>
  <div class="flex flex-col justify-center max-w-lg mx-auto">
    <DriveStopItem v-if="currentStop !== null" @refresh="() => refreshStops()" :stop="currentStop" :stop-is-next="true" />

    <!-- TODO Add a "send invoice" button -->
    <div v-else-if="stopsThisDay.length > 0" class="text-center mt-8">
      Good Work - All Stops Completed!
    </div>
    <div v-else class="text-center mt-8">
      No Stops This Day
    </div>
    <DriveStopItem v-if="nextStops.length > 0" v-for="stop in nextStops" @refresh="() => refreshStops()" :key="stop.id"
      :stop="stop" :stop-is-next="false" />
  </div>
</template>

<script lang="ts" setup>
import type { Stop } from '@prisma/client';

const props = defineProps({
  date: {
    type: String,
    required: true,
  }
});

const stopStore = useStopStore();
const { fetchStops, getStopsForDate } = stopStore;
const stopsThisDay = ref<Stop[]>([]);

watchEffect(() => {
  stopsThisDay.value = getStopsForDate(props.date);
});

function todaysStops() {
  const stopsToday = getStopsForDate(props.date);
  stopsThisDay.value = stopsToday;
  const filteredStops = stopsToday.filter(stop => stop.status !== "completed" && stop.status !== "canceled");
  const sortedStops = filteredStops.sort((a, b) => a.arrivalTime - b.arrivalTime);
  return sortedStops as Stop[];
}

const currentStop: ComputedRef<Stop | null> = computed(() => {
  const stopsToday = todaysStops();
  if (stopsToday.length < 1) return null;
  return stopsToday[0];
});

const nextStops: ComputedRef<Stop[]> = computed(() => {
  const stopsToday = todaysStops();
  return stopsToday.slice(1);
});

async function refreshStops() {
  await fetchStops();
}

onMounted(async () => {
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