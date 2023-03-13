<script lang="ts">
	import ResponsiveSidebar from '$lib/components/ui/wrappers/ResponsiveSidebar.svelte';
	const actions = undefined;
	function updateAction(currentAction: any) {
		console.log(currentAction);
	}
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<ResponsiveSidebar title="Dashboard" {actions}>
	<div>
		<span class="text-2xl font-semibold">Welcome back</span>
	</div>
</ResponsiveSidebar>
