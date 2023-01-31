<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div>
	<button
		formaction="/?login&provider=github"
		class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
	>
		<span class="sr-only">Sign in with GitHub</span>
		<Icon icon="logos:github-icon" class="h-5 w-5" />
	</button>
</div>
