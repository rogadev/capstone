<script setup lang="ts">
definePageMeta({
  middleware: 'auth-guard',
});
const user = useSupabaseUser();
</script>

<template>
  <DashboardTabs v-if="user" :user="user" />
  <Auth v-else />
</template>