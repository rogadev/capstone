<script lang="ts">
	import '../../app.css'; // TailwindCSS Global Styles
	import { onDestroy } from 'svelte';
	import * as colorTheme from '$lib/stores/colorTheme';
	import { page } from '$app/stores';
	import { handleSession } from '@lucia-auth/sveltekit/client';

	handleSession(page);

	colorTheme.useBrowserPreference();

	let mode: 'light' | 'dark';

	const colorThemeUnsubscribe = colorTheme.mode.subscribe((value) => {
		const useDark = value === 'dark';
		mode = useDark ? 'dark' : 'light';
	});

	$: useDark = mode === 'dark';

	onDestroy(() => {
		colorThemeUnsubscribe();
	});
</script>

<p>Driver Layout</p>
<slot />
