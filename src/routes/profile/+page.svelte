<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>EzEval | Profile | {$page.data.session?.user.user_metadata.full_name}</title>
</svelte:head>

<p class="mt-8 text-center text-3xl font-semibold">Welcome, {$page.data.session?.user.email}</p>
