<script>
	import { page } from '$app/stores';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if !$page.data.session}
	<h1>You are not logged in</h1>
	<div class="p-4">
		<a href="/login" class="bg-blue-900 text-white p-2 rounded shadow m-4">Login</a>
		<a href="/dashboard" class="bg-blue-900 text-white p-2 rounded shadow m-4"> Dashboard </a>
	</div>
{:else}
	<h1>Welcome {$page.data.session.user.email}</h1>
	<p>You are logged in!</p>
	<a href="/dashboard" class="bg-blue-900 text-white p-2 rounded shadow m-4"> Dashboard </a>
{/if}
