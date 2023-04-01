<template>
  <div class="flex flex-col gap-4 md:flex-row justify-between mt-8 mb-3">
    <button v-if="stop.status === 'scheduled' && !confirmCancel" class="btn btn-error btn-wide mx-auto"
      @click="() => confirmCancel = true">
      Cancel
    </button>
    <button class="btn btn-info btn-wide mx-auto" @click="enroute" v-if="stop.status === 'scheduled'">
      Enroute
    </button>
    <DriveCompleteTrip v-if="stop.status === 'completed'" :stop="stop" @completed="stopCompleted" />
    <DriveCancelTrip v-if="confirmCancel" :stopID="stop.id" @deleted="stopDeleted"
      @cancel="() => confirmCancel = false" />
  </div>
</template>

<script lang="ts" setup>
import type { Stop } from '@prisma/client';
const stopStore = useStopStore();
const props = defineProps({
  stop: {
    type: Object as PropType<Stop>,
    required: true,
  }
});
const emits = defineEmits(['completed', 'deleted']);
function stopCompleted() { emits('completed'); }
function stopDeleted() { emits('deleted'); }

const confirmCancel = ref(false);
const currentLocation = reactive({ lat: 0, lon: 0 });

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

function updateCurrentLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    currentLocation.lat = position.coords.latitude;
    currentLocation.lon = position.coords.longitude;
  });
}

onMounted(() => {
  updateCurrentLocation();
});
</script>