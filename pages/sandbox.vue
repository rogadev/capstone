<template>
  <div>
    <button @click="() => showModal = true">Show Modal</button>
    <CancelTripModal v-if="showModal" :cancelCloseModal="cancelCloseModal" :confirmCloseModal="confirmCloseModal" />
  </div>
</template>

<script lang="ts" setup>
const showModal = ref(false);

function cancelCloseModal() {
  showModal.value = false;
  console.log('cancelCloseModal');
}
function confirmCloseModal() {
  showModal.value = false;
  console.log('confirmCloseModal');
}
</script>