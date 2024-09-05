<template>
  <div>
    <!-- Next Stop Template -->
    <div v-if="stopIsNext" class="flex flex-row justify-between items-center gap-8">
      <Icon
        :name="stop.type === 'pickup' ? 'fa6-solid:person-arrow-up-from-line' : 'fa6-solid:person-arrow-down-to-line'"
        class="text-5xl" />
      <p class="text-xl font-semibold text-right">
        <span v-if="stopHasUnitNumber">Unit {{ stop.unit }}<br></span>{{ stop.street }}<br>{{ stop.city }}
      </p>
      <div v-if="!stopIsNext" class="flex flex-row-reverse">
        <button class="btn btn-outline btn-circle mr-1 flex items-center justify-center"
          @click="() => $emit('togglePeakControls')">
          <Icon
            :name="peakControls ? 'material-symbols:keyboard-arrow-up-rounded' : 'material-symbols:keyboard-arrow-down-rounded'"
            class="text-3xl mt-[1px]" />
        </button>
      </div>
    </div>

    <!-- Upcoming Stop Template -->
    <div v-else class="flex flex-row justify-between items-center gap-8">
      <div class="flex items-center gap-4">
        <Icon
          :name="stop.type === 'pickup' ? 'fa6-solid:person-arrow-up-from-line' : 'fa6-solid:person-arrow-down-to-line'"
          class="text-5xl" />
        <div class="text-xl font-semibold" :class="stopIsNext ? 'text-right' : 'text-left'">
          <span v-if="stopHasUnitNumber">Unit {{ stop.unit }}, </span>
          <p>{{ stop.street }}<br>{{ stop.city }}</p>
        </div>
      </div>
      <div v-if="!stopIsNext" class="flex flex-row-reverse">
        <button class="btn btn-outline btn-circle mr-1 flex items-center justify-center"
          @click="() => $emit('togglePeakControls')">
          <Icon
            :name="peakControls ? 'material-symbols:keyboard-arrow-up-rounded' : 'material-symbols:keyboard-arrow-down-rounded'"
            class="text-3xl mt-[1px]" />
        </button>
      </div>
    </div>

    <!-- Controls -->
    <div class="flex flex-row justify-between items-center mt-1 text-[1.05rem]">
    </div>
    <div class="flex flex-row justify-between items-center mt-1 text-[1.05rem]">
      <p class="font-bold text-2xl">{{ arrivalTimeString }} {{ stop.passenger }}</p>
      <div class="text-center font-bold text-xl">
        <p v-if="!arrivingLate">{{ stopIsToday ? timeUntilArrival : stopDateString }}</p>
        <p v-else-if="stopIsToday">Arriving Late</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Stop } from '@prisma/client';

const props = defineProps({
  stop: {
    type: Object as PropType<Stop>,
    required: true,
  },
  stopIsNext: {
    type: Boolean,
    required: true,
  },
  peakControls: {
    type: Boolean,
    required: true,
  },
  arrivingLate: {
    type: Boolean,
    required: true,
  },
  timeToArrivalString: {
    type: String as PropType<string | null>,
    required: false,
  },
});

const onTime = ref(true);

const timeUntilArrival = computed(() => {
  const now = new Date();
  const slashDate = props.stop.date.replace(/-/g, '/');
  const arrivalDate = new Date(slashDate);
  arrivalDate.setMinutes(props.stop.arrivalTime);
  const timeDiffMs = arrivalDate.getTime() - now.getTime();
  const timeDiffMinutes = Math.floor(timeDiffMs / 1000 / 60);
  if (timeDiffMinutes < 0) {
    onTime.value = false;
    return "0h 0m";
  }
  const hours = Math.floor(timeDiffMinutes / 60);
  const minutes = timeDiffMinutes % 60;
  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hoursString}h ${minutesString}m`;
});

const tripDate = computed(() => {
  const date = new Date(props.stop.date.split('-').join('/')).toDateString();
  return date;
});

const stopIsToday = computed(() => {
  const today = new Date().toDateString();
  return tripDate.value === today;
});

const arrivalTimeString = computed(() => {
  const hours = Math.floor(props.stop.arrivalTime / 60);
  const minutes = props.stop.arrivalTime % 60;
  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hoursString}:${minutesString}`;
});

const stopDateString = computed(() => {
  const date = new Date(props.stop.date.split('-').join('/'));
  return Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
});

const stopHasUnitNumber = computed(() => {
  return props.stop.unit && props.stop.unit !== '';
});
</script>