<script lang="ts">
	export let errors = {
		email: [],
		password: [],
		passwordConfirm: []
	};
</script>

<div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<img
			class="mx-auto h-16 w-auto"
			src="https://a-us.storyblok.com/f/1004312/512x512/9a8d0bbf7e/favicon.png"
			alt="Roga Dev"
		/>
		<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
			Register a new account
		</h2>
	</div>

	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
			<form class="space-y-6 text-black" action="#" method="POST">
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
					<div class="mt-1">
						<input
							id="email"
							name="email"
							type="email"
							required
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
					{#if errors?.email?.length}
						<div class="mt-2 text-sm text-red-600">{errors.email}</div>
					{/if}
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
					<div class="mt-1">
						<input
							id="password"
							name="password"
							type="password"
							required
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
					{#if errors?.password?.length}
						<div class="mt-2 text-sm text-red-600">{errors.password}</div>
					{/if}
				</div>

				<div>
					<label for="passwordConfirm" class="block text-sm font-medium text-gray-700"
						>Confirm Password</label
					>
					<div class="mt-1">
						<input
							id="passwordConfirm"
							name="passwordConfirm"
							type="password"
							required
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
					{#if errors?.passwordConfirm?.length}
						<div class="mt-2 text-sm text-red-600">{errors.passwordConfirm}</div>
					{/if}
				</div>

				<div>
					<button
						type="submit"
						class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>Register</button
					>
				</div>
			</form>
		</div>
	</div>
</div>
