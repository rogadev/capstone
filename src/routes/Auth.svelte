<script lang="ts">
	import Icon from '@iconify/svelte';
	// TODO Remove this auth in favor of the new component. Only replace once new auth works.
</script>

<section class="h-screen">
	<div class="px-6 h-full text-gray-900">
		<div
			class="border flex flex-col items-center gap-4 pt-8 pb-9 rounded-lg shadow w-3/5 mx-auto mt-10"
		>
			<h1 class="text-3xl font-semibold">Welcome</h1>
			<form method="POST">
				<button
					class="flex flex-col gap-2 items-center text-lg font-semibold px-8 py-3 rounded-lg shadow bg-gray-100 hover:bg-gray-200 "
					formaction="?/login&provider=google"
				>
					Login
					<Icon icon="logos:google-icon" height="30px" class="mb-2" />
				</button>
			</form>
		</div>
	</div>
</section>
