<svelte:head>
	<title>EzEval | Login / Register</title>
</svelte:head>

<div class="container w-4/5 mx-auto border shadow m-8 p-4 flex flex-col items-center">
	<h2>Login / Register</h2>
	<hr class="w-4/5 my-4" />
	<form method="POST" class="flex flex-col gap-4 text-lg font-semibold">
		<button formaction="?/login&provider=google" class="hover:underline hover:font-bold">
			Google
		</button>
	</form>
</div>
