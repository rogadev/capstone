<template>
  <NuxtLink :to="to" class="btn" :class="classes">
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps({
  to: {
    type: String,
    required: true
  },
  classes: {
    type: String,
    required: false
  }
});
</script>