<template>
  <div class="flex flex-col items-center justify-center my-4">
    <DriveStartStop v-if="stop.status === 'scheduled' && !confirmCancel" :stop="stop" @cancel="() => confirmCancel = true"
      @enroute="enroute" :stopType="stop.type" />
    <DriveEnrouteToStop v-if="stop.status === 'enroute'" :stop="stop" @arrived="arrived"
      @back="() => stop.status = 'scheduled'" />
    <DriveArrivedAtStop v-if="stop.status === 'arrived' && !confirmCancel" :stop="stop"
      @cancel="() => confirmCancel = true" @completed="completed" @back="() => stop.status = 'enroute'" />
    <DriveCancelStop v-if="confirmCancel" :stopID="stop.id" @deleted="() => emits('refresh')"
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
const emits = defineEmits(['refresh']);

const confirmCancel = ref(false);
const currentLocation = reactive({ lat: 0, lon: 0 });

async function enroute() {
  const addressString = `${props.stop.street}, ${props.stop.city}`;
  const slugAddress = addressString.replace(/ /g, '+');
  const lat = currentLocation.lat;
  const lon = currentLocation.lon;

  // Responds with { distance, duration } if successful after also updating the stop with these values.
  const metricsResponse = await fetch('/api/maps/stop', {
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
  const { distance, duration } = await metricsResponse.json() as { distance: number; duration: number; };
  console.info(`Distance: ${distance} km, Duration: ${duration} minutes`);

  await stopStore.updateStopStatus(props.stop, "enroute");
  window.open(`https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${slugAddress}&travelmode=driving`, '_blank');
}

async function arrived() {
  await stopStore.updateStopStatus(props.stop, "arrived");
}

async function completed(notes: string) {
  await stopStore.completeStop(props.stop, notes);
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