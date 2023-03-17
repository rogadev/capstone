<template>
  <button :type="type" :rel="rel ?? undefined" :disabled="disabled ?? undefined" class="btn btn-accent btn-wide"
    :class="className">
    <nuxt-link v-if="href" :to="href" :target="target">
      <slot />
    </nuxt-link>
    <slot v-else />
  </button>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  href: {
    type: String,
    default: null,
  },
  target: {
    type: String,
    default: null,
  },
  rel: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: 'btn-accent',
  },
});
</script>