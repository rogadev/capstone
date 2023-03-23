<script lang="ts" setup>
onMounted(() => {
  // TODO Ask Bill...
  // const supabase = useSupabaseClient();
  // supabase.auth.onAuthStateChange(async (event) => {
  //   if (event === 'SIGNED_IN') {
  //     window.location.href = '/dashboard';
  //   }
  // });

  window.location.href = '/dashboard'; // for now...
});
</script>