<template>
  <Auth />
</template>

<script>
const user = useSupabaseUser();
watch(user, () => {
  if (user.value) navigateTo('/dashboard');
});
</script>