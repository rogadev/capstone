<script lang="ts">
	import ResponsiveSidebar from '$lib/components/ui/wrappers/ResponsiveSidebar.svelte';
	const label = {
		label: 'Drivers',
		href: '/drivers'
	};
	const actions = [
		{
			label: 'Add New Driver',
			href: '/drivers/new'
		}
	];
</script>

<ResponsiveSidebar title="Drivers" {actions}>
	<div class="border border-white">
		<div class="flex flex-col items-center justify-center">
			<p>Add, removed, update drivers.</p>
		</div>
	</div>
</ResponsiveSidebar>
