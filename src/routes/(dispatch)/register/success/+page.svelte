<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let countdown = 10;

	onMount(() => {
		const interval = setInterval(() => {
			if (countdown === 0) clearInterval(interval);
			countdown -= 1;
		}, 1000);

		const redirectTimeout = setTimeout(() => {
			goto('/login');
		}, countdown * 1000);

		return () => {
			clearTimeout(redirectTimeout);
			clearInterval(interval);
		};
	});
</script>

<main class="h-[80vh] w-full py-6">
	<div class="flex h-full flex-col items-center justify-center">
		<h1 class="text-center text-3xl font-bold ">Registration Success!</h1>
		<p class="mt-4 text-center text-lg">Please check your email to confirm your registration.</p>
		<p class="mt-6 text-center italic">
			You will be redirected to the login page in <span class="text-xl font-bold">{countdown}</span>
			seconds.
		</p>
	</div>
</main>
