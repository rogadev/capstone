<script>
	import '../app.css'; // TailwindCSS Global Styles
	import supabaseClient from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Navbar from './Navbar.svelte';

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
</script>

<Navbar />
<div class="w-5/6 mx-auto pt-4">
	<slot />
</div>
