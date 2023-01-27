<script lang="ts">
	import { page } from '$app/stores';
	import DashboardActionBar from './DashboardActionBar.svelte';

	$: email = $page.data.session?.user.email;
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="flex flex-row items-baseline justify-between">
	<h1 class="my-8 text-3xl font-semibold">Dashboard</h1>
	<div>
		<span class="hidden text-2xl font-semibold md:block">Welcome back, </span>
		<a href="/profile" title="Profile">
			<span class="text-2xl font-semibold text-blue-500">{email}</span>
		</a>
	</div>
</div>

<DashboardActionBar />
