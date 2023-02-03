<script lang="ts">
	import SignInWithEmailAndPassword from './SignInWithEmailAndPassword.svelte';
	import SignUpEmailAndPassword from './SignUpWithEmailAndPassword.svelte';
	import SignInWithFacebook from './SignInWithFacebook.svelte';
	import SignInWithMicrosoft from './SignInWithMicrosoft.svelte';
	import SignInWithGoogle from './SignInWithGoogle.svelte';

	let signIn = true;
	const toggleMethod = () => {
		signIn = !signIn;
	};
</script>

<div class="flex min-h-full">
	<div
		class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
	>
		<div class="mx-auto w-full max-w-sm lg:w-96">
			<div>
				<img
					class="h-12 w-auto"
					src="https://a-us.storyblok.com/f/1004312/512x512/9a8d0bbf7e/favicon.png"
					alt="Roga Dev"
				/>
				<h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">
					Sign in to your account
				</h2>
				<p class="mt-2 text-sm text-gray-600">
					Or
					{' '}
					<a href="/trial" class="font-medium text-indigo-600 hover:text-indigo-500"
						>start your 14-day free trial</a
					>
				</p>
			</div>

			<!-- Social Sign In -->
			<form method="POST" class="mt-8">
				<div>
					<div>
						<p class="text-sm font-medium text-gray-700">Sign in with</p>
						<div class="mt-1 grid grid-cols-3 gap-3">
							<SignInWithGoogle />
							<SignInWithFacebook />
							<SignInWithMicrosoft />
						</div>
					</div>
					<div class="relative mt-6">
						<div class="absolute inset-0 flex items-center" aria-hidden="true">
							<div class="w-full border-t border-gray-300" />
						</div>
						<div class="relative flex justify-center text-sm">
							<span class="bg-white px-2 text-gray-500">Or continue with</span>
						</div>
					</div>
				</div>
				{#if signIn}
					<SignInWithEmailAndPassword />
				{:else}
					<SignUpEmailAndPassword />
				{/if}
				<!-- "Sign in instead" option -->
				<div class="mt-6">
					<div class="relative">
						<div class="absolute inset-0 flex items-center">
							<div class="w-full border-t border-gray-300" />
						</div>
						<div class="relative flex justify-center text-sm">
							<span class="px-2 bg-white text-gray-500">
								{#if signIn}
									Don't have an account?
								{:else}
									Already have an account?
								{/if}
							</span>
						</div>
					</div>

					<div class="mt-6">
						<button
							type="button"
							on:click={toggleMethod}
							class="w-full flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
						>
							{#if signIn}
								Sign up instead
							{:else}
								Sign in instead
							{/if}
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="relative hidden w-0 flex-1 lg:block">
		<img
			class="absolute inset-0 h-full w-full object-cover"
			src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
			alt=""
		/>
	</div>
</div>
