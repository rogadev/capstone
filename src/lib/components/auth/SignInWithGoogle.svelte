<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div>
	<button
		formaction="?provider=google"
		class="inline-flex w-full justify-center rounded-md bg-white p-5 shadow-md hover:bg-gray-50 dark:bg-light dark:hover:bg-mid"
	>
		<span class="sr-only">Sign in with Google</span>
		<Icon icon="logos:google-icon" class="h-6 w-6" />
	</button>
</div>
