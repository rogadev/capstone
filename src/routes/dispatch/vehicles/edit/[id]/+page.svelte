<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Vehicle } from '@prisma/client';
	let vehicle: Vehicle = $page.data.vehicle;
	let {
		id,
		name,
		description,
		created_by,
		fuel_type,
		make,
		model,
		year,
		date_added,
		last_updated
	} = vehicle;

	$: dateAdded = Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: '2-digit'
	}).format(new Date(date_added));
	$: dateUpdated = Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: '2-digit'
	}).format(new Date(last_updated));

	function handleSubmit() {
		console.log('submit');
	}

	function handleCancel() {
		goto('/vehicles');
	}
</script>

<form>
	<div class="head">
		<h2>Vehicle #{id}</h2>
		<h4>Created By ID #{created_by}</h4>
		<h4>Date Added: {dateAdded}</h4>
		<h4>Last Updated: {dateUpdated}</h4>
	</div>
	<div>
		<label for="name">Name</label>
		<input type="text" name="name" bind:value={name} />
	</div>
	<div>
		<label for="description">Description</label>
		<input type="text" name="description" bind:value={description} />
	</div>
	<div>
		<label for="fuel_type">Fuel Type</label>
		<input type="text" name="fuel_type" bind:value={fuel_type} />
	</div>
	<div>
		<label for="make">Make</label>
		<input type="text" name="make" bind:value={make} />
	</div>
	<div>
		<label for="model">Model</label>
		<input type="text" name="model" bind:value={model} />
	</div>
	<div>
		<label for="year">Year</label>
		<input type="text" name="year" bind:value={year} />
	</div>
	<div class="flex w-full flex-row items-center justify-evenly">
		<button type="button" on:click={handleCancel}>Cancel</button>
		<button type="button" on:click={handleSubmit}>Submit</button>
	</div>
</form>

<style scoped>
	form {
		display: flex;
		flex-direction: column;
		width: 80%;
		margin: 1rem auto;
	}

	label {
		margin-bottom: 0.5rem;
	}
	input {
		margin-bottom: 1rem;
		color: black;
	}
</style>
