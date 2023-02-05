<script lang="ts">
	import NavbarLink from './NavbarLink.svelte';

	import { page } from '$app/stores';

	$: session = $page.data.session;

	export let links: { name: string; icon: string | undefined; href: string }[];

	const reversedLinks = links.slice().reverse();
</script>

<div class="hidden flex-wrap md:flex md:flex-row-reverse md:items-center md:gap-3">
	{#if session}
		{#each reversedLinks as { name, icon, href }}
			<NavbarLink {href} {icon} {name} />
		{/each}
	{/if}
</div>
