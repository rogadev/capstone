<script lang="ts">
	import '../app.css'; // TailwindCSS Global Styles
	import { onMount, onDestroy } from 'svelte';
	import { invalidate } from '$app/navigation';
	import * as colorTheme from '$lib/stores/colorTheme';
	import supabaseClient from '$lib/db';
	import Navbar from '$lib/components/ui/navigation/Navbar.svelte';
	import { page } from '$app/stores';

	const session = $page.data.session;

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

<div class="min-w-screen flex min-h-screen flex-col overflow-auto {useDark ? 'dark' : ''}">
	<Navbar {session} mode={useDark} {toggleTheme} />
	<div
		class="flex flex-grow flex-col overflow-auto bg-light text-black dark:bg-dark dark:bg-opacity-95 dark:text-white"
	>
		<slot />
	</div>
</div>

<style>
	:global(h1) {
		font-size: 2rem;
		font-weight: 700;
	}
	:global(h2) {
		font-size: 1.5rem;
		font-weight: 700;
	}
	:global(h3) {
		font-size: 1.25rem;
		font-weight: 700;
	}
	:global(p) {
		margin: 1rem;
	}
</style>
