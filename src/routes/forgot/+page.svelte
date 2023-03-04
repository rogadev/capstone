<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Loading from '$lib/components/ui/loading/Spinner.svelte';

	let username: string;
	let loading = true;
	let statusMessage = '';

	const handleResetPassword = async () => {
		// TODO actually handle the form submission
		console.log(username);
	};

	onMount(() => {
		username = $page.data.username;
		loading = false;
	});
</script>

{#if loading}
	<div class="flex h-full flex-col items-center justify-center">
		<Loading />
	</div>
{:else}
	<div class="flex h-full flex-col items-center justify-center">
		{#if statusMessage}
			<div class="text-center">
				<h1 class="mb-4 text-2xl font-bold">Password Reset</h1>
				<p>{statusMessage}</p>
			</div>
		{:else}
			<form class="text-center">
				<h1 class="mb-4 text-2xl font-bold">Reset Password</h1>
				<label for="email">Email Address</label>
				<input
					class="mb-4 block w-full rounded border border-gray-300 p-2 text-black"
					type="email"
					name="email"
					bind:value={username}
					autocapitalize="off"
				/>
				<p>We'll send you an email with a link to reset your password.</p>
				<!-- TODO Turn into a button type submit -->
				<button
					class="mt-4 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
					on:click={handleResetPassword}
				>
					Reset Password
				</button>
			</form>
		{/if}
	</div>
{/if}
