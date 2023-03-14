<script lang="ts">
	import { onMount } from 'svelte';
	import DrivingAppWrapper from '$lib/components/driving/DrivingAppWrapper.svelte';
	import StopDetailsModal from '$lib/components/driving/StopDetailsModal.svelte';
	import TripList from '$lib/components/driving/TripList.svelte';
	import dummyDataJson from './dummyData.json';

	let tripStops = JSON.parse(JSON.stringify(dummyDataJson));
	let selectedStop: any = null;

	function handleStopClick(stop: any) {
		selectedStop = stop;
	}

	function handleCloseModal() {
		selectedStop = null;
	}

	function handleCompleteTrip() {
		selectedStop.complete = true;
		selectedStop = null;
	}

	onMount(async () => {
		tripStops = dummyDataJson;
	});
</script>

<DrivingAppWrapper pageTitle="Today's Trips">
	<TripList stops={tripStops} onStopClick={handleStopClick} />
</DrivingAppWrapper>

{#if selectedStop !== null}
	<StopDetailsModal
		stop={selectedStop}
		onCompleteTrip={handleCompleteTrip}
		onCloseModal={handleCloseModal}
	/>
{/if}
