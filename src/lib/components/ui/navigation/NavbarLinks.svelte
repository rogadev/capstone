<script lang="ts">
	import NavbarLink from './NavbarLink.svelte';
	import type { Session } from 'lucia-auth';

	export let links: { name: string; icon: string | undefined; href: string }[];
	export let session: Session | null;

	const reversedLinks = links.slice().reverse();
</script>

<div class="mr-2 hidden flex-wrap md:flex md:flex-row-reverse md:items-center md:gap-2">
	{#if session}
		{#each reversedLinks as { name, icon, href }}
			<NavbarLink {href} {icon} {name} />
		{/each}
	{/if}
</div>
