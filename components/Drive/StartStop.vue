<template>
  <div class="flex flex-col gap-4 md:flex-row justify-between mt-8 mb-3">
    <button class="btn btn-error btn-wide mx-auto" @click="() => $emit('cancel')">
      Cancel
    </button>
    <button class="btn btn-success btn-wide mx-auto" @click="() => $emit('enroute')">
      Enroute
    </button>
  </div>
</template>