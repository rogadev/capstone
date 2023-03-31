<template>
  <div class="mx-8 my-1 p-2 border border-slate-700 dark:border-white rounded-md">
    <div class="container mx-auto">
      <DriveLateIndicator v-if="arrivingLate" />
      <div class="flex flex-col">
        <div class="flex flex-row justify-between">
          <p>{{ stopType }}</p>
          <p class="font-semibold" v-if="!arrivingLate">{{ stopIsToday ? timeRemaining : stop.date }}</p>
          <p>{{ arrivalTime }}</p>
        </div>
        <div class="flex flex-row justify-between">
          <p>{{ stop.passenger }}</p>
          <p><span v-if="stop.unit !== ''">{{ stop.unit }} - </span>{{ stop.street }}, {{ stop.city }}</p>
        </div>
        <div class="flex flex-row justify-between mt-8 mb-3">
          <button class="btn btn-error btn-wide mx-auto" @click="canceled" v-if="progress !== 2">Cancel</button>
          <button class="btn btn-info btn-wide mx-auto" @click="enroute" v-if="progress === 0">Enroute</button>
          <button class="btn btn-success btn-wide mx-auto" @click="completed" v-if="progress === 1">Completed</button>
        </div>
        <div v-if="progress > 0" class="flex flex-row justify-evenly gap-10 m-4">
          <div class="flex flex-col w-full">
            <label for="cancellationNotes" class="text-center">Cancellation Notes</label>
            <textarea id="cancellationNotes" v-model="cancellationNotes" class="w-full" rows="3"></textarea>
          </div>
          <div class="flex flex-col w-full">
            <label for="completionNotes" class="text-center">Completion Notes</label>
            <textarea id="completionNotes" v-model="completionNotes" class="w-full" rows="3"></textarea>
          </div>
        </div>
        <div class="flex flex-row justify-between">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Stop } from '@prisma/client';

const { incStopStatus, completeStop, cancelStop } = useStopStore();

const completionNotes = ref("");
const cancellationReason = ref("");
const cancellationNotes = ref("");

const props = defineProps({
  stop: {
    type: Object as PropType<Stop>,
    required: true,
  }
});

const progress = ref(-1);
const currentTime = ref(new Date());

const timeClock = setInterval(() => {
  currentTime.value = new Date();
}, 1000);

switch (props.stop.status) {
  case "scheduled":
    progress.value = 0;
    break;
  case "enroute":
    progress.value = 1;
    break;
  case "completed":
    progress.value = 2;
    break;
  default:
    progress.value = 3;
    break;
}

const stopType = computed(() => {
  if (props.stop.type === "pickup") {
    return "Pickup";
  } else {
    return "Drop Off";
  }
});
const arrivalTime = computed(() => {
  return new Date(props.stop.arrivalTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
});
const timeRemaining = computed(() => {
  const time = new Date(props.stop.arrivalTime).getTime() - currentTime.value.getTime();
  if (time < 0) {
    clearInterval(timeClock);
    return "00:00";
  }
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  return `${minutes}:${seconds}`;
});
const tripDate = computed(() => {
  const date = new Date(props.stop.date.split('-').join('/')).toDateString();
  return date;
});
const stopIsToday = computed(() => {
  const today = new Date().toDateString();
  return tripDate.value === today;
});
const arrivingLate = computed(() => {
  if (!stopIsToday.value) return false;
  return stopIsToday.value && timeRemaining.value === "00:00" && props.stop.status !== "completed";
});

function enroute() {
  incStopStatus(props.stop);
  progress.value = 1;
  const addressString = `${props.stop.street} ${props.stop.city}`;
  const slugAddress = addressString.replace(/ /g, '+');
  navigator.geolocation.getCurrentPosition(async function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    await fetch('/api/maps/stop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        origin: {
          lat,
          lon,
        },
        destination: slugAddress,
        stop: props.stop,
      })
    });
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${slugAddress}&travelmode=driving`, '_blank');
  });
}

function completed() {
  completeStop(props.stop, completionNotes.value);
  progress.value = 4;
}

function canceled() {
  cancelStop(props.stop, cancellationReason.value, cancellationNotes.value);
  progress.value = 5;
}

onMounted(() => {
  navigator.geolocation.getCurrentPosition(() => { });
});

onUnmounted(() => {
  clearInterval(timeClock);
});

</script>