<script lang="ts">
	import ResponsiveSidebar from '$lib/components/ui/wrappers/ResponsiveSidebar.svelte';
	import NewVehicleForm from '$lib/components/forms/NewVehicleForm.svelte';

	const actions = [
		{
			label: 'Save',
			action: () => {
				console.log('save');
			}
		},
		{
			label: 'Cancel',
			action: () => {
				console.log('cancel');
			}
		}
	];
</script>

<ResponsiveSidebar title="Add Vehicle" {actions}>
	<NewVehicleForm />
</ResponsiveSidebar>
