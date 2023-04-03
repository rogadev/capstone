import { default } from '../HeroSection.vue';
<template>
  <div class="form-control">
    <label class="label" :for="name">
      <span class="label-text">{{ label }}</span>
    </label>
    <input :name="name" :required="required" :label="label" :placeholder="label" :type="type"
      :class="['input', 'input-bordered', required ? 'input-accent' : 'input-info']" :value="value" />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: String,
    required: true,
  },
});
</script>