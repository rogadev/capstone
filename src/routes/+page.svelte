<script lang="ts">
	import { page } from '$app/stores';
	import Auth from '$lib/components/auth/Auth.svelte';

	$: session = $page.data.session;
</script>

{#if !session}
	<Auth />
{/if}

<div>
	<button class="flex" title="test" aria-busy="false">test</button>
</div>
