<script setup lang="ts">
const { $trpc } = useNuxtApp();

const { data, pending } = await $trpc.test.one.useQuery({ text: 'success' });
</script>

<template>
  <div>
    <div v-if="pending">
      <p>Loading...</p>
    </div>
    <div v-else>
      <p>{{ data?.result }}</p>
    </div>
  </div>
</template>