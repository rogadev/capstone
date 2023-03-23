<script lang="ts" setup>
import { z } from 'zod';
const { buttonType } = defineProps({
  buttonType: {
    type: String,
    default: 'btn-wide',
  },
});
const buttonTypeSchema = z.enum(['btn-wide', 'btn-narrow', 'btn-sm', 'btn-xs', 'btn-lg', 'btn-block', 'btn-circle', 'btn-square']);
buttonTypeSchema.parse(buttonType);
const loading = ref(false);
const logout = () => {
  loading.value = true;
  useSupabaseAuthClient().auth.signOut();
  loading.value = false;
  const user = useSupabaseUser();
  if (!user.value) {
    navigateTo('/');
  } else {
    console.error('Log out was attempted but failed.');
  }
};
</script>
    
<template>
  <div class="p-4">
    <button class="btn btn-secondary" :class="buttonType" @click="logout">Sign Out</button>
  </div>
</template>
