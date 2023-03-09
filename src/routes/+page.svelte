<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let driversLink = '/';
	let dispatchersLink = '/';
	onMount(async () => {
		const protocol = window.location.protocol;
		const domainName = window.location.hostname;
		driversLink = `${protocol}//app.${domainName}.com/login`;
		dispatchersLink = `/login`;
	});

	$: user = $page.data.user;
</script>

{#if user}
	<h1>Welcome Back</h1>
	<!-- TODO Create a better "welcome" screen for admin users. -->
{:else}
	<h1 class="mx-4 mt-8 text-center text-3xl">Log in to get started</h1>
	<div class="mx-8 my-10 grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="flex flex-col items-center p-4">
			<h2 class="mb-4 text-xl font-bold">Drivers</h2>
			<a
				href={driversLink}
				class="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-600"
			>
				Driving App
			</a>
		</div>
		<div class="flex flex-col items-center p-4">
			<h2 class="mb-4 text-xl font-bold">Dispatchers</h2>
			<a
				href={dispatchersLink}
				class="rounded-full bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-600"
			>
				Dispatch Dashboard
			</a>
		</div>
	</div>
{/if}
