<script lang="ts">
	import SignInWithGoogle from './SignInWithGoogle.svelte';
</script>

<div class="flex items-center justify-center">
	<div class="flex flex-1 flex-col justify-center py-6 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
		<div class="mx-auto w-full max-w-sm lg:w-96">
			<div class="flex flex-col items-center">
				<img
					class="h-16 w-auto"
					src="https://a-us.storyblok.com/f/1004312/512x512/9a8d0bbf7e/favicon.png"
					alt="Roga Dev"
				/>
				<h2
					class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
				>
					Sign in to your account
				</h2>
			</div>

			<!-- Social Sign In -->
			<form method="POST" class="mt-8">
				<div>
					<div>
						<div class="mt-1 flex flex-row items-center justify-center">
							<SignInWithGoogle />
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="hidden lg:block">
		<img
			class="m-4 rounded object-cover shadow"
			src="https://a-us.storyblok.com/f/1004312/2137x2849/38ac677c45/driving-with-granny-go-go.jpg/m/0x650/filters:format(webp)"
			alt=""
		/>
	</div>
</div>
