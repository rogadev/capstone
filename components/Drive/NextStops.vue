<template>
  <div class="mx-8 my-1 p-2 border border-white rounded-md">
    <div class="container mx-auto">
      <p>{{ stop.passenger }}</p>
      <p>{{ arrivalTime }}</p>

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
});
const arrivalTime = computed(() => {
  return new Date(props.stop.arrivalTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
});

</script>