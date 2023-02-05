<script lang="ts">
	import { page } from '$app/stores';
	import ResponsiveSidebar from '$lib/components/ui/wrappers/ResponsiveSidebar.svelte';

	$: email = $page.data.session?.user.email;
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
		<a href="/profile" title="Profile">
			<span class="text-2xl font-semibold text-blue-500">{email}</span>
		</a>
	</div>
</ResponsiveSidebar>
