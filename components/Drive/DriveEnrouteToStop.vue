<template>
  <div class="flex flex-col gap-4 md:flex-row justify-between mt-8 mb-3">
    <button class="btn btn-success btn-wide mx-auto" @click="() => $emit('arrived')">
      Arrived
      <Icon name="fa6-solid:check" class="ml-2" />
    </button>
    <button class="btn btn-warning btn-wide mx-auto" @click="() => $emit('back')">
      <Icon name="fa6-solid:arrow-left" class="mr-2" />
      Go Back
    </button>
  </div>
</template>