<template>
  <div class="mx-8 my-1 p-2 border rounded-md">
    <div class="container mx-auto">
      <div id="info" class="flex flex-col">
        <DriveLateIndicator v-if="arrivingLate" />
        <DriveStopDetails :stop="stop" :stopIsNext="stopIsNext" :peakControls="peakControls"
          @togglePeakControls="togglePeakControls" />
      </div>
      <div v-if="stopIsNext || peakControls" class="flex flex-col justify-center items-center">
        <DriveMap :key="stop.id" :destination="destinationString" />
      </div>
      <div v-if="showControls || peakControls" id="actions" class="flex flex-col">
        <DriveStopControls :stop="stop" @refresh="() => $emit('refresh')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Stop } from '@prisma/client';

defineEmits(['refresh']);
const props = defineProps({
  stop: {
    type: Object as PropType<Stop>,
    required: true,
  },
  stopIsNext: {
    type: Boolean,
    required: true,
  },
});

const peakControls = ref(false);
const currentTimeInMinutes = ref(0);

const lat = ref(0);
const lon = ref(0);

const isNextStop = computed(() => props.stopIsNext === true);
const isCompleted = computed(() => props.stop.status === 'completed');
const isCancelled = computed(() => props.stop.status === 'cancelled');
const destinationString = computed(() => `${props.stop.street}, ${props.stop.city}`);

const showControls = computed(() => {
  if (isCompleted.value || isCancelled.value) return false;
  return isNextStop.value || peakControls.value;
});

const arrivalTimeString = computed(() => {
  const { arrivalTime } = props.stop;
  const hours = Math.floor(arrivalTime / 60).toString().padStart(2, '0');
  const minutes = (arrivalTime % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
});

const stopIsToday = computed(() => {
  const today = new Date();
  const stopDate = new Date(props.stop.date.replace(/-/g, '/'));
  return today.toDateString() === stopDate.toDateString();
});

// TODO - Not working
const now = ref();
const timeToArrive = ref();
const calculateTimeToArrive = async () => {
  if (!isNextStop.value) return null;
  updateCurrentLocation();
  const metrics = await fetch('/api/maps/duration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      origin: [lat.value, lon.value],
      destination: destinationString.value,
    }),
  }).then((res) => res.json());
  const { duration } = metrics;
  console.log(duration);
  if (!duration || typeof duration !== 'number') return null;
  return duration;
};

// arriving late if now (in minutes) + timeToArrive is greater than arrivalTime (in minutes)
const arrivingLate = computed(() => {
  if (!stopIsToday.value) return false;
  const now = new Date().getHours() * 60 + new Date().getMinutes();
  if (timeToArrive.value + now > props.stop.arrivalTime) return true;

  return arrivalTimeString.value === "00:00" && props.stop.status !== "completed" && props.stop.status !== "cancelled";
});

function updateCurrentLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    lat.value = position.coords.latitude;
    lon.value = position.coords.longitude;
  });
}

function togglePeakControls() {
  peakControls.value = !peakControls.value;
}


let interval: NodeJS.Timeout;
onMounted(async () => {
  updateCurrentLocation();
  await calculateTimeToArrive();

  interval = setInterval(() => {
    currentTimeInMinutes.value = new Date().getHours() * 60 + new Date().getMinutes();
    now.value = currentTimeInMinutes.value;
  }, 5000);
});

onUnmounted(() => clearInterval(interval));
</script>