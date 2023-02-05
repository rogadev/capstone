<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	export let href: string;
	export let icon: string | undefined;
	export let name: string;
</script>

<a
	{href}
	class={$page.url.pathname === href
		? 'w-full rounded-md border bg-blue-900 px-3 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 hover:shadow-lg'
		: 'w-full rounded-md border bg-white px-3 py-2 text-sm font-medium text-blue-900 shadow hover:bg-blue-100 hover:shadow-lg'}
>
	{#if icon}
		<Icon {icon} class="mr-2 hidden lg:inline-block" />
	{/if}
	{name}
</a>
