<script setup lang="ts">
const { $trpc } = useNuxtApp();

const { data } = await $trpc.hello.hello.useQuery({ text: 'Ryan' });
const { data: test } = await $trpc.test.one.useQuery({ text: 'success' });
</script>

<template>
  <div>
    <p>{{ data?.greeting }}</p>
    <p>{{ test?.result }}</p>
  </div>
</template>
