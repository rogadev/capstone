<script lang="ts">
	import ResponsiveSidebar from '$lib/components/ui/wrappers/ResponsiveSidebar.svelte';
	import Icon from '@iconify/svelte';
	import type { Vehicle } from '@prisma/client';
	import { onMount } from 'svelte';

	const actions = [
		{
			label: 'Add Vehicle',
			icon: 'mdi:plus',
			href: '/vehicles/add'
		}
	];

	export let vehicles: Vehicle[] = [];

	const getVehicle = async () => {
		const res = await fetch('/api/vehicles');
		const data = await res.json();
		if (res.ok) {
			vehicles = data;
		} else {
			throw new Error(data.message);
		}
	};

	onMount(async () => {
		await getVehicle();
	});

	function confirmDelete(id: number) {
		console.log('Delete ' + id);
		// confirm delete
		// handle delete
	}
</script>

<ResponsiveSidebar title="Vehicles" {actions}>
	<div class="vehicles-container">
		<div class="vehicle-card">
			<h3 class="col-span-1">Name</h3>
			<h3 class="col-span-4">Description</h3>
			<h3 class="col-span-1">Type</h3>
			<h3 class="col-span-1 text-right">Actions</h3>
		</div>
		{#each vehicles as { id, name, type, description }}
			<div class="vehicle-card rounded border border-black dark:border-white">
				<div class="col-span-1 self-center font-bold">{name}</div>
				<div class="col-span-4 text-sm">{description}</div>
				<div class="col-span-1">{type}</div>
				<div class="col-span-1 flex flex-row items-center justify-end gap-2">
					<a class="rounded bg-primary p-2 hover:bg-green-300" href="/vehicles/edit/{id}">
						<Icon icon="mdi:pencil" />
					</a>
					<button
						on:click={() => confirmDelete(id)}
						class="rounded bg-secondary p-2 hover:bg-red-500"
					>
						<Icon icon="mdi:delete" />
					</button>
				</div>
			</div>
		{/each}
	</div>
</ResponsiveSidebar>

<style lang="postcss" scoped>
	.vehicles-container {
		@apply grid grid-cols-1 gap-3;
	}

	.vehicle-card {
		@apply grid grid-cols-7 rounded p-3;
	}
</style>
