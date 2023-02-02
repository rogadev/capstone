<script lang="ts">
	import { page } from '$app/stores';
	$: session = $page.data.session;
</script>

<div id="brand">
	<a href={session ? '/dashboard' : '/'} class="flex flex-row gap-2 items-center">
		<img
			src="https://a.storyblok.com/f/192938/512x512/384274f919/app-logo.png/m/40x0/filters:format(webp)"
			alt="logo"
			class="p-1 h-[40px]"
		/>
		<span class="sm:block text-3xl font-semibold {session ? 'hidden' : 'block'}">EzEval</span>
	</a>
</div>
