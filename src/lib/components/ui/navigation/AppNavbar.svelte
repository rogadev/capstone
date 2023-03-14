<script lang="ts">
	import NavbarBrand from '$lib/components/ui/navigation/NavbarBrand.svelte';
	import ThemeToggle from '$lib/components/theme/ThemeToggle.svelte';

	export let mode: Boolean;
</script>

<div class="min-w-screen m-0 bg-mid py-3 text-dark dark:bg-dark dark:text-white">
	<div class="mx-auto w-[95%]">
		<div class="flex flex-row items-center justify-between">
			<NavbarBrand />
			<ThemeToggle {mode} />
		</div>
	</div>
</div>
