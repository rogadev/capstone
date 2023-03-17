<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  onClick: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="p-4">
    <button @click="onClick" class="btn btn-primary">
      <slot />
    </button>
  </div>
</template>