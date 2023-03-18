<script setup lang="ts">
const supabase = useSupabaseClient();

const loading = ref(false);

const handleGoogleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/dashboard'
      }
    });
    if (error) throw error;
  } catch (error: any) {
    alert(error.error_description || error.message);
  }
};
</script>

<template>
  <PrimaryButton @click="handleGoogleLogin" :loading="loading">
    <div class="flex flex-row gap-4">
      <Icon name="mdi:google" />
      Sign in with Google
    </div>
  </PrimaryButton>
</template>