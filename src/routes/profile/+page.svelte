<script lang="ts">
	import { page } from '$app/stores';
	import supabase from '$lib/db';

	const logout = async () => {
		await supabase.auth.signOut();
		window.location.href = '/dashboard';
	};
</script>

<svelte:head>
	<title>EzEval | Profile | {$page.data.session?.user.user_metadata.full_name}</title>
</svelte:head>

<h1>{$page.data.session?.user.email}</h1>

<button on:click={logout}> Logout </button>
