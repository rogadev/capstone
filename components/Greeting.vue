<script setup>
const { $trpc } = useNuxtApp();
const { data, pending, error } = await $trpc.hello.greet.useQuery({ text: 'Ryan' });
</script>

<template>
  <div v-if="pending">
    <p>Loading...</p>
  </div>
  <div v-else>
    <p>{{ data?.greeting }}</p>
  </div>
  <div v-if="error">
    <p>{{ error.message }}</p>
  </div>
</template>