<script lang="ts">
	import { VehicleType, VehicleFuelType } from '@prisma/client';
	import { onMount } from 'svelte';
	import { type VehicleForm, vehicleFormSchema } from '$lib/schemas/vehicleSchema';

	type FieldErrors = {
		created_by?: string[];
		date_added?: string[];
		last_updated?: string[];
		name?: string[];
		description?: string[];
		make?: string[];
		model?: string[];
		year?: string[];
		type?: string[];
		fuel_type?: string[];
		departing_from?: string[];
		status?: string[];
	};

	let loading = true;
	let fieldErrors: FieldErrors = {};
	const vehicleTypes = Object.values(VehicleType);
	const fuelTypes = Object.values(VehicleFuelType);

	onMount(async () => {
		loading = false;
	});

	export let formData: VehicleForm = {
		date_added: new Date(),
		last_updated: new Date(),
		name: '',
		description: '',
		make: '',
		model: '',
		year: 2021,
		type: VehicleType.SUV,
		fuel_type: VehicleFuelType.Gasoline,
		departing_from: ''
	};

	const handleSubmit = async () => {
		const data = new FormData();
		data.append('name', formData.name);
		data.append('description', formData.description);
		data.append('make', formData.make);
		data.append('model', formData.model);
		data.append('year', formData.year.toString());
		data.append('type', formData.type);
		data.append('fuel_type', formData.fuel_type);
		data.append('departing_from', formData.departing_from);

		try {
			const result = vehicleFormSchema.safeParse(formData);
			if (!result.success) fieldErrors = result.error.flatten().fieldErrors;
			else {
				try {
					const res = await fetch('/api/vehicles', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(formData) // TODO Fix.
					});
					if (res.status === 200) {
						const data = await res.json();
						console.log(data);
					} else {
						throw new Error(`Error creating vehicle. Status: ${res.status}`);
					}
				} catch (e: any) {
					fieldErrors.status = [e.message];
				}
			}
		} catch (e: any) {
			console.error(e);
		}
	};
</script>

<form class="bg-transparent" on:submit|preventDefault={handleSubmit}>
	<h2>New Vehicle Information</h2>
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<div>
			<label for="name" class="block text-sm font-medium text-gray-700 dark:text-white"
				>Vehicle Identifier (Name)</label
			>
			<input
				type="text"
				name="name"
				id="name"
				class="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				placeholder="Van #1"
				bind:value={formData.name}
				on:focus={() => (fieldErrors.name = [])}
			/>
			{#if fieldErrors.name}
				<div>
					{#each fieldErrors.name as error}
						<span class="text-red-500">{error}</span>
					{/each}
				</div>
			{/if}
		</div>
		<div>
			<label for="description" class="block text-sm font-medium text-gray-700 dark:text-white"
				>Description</label
			>
			<textarea
				name="description"
				id="description"
				rows="3"
				class="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				placeholder="Description of the vehicle"
				bind:value={formData.description}
				on:focus={() => (fieldErrors.description = [])}
			/>
			{#if fieldErrors.description}
				<div>
					{#each fieldErrors.description as error}
						<span class="text-red-500">{error}</span>
					{/each}
				</div>
			{/if}
		</div>
		<div>
			<label for="make" class="block text-sm font-medium text-gray-700 dark:text-white">Make</label>
			<input
				type="text"
				name="make"
				id="make"
				class="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				bind:value={formData.make}
				on:focus={() => (fieldErrors.make = [])}
			/>
			{#if fieldErrors.make}
				<div>
					{#each fieldErrors.make as error}
						<span class="text-red-500">{error}</span>
					{/each}
				</div>
			{/if}
		</div>
		<div>
			<label for="model" class="block text-sm font-medium text-gray-700 dark:text-white"
				>Model</label
			>
			<input
				type="text"
				name="model"
				id="model"
				class="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				bind:value={formData.model}
				on:focus={() => (fieldErrors.model = [])}
			/>
			{#if fieldErrors.model}
				<div>
					{#each fieldErrors.model as error}
						<span class="text-red-500">{error}</span>
					{/each}
				</div>
			{/if}
		</div>
		<div>
			<label for="year" class="block text-sm font-medium text-gray-700 dark:text-white">Year</label>
			<input
				type="number"
				step="1"
				min="1900"
				max={new Date().getFullYear() + 1}
				name="year"
				id="year"
				class="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				bind:value={formData.year}
				on:focus={() => (fieldErrors.year = [])}
			/>
			{#if fieldErrors.year}
				<div>
					{#each fieldErrors.year as error}
						<span class="text-red-500">{error}</span>
					{/each}
				</div>
			{/if}
		</div>
		<div>
			<label for="type" class="block text-sm font-medium text-gray-700 dark:text-white">Type</label>
			<select
				name="type"
				id="type"
				class="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				bind:value={formData.type}
				on:focus={() => (fieldErrors.type = [])}
			>
				{#each vehicleTypes as type}
					<option value={type} selected={type === formData.type}>{type}</option>
				{/each}
			</select>
			{#if fieldErrors.type}
				<div>
					{#each fieldErrors.type as error}
						<span class="text-red-500">{error}</span>
					{/each}
				</div>
			{/if}
		</div>
		<div>
			<label for="fuel_type" class="block text-sm font-medium text-gray-700 dark:text-white"
				>Fuel Type</label
			>
			<select
				name="fuel_type"
				id="fuel_type"
				class="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				bind:value={formData.fuel_type}
				on:focus={() => (fieldErrors.fuel_type = [])}
			>
				{#each fuelTypes as type}
					<option value={type} selected={type === formData.fuel_type}>{type}</option>
				{/each}
			</select>
			{#if fieldErrors.fuel_type}
				<div>
					{#each fieldErrors.fuel_type as error}
						<span class="text-red-500">{error}</span>
					{/each}
				</div>
			{/if}
		</div>
		<div>
			<label for="departing_from" class="block text-sm font-medium text-gray-700 dark:text-white"
				>Departing From (Address)</label
			>
			<input
				type="text"
				name="departing_from"
				id="departing_from"
				class="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				bind:value={formData.departing_from}
				on:focus={() => (fieldErrors.departing_from = [])}
			/>
			{#if fieldErrors.departing_from}
				<div>
					{#each fieldErrors.departing_from as error}
						<span class="text-red-500">{error}</span>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	<div class="mt-6 flex justify-end">
		<button
			type="submit"
			class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		>
			Add Vehicle
		</button>
	</div>
</form>
