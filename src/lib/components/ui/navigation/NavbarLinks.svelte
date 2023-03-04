<script lang="ts">
	import NavbarLink from './NavbarLink.svelte';
	import { getUser } from '@lucia-auth/sveltekit/client';

	export let links: { name: string; icon: string | undefined; href: string }[];
	const user = getUser();

	const reversedLinks = links.slice().reverse();
</script>

<div class="mr-2 hidden flex-wrap md:flex md:flex-row-reverse md:items-center md:gap-2">
	{#if user}
		{#each reversedLinks as { name, icon, href }}
			<NavbarLink {href} {icon} {name} />
		{/each}
	{/if}
</div>
