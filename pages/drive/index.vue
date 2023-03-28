<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="w-full flex justify-center">
        <button @click="fetchData" class="btn btn-info btn-wide">Refresh</button>
      </div>
      <div class="flex flex-row justify-evenly items-center my-4">
        <button class="btn btn-outline" @click="back">Back</button>
        <div class="border py-2 px-3 rounded-lg">{{ date }}</div>
        <button class="btn btn-outline" @click="forward">Forward</button>
      </div>
      <ul class="flex flex-col items-center">
        <h2 v-if="stops.length === 0">No stops scheduled for this day</h2>
        <li v-for="stop in stops" class="my-4 p-4 border border-white rounded-lg w-5/6"
          :class="{ 'closed': stop.status === StopStatus[5] }">
          <div class="flex justify-between">
            <p class="text-lg">
              {{ stop.passenger }}
            </p>
          </div>
          <div class="flex flex-row justify-evenly items-end gap-4 mt-4">
            <button class="btn btn-outline btn-error" @click.prevent="() => toggleCancel(stop)">{{ stop.status ===
              StopStatus[5] ? 'Undo Cancel' : 'Cancel' }}</button>
            <button class="btn btn-outline btn-square btn-warning"
              :class="{ 'disabled btn-disabled': stop.status === StopStatus[5] }"
              @click.prevent="() => decrementStop(stop)">-</button>
            <div class="flex flex-col gap-0 items-center justify-start">
              <AnimatedCarSVG v-if="stop.status === StopStatus[1] || stop.status === StopStatus[3]" />
              <Icon class="h-16 m-0 relative top-4" name="uil:car-slash" v-else-if="stop.status === StopStatus[5]" />
              <Icon class="h-16 m-0 relative top-4" name="material-symbols:check-circle-rounded"
                v-else-if="stop.status === StopStatus[4]" />
              <Icon class="h-16 m-0 relative top-4" name="mdi:car" v-else />
              <span class="rounded-md font-semibold py-1 px-3 m-0" :class="['status', stop.status]">{{ stop.status
              }}</span>
            </div>
            <button class="btn btn-square"
              :class="stop.status === StopStatus[5] || stop.status === StopStatus[4] ? 'disabled btn-disabled btn-ghost' : 'btn-success btn-outline'"
              @click.prevent="() =>
                incrementStop(stop)">+</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Stop } from '@prisma/client';
const date = ref(new Date().toISOString().substr(0, 10));
const stops: Ref<Stop[]> = ref([]);
const isLoading = ref(false);
const fetchedDates = ref(new Set());
const StopStatus = ["scheduled", "enroute", "arrived", "departed", "completed", "canceled"];

async function fetchData() {
  if (isLoading.value || fetchedDates.value.has(date.value)) return;
  isLoading.value = true;
  try {
    const response = await fetch(`/api/stops/${date.value}`);
    const data = await response.json();
    stops.value = data;
    fetchedDates.value.add(date.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
}
function changeDate(delta: number) {
  const newDate = new Date(date.value);
  newDate.setDate(newDate.getDate() + delta);
  date.value = newDate.toISOString().substr(0, 10);
}
async function incrementStop(stop: Stop) {
  switch (stop.status) {
    case StopStatus[0]:
      stop.status = StopStatus[1];
      break;
    case StopStatus[1]:
      stop.status = StopStatus[2];
      break;
    case StopStatus[2]:
      stop.status = StopStatus[3];
      break;
    case StopStatus[3]:
      stop.status = StopStatus[4];
      break;
    default:
      break;
  }
  // Send data to update the database
  // Render the change on the screen by modifying the stops ref
}
async function decrementStop(stop: Stop) {
  switch (stop.status) {
    case StopStatus[1]:
      stop.status = StopStatus[0];
      break;
    case StopStatus[2]:
      stop.status = StopStatus[1];
      break;
    case StopStatus[3]:
      stop.status = StopStatus[2];
      break;
    case StopStatus[4]:
      stop.status = StopStatus[3];
      break;
    default:
      break;
  }
  // Send data to update the database
  // Render the change on the screen by modifying the stops ref
}
async function toggleCancel(stop: Stop) {
  if (stop.status === StopStatus[5]) {
    stop.status = StopStatus[0];
    // Send data to update the database
    // Render the change on the screen by modifying the stops ref
    return;
  } else {
    stop.status = StopStatus[5];
    // Send data to update the database
    // Render the change on the screen by modifying the stops ref
  }
}
function forward() {
  changeDate(1);
}

function back() {
  changeDate(-1);
}

onMounted(fetchData);

watch(date, fetchData);
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