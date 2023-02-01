<script lang="ts">
	import { page } from '$app/stores';
	import Auth from './Auth.svelte';

	$: session = $page.data.session;
</script>

{#if !session}
	<Auth />
{/if}
