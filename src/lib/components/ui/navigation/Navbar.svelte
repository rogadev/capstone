<script lang="ts">
	import NavbarNavigation from '$lib/components/ui/navigation/NavbarNavigation.svelte';
	import NavbarBrand from '$lib/components/ui/navigation/NavbarBrand.svelte';

	export let mode: Boolean;
	export let toggleTheme: () => void;
</script>

<div class="w-full py-3 m-0 border-b bg-slate-200 dark:bg-slate-900 dark:text-white">
	<div class="w-5/6 mx-auto">
		<div class="flex flex-row items-center justify-between">
			<NavbarBrand />
			<NavbarNavigation {mode} {toggleTheme} />
		</div>
	</div>
</div>
