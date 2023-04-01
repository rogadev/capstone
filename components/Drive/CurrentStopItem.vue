<template>
  <div class="mx-8 my-1 p-2 border border-slate-700 dark:border-white rounded-md">
    <div class="container mx-auto">
      <DriveLateIndicator v-if="arrivingLate" />
      <div class="flex flex-col">
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
          <p><span v-if="stop.unit !== ''">{{ stop.unit }} - </span>{{ stop.street }}, {{ stop.city }}</p>
        </div>
        <div v-if="!confirmCancel" class="flex flex-col gap-4 md:flex-row justify-between mt-8 mb-3">
          <button class="btn btn-error btn-wide mx-auto" @click="() => confirmCancel = true"
            v-if="stop.status === 'scheduled'">Cancel</button>
          <button v-if="stop.status === 'enroute'" @click="goBack">Go back</button>
          <button class="btn btn-info btn-wide mx-auto" @click="enroute"
            v-if="stop.status === 'scheduled'">Enroute</button>
          <button class="btn btn-success btn-wide mx-auto" @click="completed"
            v-if="stop.status === 'enroute'">Completed</button>
        </div>
        <DriveCancelTrip v-else :stopID="stop.id" @deleted="stopDeleted" @cancel="() => confirmCancel = false" />
        <div v-if="stop.status === 'enroute'" class="flex flex-row justify-evenly gap-10 m-4">
          <div class="flex flex-col w-full">
            <label for="completionNotes" class="text-center">Completion Notes</label>
            <textarea id="completionNotes" v-model="completionNote" class="w-full" rows="3"></textarea>
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

const stopStore = useStopStore();
const completionNote: Ref<string> = ref('');
const confirmCancel = ref(false);
const currentLocation = reactive({
  lat: 0,
  lon: 0,
});

const props = defineProps({
  stop: {
    type: Object as PropType<Stop>,
    required: true,
  }
});

const emits = defineEmits(['deleted']);

const currentTime = ref(new Date());

const timeClock = setInterval(() => {
  currentTime.value = new Date();
}, 1000);

const stopType = computed(() => {
  if (props.stop.type === "pickup") {
    return "Pickup";
  } else {
    return "Drop Off";
  }
});

let interval: any;
const currentMinutes = ref(0);
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
  return stopIsToday.value && arrivalTimeString.value === "00:00" && props.stop.status !== "completed";
});

function stopDeleted() {
  confirmCancel.value = false;
  emits('deleted');
}

async function enroute() {
  const addressString = `${props.stop.street}, ${props.stop.city}`;
  const slugAddress = addressString.replace(/ /g, '+');
  const lat = currentLocation.lat;
  const lon = currentLocation.lon;
  await fetch('/api/maps/stop', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      origin: [lat, lon],
      destination: slugAddress,
      stop: props.stop,
    })
  });
  await stopStore.updateStopStatus(props.stop, "enroute");

  window.open(`https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${slugAddress}&travelmode=driving`, '_blank');
}

async function goBack() {
  await stopStore.updateStopStatus(props.stop, "scheduled");
  // await stopStore.fetchStops();
}

async function completed() {
  stopStore.completeStop(props.stop, completionNote.value);
  await stopStore.updateStopStatus(props.stop, "completed");
  // await stopStore.fetchStops();
}

onMounted(() => {
  navigator.geolocation.getCurrentPosition(async function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    currentLocation.lat = lat;
    currentLocation.lon = lon;
  });
});

onUnmounted(() => {
  clearInterval(timeClock);
});

</script>