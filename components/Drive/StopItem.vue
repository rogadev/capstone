<template>
  <div class="mx-8 my-1 p-2 border rounded-md">
    <div class="container mx-auto">
      <div id="info" class="flex flex-col">
        <DriveStopDetails :stop="stop" :stopIsNext="stopIsNext" :peakControls="peakControls" :arrivingLate="arrivingLate"
          :timeToArrivalString="timeToArrivalString" @togglePeakControls="togglePeakControls" />
        <DriveLateIndicator v-if="stopIsToday" :stopIsNext="stopIsNext" :arrivingLate="arrivingLate"
          :timeToArrivalString="timeToArrivalString" />
      </div>
      <div v-if="displayMap" class="flex flex-col justify-center items-center">
        <DriveMap :key="stop.id" :destination="destinationString" />
      </div>
      <div v-if="displayControls" id="actions" class="flex flex-col">
        <DriveStopControls :stopIsNext="stopIsNext" :stop="stop" @refresh="() => $emit('refresh')" />
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

const { lat, lon, getGeoLocation } = useGeoLocation();

const peakControls = ref(false);
const destinationString = computed(() => `${props.stop.street}, ${props.stop.city}`);
const displayMap = computed(() => props.stopIsNext || peakControls.value);
const displayControls = computed(
  () => !['completed', 'cancelled'].includes(props.stop.status) && displayMap.value
);

const stopIsToday = computed(() => {
  const today = new Date();
  const stopDate = new Date(props.stop.date.replace(/-/g, '/'));
  return (today.getFullYear() === stopDate.getFullYear() &&
    today.getMonth() === stopDate.getMonth() &&
    today.getDate() === stopDate.getDate());
});

const arrivingLate = ref(false);
const minutesUntilArrival = ref(-1);
const timeToArrivalString = computed(() => {
  if (minutesUntilArrival.value < 0) return null;
  if (minutesUntilArrival.value === 0) return 'Arriving now';
  if (minutesUntilArrival.value === 1) return '1 minute';
  return `${minutesUntilArrival.value} minutes`;
});

async function calculateTimeToArrive() {
  if (!props.stopIsNext) return;

  if (!lat.value || !lon.value) getGeoLocation();
  if (!lat.value || !lon.value) {
    console.warn('Browser is not providing the app with users current geolocation.');
    return;
  }

  const response = await fetch('/api/maps/time-to-arrive', {
    method: 'POST',
    body: JSON.stringify({
      origin: `${lat.value},${lon.value}`,
      destination: destinationString.value,
    }),
  });
  const timeToArrive = await response.json();

  const now = new Date().getHours() * 60 + new Date().getMinutes();
  arrivingLate.value = now + timeToArrive > props.stop.arrivalTime;
  minutesUntilArrival.value = timeToArrive;
}

function togglePeakControls() {
  peakControls.value = !peakControls.value;
}

onMounted(async () => {
  await getGeoLocation();
  await calculateTimeToArrive();
});

watchEffect(() => {
  calculateTimeToArrive();
});
</script>
