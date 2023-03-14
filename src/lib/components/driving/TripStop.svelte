<script lang="ts">
	import type { TripStop } from './types';
	import TimeUntil from '$lib/components/driving/TimeUntil.svelte';
	export let stop: TripStop;
	export let selectStop: (stop: TripStop) => void;
</script>

<div
	class="w-full cursor-pointer px-4 py-2 md:w-1/2 lg:w-1/3 {stop.complete
		? 'opacity-50'
		: 'opacity-100'}"
	on:click={() => selectStop(stop)}
	on:keypress={(e) => {
		if (e.key === 'Enter') selectStop(stop);
	}}
>
	<div
		class="overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:shadow-xl"
	>
		<div class="p-4">
			<div class="flex flex-row justify-between">
				<h3 class="mb-2 text-lg font-medium leading-6 text-gray-900">
					{stop.time}
					{stop.type === 'pickup' ? 'Pickup' : 'Dropoff'}
					{stop.passenger.name}
				</h3>
				<TimeUntil time={stop.time} />
			</div>
			{#if stop.type === 'pickup'}
				<p class="text-gray-600">{stop.location.address}</p>
			{:else}
				<p class="text-gray-600">{stop.location.name}</p>
			{/if}
			{#if stop.complete}
				<p class="text-green-600">{stop.completedType}</p>
			{/if}
		</div>
	</div>
</div>
