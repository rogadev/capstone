<template>
  <nav aria-label="breadcrumb" class="flex flex-col items-center pt-4 text-sm md:text-base">
    <ol class="flex">
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="index" class="mr-2">
        <a :href="breadcrumb.url" class="text-accent font-bold hover:underline">{{ breadcrumb.text }}</a>
        <span v-if="index < breadcrumbs.length - 1" class="mx-2">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
  breadcrumbs: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.breadcrumb {
  font-size: 0.9rem;
}
</style>
