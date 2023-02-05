<script lang="ts">
	import { page } from '$app/stores';
	$: session = $page.data.session;
</script>

<div id="brand">
	<a href={session ? '/dashboard' : '/'} class="flex flex-row items-center gap-2">
		<img
			src="https://a.storyblok.com/f/192938/512x512/384274f919/app-logo.png/m/40x0/filters:format(webp)"
			alt="logo"
			class="h-[40px] p-1"
		/>
		<span class="text-3xl font-semibold">EzEval</span>
	</a>
</div>
