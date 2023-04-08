<template>
  <div v-if="arrivingLate" class="late-indicator">
    <p>Arriving Late</p>
  </div>
  <p v-else-if="stopIsNext && timeToArrivalString" class="text-center font-bold text-xl pt-4">
    Stop is {{ timeToArrivalString }} away
  </p>
</template>

<script lang="ts" setup>
defineProps({
  arrivingLate: {
    type: Boolean,
    required: true,
  },
  stopIsNext: {
    type: Boolean,
    required: true,
  },
  timeToArrivalString: {
    type: String as PropType<string | null>,
    required: true,
  },
});
</script>

<style scoped>
/* late-indicator should slowly flash red and dark red */
.late-indicator {
  background-color: #ff0000;
  color: #ffffff;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
}

.late-indicator p {
  margin: 0;
  padding: 0;
  text-align: center;
}
</style>