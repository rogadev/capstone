<script lang="ts">
	import { page } from '$app/stores';
	import Auth from '$lib/components/auth/Auth.svelte';

	$: session = $page.data.session;
</script>

{#if !session}
	<div class=" bg-light text-black dark:bg-light dark:text-black">
		<Auth />
	</div>
{/if}
