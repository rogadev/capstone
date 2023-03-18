<script setup>
const props = defineProps({
  onClick: {
    type: Function,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="p-4">
    <button v-if="loading" class="btn btn-primary loading" disabled>
      Loading...
    </button>
    <button v-else @click="onClick" class="btn btn-primary">
      <slot />
    </button>
  </div>
</template>