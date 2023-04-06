<template>
  <div class="bg-black" ref="container" :key="key">
    <div v-for="(time, index) in times" :key="index" class="bg-white relative"
      :class="['px-4', 'py-2', index % 2 === 0 ? 'bg-opacity-10' : 'bg-opacity-20']" :data-time="time" @drop="handleDrop"
      @dragover.prevent>
      <div class="flex items-center gap-4">
        <div class="py-1 px-2">
          {{ time }}
        </div>
        <div v-for="stop in stopsForTime(time)" :key="stop.id" :style="{ backgroundColor: colorForTrip(stop.tripId) }"
          class="rounded-t py-1 px-2 mt-2 relative" draggable="true" @dragstart="(e) => dragStart(e, stop)"
          @dragend="dragEnd">
          <Icon
            :name="stop.type === 'pickup' ? 'fa6-solid:person-arrow-up-from-line' : 'fa6-solid:person-arrow-down-to-line'" />
          {{ stop.passenger }}
          {{ minutesTo24HTime(stop.duration || 15) }}
          <div :style="{ backgroundColor: colorForTrip(stop.tripId), height: extendedHeight(stop.duration || 15) }"
            class="extended-duration absolute left-0 top-8 right-0 z-10 rounded-b"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import type { Stop } from '@prisma/client';
const props = defineProps({
  stops: {
    type: Array as PropType<Stop[]>,
    required: true
  }
});

const key = ref(0);

const times = Array.from({ length: 96 }, (_, i) => {
  const hour = Math.floor(i / 4);
  const minute = i % 4 * 15;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
});

async function updateStop(stop: Stop) {
  try {
    const response = await fetch('/api/stops/update/one', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stop),
    });

    if (!response.ok) {
      throw new Error('Failed to update stop');
    }
    key.value++;
  } catch (error) {
    console.error('Error updating stop:', error);
  }
}

let draggedStop = ref<Stop | null>(null);

const dragStart = (event: DragEvent, stop: Stop) => {
  draggedStop.value = stop;
  event.dataTransfer?.setData('text/plain', '');
};

const dragEnd = () => {
  draggedStop.value = null;
};

const handleDrop = async (event: DragEvent) => {
  event.preventDefault();
  let target = event.target as HTMLElement;
  while (target && !target.dataset.time) {
    target = target.parentElement as HTMLElement;
  }

  const time = target.dataset.time;
  if (time && draggedStop.value) {
    const updatedArrivalTime = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
    const updatedStop: Stop = {
      ...draggedStop.value,
      arrivalTime: updatedArrivalTime,
    };
    // Update local state
    const index = props.stops.findIndex(stop => stop.id === updatedStop.id);
    if (index !== -1) {
      props.stops.splice(index, 1, updatedStop);
    }
    // Update the database
    await updateStop(updatedStop);
  }
};

const minutesTo24HTime = (minutes: number) => {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

const colorForTrip = (tripId: number) => {
  // Add a simple color-generating function, or use a predefined color set
  const colors = ['#FF5733', '#9C27B0', '#3F51B5', '#009688', '#FFEB3B', '#FF9800', '#795548'];
  return colors[tripId % colors.length];
};

function stopsForTime(time: string) {
  return props.stops.filter(stop => {
    const timeInMinutes = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
    // return the stop if stop.arrivalTime is between timeInMinutes and timeInMinutes + 15
    return stop.arrivalTime >= timeInMinutes && stop.arrivalTime < timeInMinutes + 15;
  });
}

const extendedHeight = (duration: number) => {
  const timeBlockHeight = 60; // adjust this value according to your actual time block height
  const rowCount = duration / 15;
  return `${rowCount * timeBlockHeight}px`;
};

onMounted(() => {
  const containerRef = ref<HTMLDivElement | null>(null);
  // calculate necessary scroll position to vertically align 12:00 with middle of viewport
  const container = containerRef.value;
  const containerHeight = container ? container.clientHeight : 0;
  const timeBlockHeight = containerHeight / times.length;
  const targetTimeBlock = times.findIndex(time => time === '12:00');
  const targetOffset = containerHeight / 2 - timeBlockHeight / 2;
  const scrollTop = targetTimeBlock * timeBlockHeight + targetOffset;

  // scroll to position
  if (container) {
    container.scrollTop = scrollTop;
  }
})

</script>
