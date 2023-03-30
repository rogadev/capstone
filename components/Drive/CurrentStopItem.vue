<template>
  <div class="mx-8 my-1 p-2 border border-slate-700 dark:border-white rounded-md">
    <div class="container mx-auto">
      <DriveLateIndicator v-if="arrivingLate" />
      <div class="flex flex-col">
        <div class="flex flex-row justify-between">
          <p>{{ stopType }}</p>
          <p class="font-semibold" v-if="!arrivingLate">{{ timeRemaining }}</p>
          <p>{{ arrivalTime }}</p>
        </div>
        <div class="flex flex-row justify-between">
          <p>{{ stop.passenger }}</p>
          <p><span v-if="stop.unit !== ''">{{ stop.unit }} - </span>{{ stop.street }}, {{ stop.city }}</p>
        </div>
        <div class="flex flex-row justify-between py-4">
          <button class="btn btn-primary btn-wide mx-auto" @click="enroute" v-if="progress === 0">Enroute</button>
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
  case "arrived":
    progress.value = 2;
    break;
  case "departed":
    progress.value = 3;
    break;
  case "completed":
    progress.value = 4;
    break;
  default:
    progress.value = 5;
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

const arrivingLate = computed(() => {
  return timeRemaining.value === "00:00" && props.stop.status !== "completed";
});

function enroute() {
  incStopStatus(props.stop);
  progress.value = 1;
  const addressString = `${props.stop.street} ${props.stop.city}`;
  const slugAddress = addressString.replace(/ /g, '+');
  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${slugAddress}&travelmode=driving`, '_blank');
  });
}

function arrived() {
  incStopStatus(props.stop);
  progress.value = 2;
}

function departed() {
  incStopStatus(props.stop);
  progress.value = 3;
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
  navigator.geolocation.getCurrentPosition(() => console.log('Using geolocation'));
});

onUnmounted(() => {
  clearInterval(timeClock);
});

</script>