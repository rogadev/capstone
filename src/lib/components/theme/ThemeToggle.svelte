<script lang="ts">
	import Icon from '@iconify/svelte';
	export let toggleTheme: () => void;
	export let mode: Boolean;
</script>

<button
	on:click={toggleTheme}
	class="rounded border border-slate-300 bg-blue-50 p-1 hover:border-transparent hover:bg-blue-900 hover:bg-opacity-10 dark:border-white dark:bg-transparent dark:hover:bg-white dark:hover:bg-opacity-10"
>
	{#if mode}
		<Icon icon="carbon:sun" />
	{:else}
		<Icon icon="carbon:moon" />
	{/if}
</button>
