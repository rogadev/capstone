<script lang="ts" setup>
onMounted(async () => {
  const supabase = useSupabaseAuthClient();
  await supabase.auth.signOut();
  navigateTo('/');
});
</script>