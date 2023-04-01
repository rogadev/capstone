<template>
  <button class="btn btn-success btn-wide mx-auto" @click="completeTrip"
    v-if="stop.status === 'enroute'">Completed</button>
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
const emits = defineEmits(['completed']);

const completionNote: Ref<string> = ref('');

async function completeTrip() {
  await stopStore.completeStop(props.stop, completionNote.value);
  emits('completed');
}
</script>