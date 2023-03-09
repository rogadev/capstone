<script lang="ts">
	import ResponsiveSidebar from '$lib/components/ui/wrappers/ResponsiveSidebar.svelte';
	const actions = [
		{
			label: 'Add Vehicle',
			icon: 'mdi:plus',
			href: '/vehicles/add'
		}
	];
</script>

<ResponsiveSidebar title="Vehicles" {actions}>
 <p>hello</p>
</ResponsiveSidebar>
