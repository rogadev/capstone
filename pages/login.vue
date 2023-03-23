<script lang="ts" setup>
try {
  const supabase = useSupabaseClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/dashboard'
    }
  });
  if (error) throw error;
} catch (error: any) {
  console.error(`An issue occurred connecting to the auth package (login component): \n${error.message}`);
}
</script>