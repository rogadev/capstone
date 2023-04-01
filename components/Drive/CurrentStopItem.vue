<template>
  <div>
    <DriveLateIndicator v-if="timeRemaining === '00:00' && stop.status !== 'completed'" />
    <p v-else>{{ timeRemaining }}</p>
    <p>{{ stopType }}</p>
    <p>{{ stop.passenger }}</p>
    <p>{{ stop.street }}, {{ stop.city }}</p>
    <p>{{ arrivalTime }}</p>
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

const currentTime = ref(new Date());
const timeClock = setInterval(() => {
  currentTime.value = new Date();
}, 1000);

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

function enroute() {
  incStopStatus(props.stop);
  progress.value = 1;
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

onUnmounted(() => {
  clearInterval(timeClock);
});

</script>