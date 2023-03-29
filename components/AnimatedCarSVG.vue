<template>
  <div class="inline-block h-14 p-4">
    <Icon name="mdi:car" class="relative top-4 car-icon" />
  </div>
</template>

<style scoped>
.car-icon {
  animation-name: carBounce;
  animation-duration: 1s;
  animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  animation-delay: -0.25s;
  animation-iteration-count: infinite;
}

@keyframes carBounce {
  0% {
    top: .25;
  }

  50% {
    top: -0.25rem;
  }

  100% {
    top: .25;
  }
}
</style>