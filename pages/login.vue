<script lang="ts" setup>
const { BaseUrl } = useRuntimeConfig();
try {
  const supabase = useSupabaseClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${BaseUrl}/auth/callback`
    }
  });
  if (error) throw error;
} catch (error: any) {
  console.error(`An issue occurred connecting to the auth package (login component): \n${error.message}`);
}
</script>