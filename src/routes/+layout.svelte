<script lang="ts">
	import '../app.css'; // TailwindCSS Global Styles
	import { onMount, onDestroy } from 'svelte';
	import { invalidate } from '$app/navigation';
	import * as colorTheme from '$lib/stores/colorTheme';
	import supabaseClient from '$lib/db';
	import Navbar from '$lib/components/ui/navigation/Navbar.svelte';

	let mode: 'light' | 'dark';
	colorTheme.useBrowserPreference();
	const unsubscribe = colorTheme.mode.subscribe((value) => {
		const useDark = value === 'dark';
		mode = useDark ? 'dark' : 'light';
	});
	$: useDark = mode === 'dark';

	function toggleTheme() {
		colorTheme.toggleMode();
	}

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});
		return () => {
			subscription.unsubscribe();
		};
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class={useDark ? 'dark' : ''}>
	<Navbar mode={useDark} {toggleTheme} />
	<div class="mx-auto w-5/6 pt-4">
		<slot />
	</div>
</div>
