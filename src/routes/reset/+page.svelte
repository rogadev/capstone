<script lang="ts">
	import supabase from '$lib/db';
	import { onMount } from 'svelte';
	import Loading from '$lib/components/ui/Loading.svelte';

	export let email: string;

	let loading = true;
	let statusMessage = '';

	async function handleResetPassword() {
		loading = true;
		try {
			const response = await supabase.auth.resetPasswordForEmail(email);
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
	<div class="flex flex-col items-center justify-center h-full">
		<Loading />
	</div>
{:else}
	<div class="flex flex-col items-center justify-center h-full">
		{#if statusMessage}
			<div class="text-center">
				<h1 class="text-2xl font-bold mb-4">Reset Password</h1>
				<p>{statusMessage}</p>
			</div>
		{:else}
			<div class="text-center">
				<h1 class="text-2xl font-bold mb-4">Reset Password</h1>
				<p>We'll send you an email with a link to reset your password.</p>
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
					on:click={handleResetPassword}
				>
					Reset Password
				</button>
			</div>
		{/if}
	</div>
{/if}
