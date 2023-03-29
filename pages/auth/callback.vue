<script lang="ts" setup>
const user = useSupabaseUser();
if (!user.value) navigateTo('/');
else navigateTo('/dashboard');
</script>