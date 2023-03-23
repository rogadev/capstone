<script setup lang="ts">
definePageMeta({
  layout: 'driver',
});
useHead({
  title: 'Driver Dashboard',
});
const user = useSupabaseUser();
</script>

<!-- Due to an issue with Supabase auth for Nuxt, user is not immediately returned,
    so we cannot auth guard here or we'll end up in a loop between dashboard and
    login provider page. -->

<template>
  <DashboardTabs v-if="user" :user="user" />
  <Auth v-else />
</template>