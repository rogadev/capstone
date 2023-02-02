<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	export let href: string;
	export let icon: string | undefined;
	export let name: string;

	// TODO clean this up and extract logic into a separate file. I created useTooltip.ts for this exact purpose. Let's use it.

	let showTooltip = false;

	$: mouseLocation = { x: 0, y: 0 };

	function handleMouseMove(event: MouseEvent) {
		mouseLocation.x = event.clientX;
		mouseLocation.y = event.clientY;
	}

	function handleMouseLeave() {
		showTooltip = false;
	}

	function handleMouseEnter(event: MouseEvent) {
		handleMouseMove(event);
		showTooltip = true;
	}
</script>

<a
	{href}
	class={$page.url.pathname === href
		? 'px-3 py-2 text-sm font-medium text-white bg-blue-900 rounded-md shadow hover:bg-blue-700 hover:shadow-lg'
		: 'px-3 py-2 text-sm font-medium text-blue-900 bg-white rounded-md shadow hover:bg-blue-100 hover:shadow-lg'}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
>
	<div class="flex items-center gap-2">
		{#if icon}
			<Icon {icon} />
		{/if}
		<span class="hidden lg:block">
			{name}
		</span>
	</div>
</a>

{#if showTooltip}
	<div
		class="absolute z-10 p-2 text-sm text-white bg-black rounded-md shadow-lg lg:hidden"
		style={`left: ${mouseLocation.x}px; top: ${mouseLocation.y + 20}px;`}
	>
		{name}
	</div>
{/if}
