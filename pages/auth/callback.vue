<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
const { refreshUser } = useAuthStore();
refreshUser();
const { user } = useAuthStore();
if (user === null) navigateTo('/');
else navigateTo('/dashboard');
</script>