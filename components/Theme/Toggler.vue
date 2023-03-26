<template>
  <li class="nav-item">
    <button class="btn btn-outline md:btn-ghost"
      @click="() => $colorMode.value === 'dark' ? $colorMode.value = 'light' : $colorMode.value = 'dark'">
      <Icon v-if="$colorMode.value === 'dark'" name="ic:baseline-light-mode" />
      <Icon v-else name="ic:baseline-dark-mode" />
    </button>
  </li>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
console.log(colorMode.value);
</script>