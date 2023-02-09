<script lang="ts">
	import { z } from 'zod';
	import supabaseClient from '$lib/db';

	interface ValidationErrors {
		email: string[];
		failure: string[];
	}

	const validEmail = z.string().email();

	let loading = false;
	let readyToSubmit = false;

	let email = '';
	let password = '';

	const errors: ValidationErrors = {
		email: [],
		failure: []
	};
	let timer: number;

	const debounce = (func: Function, delay = 750) => {
		clearTimeout(timer);
		timer = setTimeout(func, delay);
	};

	$: {
		if (!email) {
			clearTimeout(timer);
			errors.email = [];
		} else {
			const result = validEmail.safeParse(email);
			if (result.success) {
				clearTimeout(timer);
				errors.email = [];
			} else {
				debounce(() => {
					errors.email = result.error.errors.map((err) => err.message);
				});
			}
		}
	}

	$: {
		if (errors.email.length || !email.length) {
			readyToSubmit = false;
		} else {
			readyToSubmit = true;
		}
	}

	const handleLogin = async () => {
		if (!readyToSubmit) return;
		try {
			loading = true;
			const { error } = await supabaseClient.auth.signInWithOtp({ email });
			if (error) throw error;
			alert('Check your email for login link!');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};
</script>

<!-- Email Sign In -->
<form method="POST" on:submit|preventDefault={handleLogin} class="mt-6">
	<div class="space-y-6">
		<div>
			<label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
			<div class="mt-1">
				<input
					id="email"
					name="email"
					type="email"
					bind:value={email}
					autocomplete="email"
					required
					class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
				/>
			</div>
			{#if errors.email.length}
				<ul class="mt-2 list-inside list-disc text-sm text-red-600">
					{#each errors.email as error}
						<li>{error}</li>
					{/each}
				</ul>
			{/if}
		</div>

		<div class="space-y-1">
			<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
			<div class="mt-1">
				<input
					id="password"
					name="password"
					type="password"
					autocomplete="current-password"
					required
					class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
				/>
			</div>
		</div>

		<div class="flex items-center justify-between">
			<div class="flex items-center">
				<input
					id="remember-me"
					name="remember-me"
					type="checkbox"
					class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
				/>
				<label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
			</div>

			<div class="text-sm">
				<a href="/forgot" class="font-medium text-indigo-600 hover:text-indigo-500"
					>Forgot your password?</a
				>
			</div>
		</div>
		<!-- Sign In Button -->
		<div>
			<button
				type="submit"
				disabled={!readyToSubmit || loading}
				class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400"
			>
				Sign in
			</button>
		</div>
	</div>
</form>
