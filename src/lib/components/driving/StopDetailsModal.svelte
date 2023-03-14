<script lang="ts">
	import type { TripStop } from '@prisma/client';
	import TimeUntil from '$lib/components/driving/TimeUntil.svelte';

	export let stop: TripStop;
	export let onCloseModal: () => void;
	export let onCompleteTrip: (stop: TripStop) => void;

	let completedNote = '';

	function handleModalClose() {
		onCloseModal();
	}
</script>

<div class=" fixed inset-4 z-50 overflow-y-auto ">
	<div
		class="min-w-screen flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
	>
		<div
			class="fixed inset-0 transition-opacity"
			on:click={() => handleModalClose()}
			on:keypress={(e) => {
				if (e.key === 'Enter') {
					handleModalClose();
				}
			}}
		>
			<div class="absolute inset-0 bg-gray-500 opacity-75" />
		</div>
		<span class="hidden sm:inline-block sm:h-screen sm:align-middle" />&#8203;
		<div
			class="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
		>
			<div>
				<div class="mt-3 text-center sm:mt-0 sm:text-left">
					<p class="text-gray-600">{stop.time}</p>
					<h3 class="mb-2 text-lg font-medium leading-6 text-gray-900">
						{stop.type === 'pickup' ? 'Pickup' : 'Dropoff'}
						{stop.passenger.name}
					</h3>
					<TimeUntil time={stop.time} />
					{#if stop.type === 'pickup'}
						<p class="text-gray-600">{stop.location.address}</p>
					{:else}
						<p class="text-gray-600">{stop.location.name}</p>
					{/if}
					{#if stop.completed}
						<p class="text-green-600">Completed: {stop.completedNote}</p>
					{/if}
				</div>
				{#if !stop.completed}
					<div class="mt-5 sm:mt-6">
						<label for="completedNote" class="block text-sm font-medium text-gray-700">
							Completed Note:
						</label>
						<div class="mt-1">
							<small class="text-black">adding notes coming soon...</small>
						</div>
					</div>
				{/if}
			</div>

			{#if !stop.completed}
				<div class="mt-5 sm:mt-6">
					<a
						class="hover inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-black shadow-sm transition duration-300 						hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm"
						href={`https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${stop.location.address}&travelmode=driving`}
						target="_blank"
						rel="noopener noreferrer"
					>
						Start Trip
					</a>
				</div>
			{/if}

			<div class="mt-5 sm:mt-6">
				<button
					class="hover inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-black shadow-sm transition duration-300 						hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:text-sm"
					on:click={() => onCompleteTrip()}
					disabled={completedNote === ''}
				>
					Trip Complete
				</button>
			</div>

			<div class="mt-5 sm:mt-6">
				<button
					class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm transition duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
					on:click={() => handleModalClose()}
				>
					Close
				</button>
			</div>
		</div>
	</div>
</div>
