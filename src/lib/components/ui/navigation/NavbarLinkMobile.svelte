<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	export let href: string;
	export let icon: string | undefined;
	export let name: string;
</script>

<a
	{href}
	class="w-full rounded-md  px-3 py-2 text-sm font-medium shadow hover:bg-dark dark:bg-light  dark:hover:bg-accent  {$page
		.route.id === href
		? 'bg-primary text-black hover:cursor-default hover:bg-primary hover:text-black hover:shadow dark:bg-primary dark:text-black dark:hover:bg-primary dark:hover:text-black'
		: 'bg-light text-dark hover:text-white hover:shadow-lg dark:hover:text-white'}"
>
	{#if icon}
		<Icon {icon} class="mr-2 hidden lg:inline-block" />
	{/if}
	{name}
</a>
