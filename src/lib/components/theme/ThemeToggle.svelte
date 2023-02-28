<script lang="ts">
	import Icon from '@iconify/svelte';
	import { toggleMode } from '$lib/stores/colorTheme';
	export let mode: Boolean;
</script>

<button
	on:click={toggleMode}
	class="rounded bg-light p-1 shadow hover:bg-dark hover:text-white dark:bg-light dark:text-black dark:hover:bg-slate-600 dark:hover:text-slate-50"
	title="Toggle Theme"
>
	{#if mode}
		<Icon icon="mdi:white-balance-sunny" />
	{:else}
		<Icon icon="mdi:weather-night" />
	{/if}
</button>
