<script lang="ts">
	import supabaseClient from '$lib/db';
	import { onMount } from 'svelte';
	import Loading from '$lib/components/ui/loading/Spinner.svelte';

	export let email: string;

	let loading = true;
	let statusMessage = '';

	async function handleResetPassword() {
		loading = true;
		try {
			const response = await supabaseClient.auth.resetPasswordForEmail(email);
			if (response.error) {
				statusMessage = response.error.message;
			}
			statusMessage = 'Check your email for a link to reset your password.';
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
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
				<h1 class="mb-4 text-2xl font-bold">Reset Password</h1>
				<p>{statusMessage}</p>
			</div>
		{:else}
			<div class="text-center">
				<h1 class="mb-4 text-2xl font-bold">Reset Password</h1>
				<p>We'll send you an email with a link to reset your password.</p>
				<button
					class="mt-4 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
					on:click={handleResetPassword}
				>
					Reset Password
				</button>
			</div>
		{/if}
	</div>
{/if}
