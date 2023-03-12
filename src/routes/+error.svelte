<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { handleSession } from '@lucia-auth/sveltekit/client';
	import * as colorTheme from '$lib/stores/colorTheme';
	import { onDestroy } from 'svelte';

	handleSession(page);

	colorTheme.useBrowserPreference();

	let mode: 'light' | 'dark';
	$: useDark = mode === 'dark';

	const colorThemeUnsubscribe = colorTheme.mode.subscribe((value) => {
		const useDark = value === 'dark';
		mode = useDark ? 'dark' : 'light';
	});
	onDestroy(() => {
		colorThemeUnsubscribe();
	});
</script>

<div class={useDark ? 'dark' : ''}>
	<div class="flex h-screen flex-col items-center justify-center bg-light dark:bg-dark">
		<h2 class="mb-4 text-3xl font-bold text-gray-800 dark:text-white">
			{$page.status}: {$page.error?.message}
		</h2>
		<a class="rounded bg-primary py-2 px-4 font-bold text-white hover:bg-accent" href="/">
			Back to Safety
		</a>
	</div>
</div>
