<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import supabase from '$lib/db';

	$: session = $page.data.session;

	const logout = async () => {
		await supabase.auth.signOut();
		window.location.href = '/';
	};

	const protectedRoutes = [
		{
			path: '/dashboard',
			text: 'Dashboard'
		},
		{
			path: '/pricesheets',
			text: 'Price Sheets'
		},
		{
			path: '/evaluations',
			text: 'Evaluations'
		}
	];

	const inactive = '';
</script>

<div class="flex flex-row gap-4">
	<div id="links" class="flex flex-row items-center gap-3">
		{#if session}
			{#each protectedRoutes as route}
				<a
					href={route.path}
					class="px-3 py-2 text-sm font-medium text-white bg-green-900 rounded-md shadow hover:bg-blue-700 hover:shadow-lg"
					class:active={'bg-blue-900 text-white px-3 py-2 rounded-md text-sm font-medium shadow hover:shadow-lg'}
				>
					{route.text}
				</a>
			{/each}
		{:else}
			<a
				href="/login"
				class="px-3 py-2 text-sm font-medium text-white bg-green-900 rounded-md shadow hover:bg-blue-700 hover:shadow-lg"
				>Login</a
			>
		{/if}
	</div>
	{#if session}
		<div id="account" class="flex flex-row items-center gap-2">
			<a href="/profile" title="Profile" class="text-2xl text-blue-900 hover:text-blue-700">
				<Icon icon="mdi:user-circle" />
			</a>
			<button
				type="button"
				title="Logout"
				on:click={logout}
				class="text-2xl text-blue-900 hover:text-blue-700"
			>
				<Icon icon="mdi:logout" />
			</button>
		</div>
	{/if}
</div>
