<script setup lang="ts">
onMounted(async () => {
  const user = useSupabaseUser();
  if (!user.value) {
    window.location.href = '/';
  }
});
</script>

<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <Account />
  </div>
</template>