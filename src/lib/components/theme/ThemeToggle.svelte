<script lang="ts">
	import Icon from '@iconify/svelte';
	export let toggleTheme: () => void;
	export let mode: Boolean;
</script>

<button
	on:click={toggleTheme}
	class="p-1 border rounded bg-blue-50 dark:bg-transparent dark:hover:bg-white dark:hover:bg-opacity-10 border-slate-300 dark:border-white hover:border-transparent hover:bg-blue-900 hover:bg-opacity-10"
>
	{#if mode}
		<Icon icon="carbon:moon" />
	{:else}
		<Icon icon="carbon:sun" />
	{/if}
</button>
