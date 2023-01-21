<script>
	import { page } from '$app/stores';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if !$page.data.session}
	<h1>You are not logged in</h1>
	<form action="">
		<button class="bg-blue-900 text-white rounded p-2 shadow" formaction="?login&provider=google">
			Login With Google
		</button>
	</form>
{:else}
	<h1>Welcome {$page.data.session.user.email}</h1>
	<p>You are logged in!</p>
{/if}
