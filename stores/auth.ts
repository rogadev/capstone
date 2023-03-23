import type { User } from '@supabase/supabase-js';

export const useAuthStore = defineStore('auth', () => {
  const { auth } = useSupabaseClient();

  const user = ref<User | null>(null);

  function refreshUser() {
    const supabaseUser = useSupabaseUser();
    user.value = supabaseUser.value;
  }

  async function logout() {
    await auth.signOut();
    user.value = null;
  }

  function getUserEmail() {
    return user.value?.email;
  }

  return { user, logout, refreshUser, getUserEmail };
});