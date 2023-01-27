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
		? 'px-3 py-2 text-sm font-medium text-white bg-blue-900 rounded-md shadow hover:bg-blue-700 hover:shadow-lg'
		: 'px-3 py-2 text-sm font-medium text-blue-900 bg-white rounded-md shadow hover:bg-blue-100 hover:shadow-lg'}
>
	{#if icon}
		<Icon {icon} class="hidden mr-2 lg:inline-block" />
	{/if}
	{name}
</a>
