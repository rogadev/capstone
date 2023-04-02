<template>
  <div class="flex flex-row items-center justify-between w-full mb-4">
    <div class="text-lg font-bold">{{ stop.passenger }}</div>
    <div v-if="stop.unit && stop.unit !== ''" class="text-lg font-bold">Unit {{ stop.unit }}</div>
    <a class="link link-hover link-primary" :href="`tel:${phoneNumber}`">
      {{ phoneNumber }}
    </a>
  </div>

  <textarea class="w-full textarea textarea-bordered rounded-md " placeholder="Completion Notes"
    v-model="completionNote" />

  <div class="flex flex-col gap-4 md:flex-row justify-between mt-8 mb-3">
    <button class="btn btn-error btn-wide mx-auto" :class="{ 'loading btn-disabled': loading }" :disabled="loading"
      @click="() => $emit('cancel')">
      Cancel On Arrival
    </button>
    <button class="btn btn-warning btn-wide mx-auto" :class="{ 'loading btn-disabled': loading }" :disabled="loading"
      @click="() => $emit('back')">
      Back Step
    </button>
    <button class="btn btn-success btn-wide mx-auto" :class="{ 'loading btn-disabled': loading }" :disabled="loading"
      @click="completed">
      Complete
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { Stop } from '@prisma/client';
const props = defineProps({
  stop: {
    type: Object as PropType<Stop>,
    required: true,
  }
});
const emits = defineEmits(['completed']);
const completionNote: Ref<string> = ref('');
const loading = ref(false);
const phoneNumber = ref('');

async function fetchPhoneNumber() {
  const response = await fetch(`/api/trips/${props.stop.tripId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) throw new Error(response.statusText);
  const { data } = await response.json();
  phoneNumber.value = data.passengerPhone;
}

function completed() {
  loading.value = true;
  emits('completed', completionNote.value);
}

onMounted(async () => {
  await fetchPhoneNumber();
});
</script>