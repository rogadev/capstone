<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
onMounted(async () => {
  const { logout } = useAuthStore();
  await logout();
  return navigateTo('/auth/callback');
});
</script>