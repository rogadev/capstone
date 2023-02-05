<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div>
	<!-- TODO Remove disabled and title attributes. -->
	<button
		disabled
		formaction="/?login&provider=azure"
		class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
		title="Sign in with Microsoft is not available at the moment."
	>
		<span class="sr-only">Sign in with Microsoft</span>
		<Icon icon="logos:microsoft-icon" class="h-5 w-5" />
	</button>
</div>
