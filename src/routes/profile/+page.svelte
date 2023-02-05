<script lang="ts">
	import { page } from '$app/stores';
	import ResponsiveSidebar from '$lib/components/ui/wrappers/ResponsiveSidebar.svelte';

	$: fullName = $page.data.session?.user.user_metadata.full_name;
	$: title = fullName ? `EzEval | Profile | ${fullName}` : 'EzEval | Profile';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<ResponsiveSidebar>
	<div slot="sidebar">
		<h1 class="text-3xl font-semibold">Actions</h1>
	</div>
	<h1 class="text-3xl font-semibold">Dashboard</h1>
	<p>test</p>
</ResponsiveSidebar>
