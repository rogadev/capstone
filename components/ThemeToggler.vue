<template>
  <button class="btn btn-ghost" @click="toggleColorMode">
    <Icon v-if="$colorMode.value === 'dark'" name="ic:baseline-light-mode" />
    <Icon v-else name="ic:baseline-dark-mode" />
  </button>
</template>

<script setup>
const colorMode = useColorMode();
const toggleColorMode = () => {
  colorMode.value = colorMode.value === 'light' ? 'dark' : 'light';
};
</script>
