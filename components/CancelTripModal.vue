<template>
  <div class="fixed top-0 z-20 w-screen h-screen bg-black bg-opacity-50" @click.self="() => cancelCloseModal()">
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-1/2 bg-gray-700 rounded">
      <div class="flex flex-col items-center justify-center h-full p-4">
        <h1 class="text-2xl font-bold">Are you sure you want to cancel this trip?</h1>
        <div class="flex flex-col md:flex-row items-center justify-center w-full mt-8 gap-8">
          <button class="btn btn-info sm:btn-wide gap-2" @click="() => cancelCloseModal()">
            <Icon name="material-symbols:arrow-back" />No, Keep It
          </button>
          <button class="btn btn-error sm:btn-wide gap-2" @click="() => confirmCloseModal()">
            <Icon name="mdi:delete" />Yes, Cancel It
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  cancelCloseModal: {
    type: Function,
    required: true
  },
  confirmCloseModal: {
    type: Function,
    required: true
  }
});
</script>