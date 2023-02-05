<script lang="ts">
	import { z } from 'zod';
	import supabase from '$lib/db';

	interface ValidationErrors {
		email: string[];
		password: string[];
		confirmPassword: string[];
		failure: string[];
	}

	const validEmail = z.string().email();
	const validPassword = z.string().min(8);
	const validConfirmPassword = z
		.string()
		.min(8)
		.refine((value) => value === password, {
			message: 'Passwords do not match'
		});

	let loading = false;
	let readyToSubmit = false;

	let email = '';
	let password = '';
	let confirmPassword = '';

	const errors: ValidationErrors = {
		email: [],
		password: [],
		confirmPassword: [],
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
		if (!password) {
			clearTimeout(timer);
			errors.password = [];
		} else {
			const result = validPassword.safeParse(password);
			if (result.success) {
				clearTimeout(timer);
				errors.password = [];
			} else {
				debounce(() => {
					errors.password = result.error.errors.map((err) => err.message);
				});
			}
		}
	}

	$: {
		if (!confirmPassword) {
			clearTimeout(timer);
			errors.confirmPassword = [];
		} else {
			const result = validConfirmPassword.safeParse(confirmPassword);
			if (result.success) {
				clearTimeout(timer);
				errors.confirmPassword = [];
			} else {
				debounce(() => {
					errors.confirmPassword = result.error.errors.map((err) => err.message);
				});
			}
		}
	}

	$: {
		if (
			errors.email.length ||
			errors.password.length ||
			errors.confirmPassword.length ||
			loading ||
			!email ||
			!password ||
			!confirmPassword
		) {
			readyToSubmit = false;
		} else {
			readyToSubmit = true;
		}
	}

	const handleSignUp = async () => {
		if (!readyToSubmit) return;
		try {
			loading = true;
			const { error } = await supabase.auth.signUp({ email, password });
			if (error) throw error;
			window.location.href = `/confirm?email=${email}`;
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
<form method="POST" on:submit|preventDefault={handleSignUp} class="mt-6">
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
					autocomplete="off"
					bind:value={password}
					required
					class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
				/>
			</div>
			{#if errors.password.length}
				<ul class="mt-2 list-inside list-disc text-sm text-red-600">
					{#each errors.password as error}
						<li>{error}</li>
					{/each}
				</ul>
			{/if}
		</div>

		<div class="space-y-1">
			<label for="confirm-password" class="block text-sm font-medium text-gray-700"
				>Confirm Password</label
			>
			<div class="mt-1">
				<input
					id="confirm-password"
					name="confirm-password"
					type="password"
					autocomplete="off"
					bind:value={confirmPassword}
					required
					class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
				/>
			</div>
			{#if errors.confirmPassword.length}
				<ul class="mt-2 list-inside list-disc text-sm text-red-600">
					{#each errors.confirmPassword as error}
						<li>{error}</li>
					{/each}
				</ul>
			{/if}
		</div>

		<div>
			<button
				type="submit"
				disabled={!readyToSubmit || loading}
				class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400"
			>
				Sign up
			</button>
		</div>
	</div>
</form>
