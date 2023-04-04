<template>
  <div class="flex flex-col gap-4 md:flex-row justify-between mt-8 mb-3">
    <button class="btn btn-success btn-wide mx-auto" @click="() => $emit('enroute')">
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
defineProps({
  stopType: {
    type: String,
    required: true,
  }
});
</script>