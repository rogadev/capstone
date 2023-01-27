<script lang="ts">
	import NavbarLinkMobile from './NavbarLinkMobile.svelte';

	export let links: {
		name: string;
		icon: string | undefined;
		href: string;
	}[];
</script>

<ul class="flex flex-col gap-2">
	{#each links as { name, icon, href }}
		<li class="p-1">
			<NavbarLinkMobile {href} {icon} {name} />
		</li>
	{/each}
</ul>
