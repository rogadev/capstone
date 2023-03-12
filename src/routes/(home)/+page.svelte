<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	$: user = $page.data.user;
	let errorMessage = '';
	onMount(async () => {
		let data: { Role: string };
		if (user) {
			try {
				const response = await fetch('/api/user/role');
				data = await response.json();
				if (data.Role === 'Driver') window.location.href = '/app/drive';
			} catch (error: any) {
				console.error(error);
				errorMessage = error.message;
			}
		}
	});
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
				href="/app/login"
				class="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-600"
			>
				Sign In
			</a>
		</div>
		<div class="flex flex-col items-center p-4">
			<h2 class="mb-4 text-xl font-bold">Dispatchers</h2>
			<a
				href="/login"
				class="rounded-full bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-600"
			>
				Sign In
			</a>
		</div>
	</div>
{/if}
