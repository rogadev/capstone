<script lang="ts">
	import ResponsiveSidebar from '$lib/components/ui/wrappers/ResponsiveSidebar.svelte';
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<ResponsiveSidebar>
	<div slot="sidebar">
		<h1 class="my-4 text-3xl font-semibold">Dashboard</h1>
	</div>
	<div>
		<span class="hidden text-2xl font-semibold md:block">Welcome back</span>
	</div>
</ResponsiveSidebar>
