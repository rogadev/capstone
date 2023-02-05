<script lang="ts">
	import NavbarNavigation from '$lib/components/ui/navigation/NavbarNavigation.svelte';
	import NavbarBrand from '$lib/components/ui/navigation/NavbarBrand.svelte';

	export let mode: Boolean;
	export let toggleTheme: () => void;
</script>

<div class="m-0 w-full border-b bg-slate-200 py-3 dark:bg-slate-900 dark:text-white">
	<div class="mx-auto w-5/6">
		<div class="flex flex-row items-center justify-between">
			<NavbarBrand />
			<NavbarNavigation {mode} {toggleTheme} />
		</div>
	</div>
</div>
