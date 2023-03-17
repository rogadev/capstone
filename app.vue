<script setup>
import './assets/css/tailwind.css';
const colorMode = useColorMode();
const theme = ref(colorMode.value);
watch(colorMode, () => {
  theme.value = colorMode.value === 'dark' ? 'dracula' : 'light';
});
useHead({
  htmlAttrs: computed(() => ({
    'data-theme': theme.value
  }))
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
