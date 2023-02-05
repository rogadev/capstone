<script lang="ts">
	import Icon from '@iconify/svelte';
	export let toggleTheme: () => void;
	export let mode: Boolean;
</script>

<button
	on:click={toggleTheme}
	class="rounded bg-light p-1 shadow hover:bg-dark hover:text-white dark:bg-light dark:text-black dark:hover:bg-slate-600 dark:hover:text-slate-50"
	title="Toggle Theme"
>
	{#if mode}
		<Icon icon="carbon:sun" />
	{:else}
		<Icon icon="carbon:moon" />
	{/if}
</button>
