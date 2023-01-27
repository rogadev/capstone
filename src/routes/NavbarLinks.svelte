<script lang="ts">
	import NavbarLink from './NavbarLink.svelte';

	import { page } from '$app/stores';

	$: session = $page.data.session;

	export let links: { name: string; icon: string | undefined; href: string }[];

	const reversedLinks = links.slice().reverse();
</script>

<div class="flex-wrap hidden md:flex md:items-center md:gap-3 md:flex-row-reverse">
	{#if session}
		{#each reversedLinks as { name, icon, href }}
			<NavbarLink {href} {icon} {name} />
		{/each}
	{:else}
		<a
			href="/login"
			class="px-3 py-2 text-sm font-medium text-white bg-green-900 rounded-md shadow hover:bg-blue-700 hover:shadow-lg"
			>Login</a
		>
	{/if}
</div>
