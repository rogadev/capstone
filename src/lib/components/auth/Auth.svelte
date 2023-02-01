<script lang="ts">
	import SignInWithFacebook from './SignInWithFacebook.svelte';
	import SignInWithGithub from './SignInWithGithub.svelte';
	import SignInWithGoogle from './SignInWithGoogle.svelte';
</script>

<div class="flex min-h-full">
	<div
		class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
	>
		<div class="mx-auto w-full max-w-sm lg:w-96">
			<div>
				<img
					class="h-12 w-auto"
					src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
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

			<div class="mt-8">
				<!-- Social Sign In -->
				<div>
					<!-- Providers -->
					<div>
						<p class="text-sm font-medium text-gray-700">Sign in with</p>
						<form method="POST" class="mt-1 grid grid-cols-3 gap-3">
							<SignInWithGoogle />
							<SignInWithFacebook />
							<SignInWithGithub />
						</form>
					</div>
					<!-- Or... -->
					<div class="relative mt-6">
						<div class="absolute inset-0 flex items-center" aria-hidden="true">
							<div class="w-full border-t border-gray-300" />
						</div>
						<div class="relative flex justify-center text-sm">
							<span class="bg-white px-2 text-gray-500">Or continue with</span>
						</div>
					</div>
				</div>
				<!-- Email Sign In -->
				<div class="mt-6">
					<div class="space-y-6">
						<div>
							<label for="email" class="block text-sm font-medium text-gray-700"
								>Email address</label
							>
							<div class="mt-1">
								<input
									id="email"
									name="email"
									type="email"
									autocomplete="email"
									required
									class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
								/>
							</div>
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
								<label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label
								>
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
								formaction="/?login"
								class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								Sign in
							</button>
						</div>
					</div>
				</div>
			</div>
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
