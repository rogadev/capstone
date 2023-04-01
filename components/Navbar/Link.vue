<template>
  <li v-if="showIf" class="nav-item">
    <NuxtLink :to="to" class="btn btn-outline md:btn-ghost">
      <span class="block md:hidden lg:block">
        <Icon :title="text" :name="icon" />
      </span>
      <span class="ml-0 lg:ml-4 hidden md:block">
        {{ text }}
      </span>
    </NuxtLink>
  </li>
</template>

<script lang="ts" setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  showIf: {
    type: Boolean,
    default: false,
  },
});
</script>