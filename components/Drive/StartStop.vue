<template>
  <div class="flex flex-col gap-4 justify-between mt-8 mb-3">
    <button v-if="stopIsToday && stopIsNext" class="btn btn-success btn-wide mx-auto" @click="() => $emit('enroute')">
      Enroute
      <Icon name="fa6-solid:route" class="ml-2" />
    </button>
    <button v-if="stopType === 'pickup'" class="btn btn-error btn-wide mx-auto" @click="() => $emit('cancel')">
      <Icon name="fa6-solid:x" class="mr-2" />
      Cancel Stop
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  stopType: {
    type: String,
    required: true,
  },
  stopDate: {
    type: String,
    required: true,
  },
  stopIsNext: {
    type: Boolean,
    required: true,
  },
});
const stopIsToday = computed(() => {
  const today = new Date();
  const stopDate = new Date(props.stopDate.replace(/-/g, '/'));
  return today.toDateString() === stopDate.toDateString();
});
</script>