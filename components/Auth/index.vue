<script setup lang="ts">
const supabase = useSupabaseClient();
const loading = ref(false);
const { BaseUrl } = useRuntimeConfig();

const handleGoogleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${BaseUrl}/auth/callback}`
      }
    });
    if (error) throw error;
  } catch (error: any) {
    alert(error.error_description || error.message);
  }
};
</script>

<template>
  <div class="flex justify-center items-center flex-col">
    <div class="mt-12 mb-4 px-6 text-center prose">
      <h1>Driver Login</h1>
      <p>This page is for drivers only. If you are a client, we don't have a login page for you yet. But it's coming soon.
      </p>
    </div>
    <PrimaryButton @click="handleGoogleLogin" :loading="loading">
      <div class="flex flex-row gap-4">
        <Icon name="mdi:google" />
        Sign in with Google
      </div>
    </PrimaryButton>
  </div>
</template>
