<template>
  <nuxt-link :to="href" :target="target" :type="type" :rel="rel ?? undefined" :disabled="disabled ?? undefined"
    class="btn btn-primary btn-wide" :class="className">
    <slot />
  </nuxt-link>
</template>

<script setup>
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