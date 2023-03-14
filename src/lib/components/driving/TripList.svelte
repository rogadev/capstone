<script lang="ts">
	import TripStopItem from '$lib/components/driving/TripStop.svelte';
	import type { TripStop } from './types';

	export let stops: TripStop[] = [];
	export let onStopClick: (stop: TripStop) => void;
</script>

<div class="grid grid-cols-1 justify-center">
	{#each stops as stop}
		<TripStopItem {stop} selectStop={onStopClick} />
	{/each}
</div>
