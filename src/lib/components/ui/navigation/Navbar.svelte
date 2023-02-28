<script lang="ts">
	import NavbarNavigation from '$lib/components/ui/navigation/NavbarNavigation.svelte';
	import NavbarBrand from '$lib/components/ui/navigation/NavbarBrand.svelte';
	import type { Session } from 'lucia-auth';

	export let mode: Boolean;
	export let toggleTheme: () => void;
	export let session: Session | null;
</script>

<div class="min-w-screen m-0 bg-mid py-3 text-dark dark:bg-dark dark:text-white">
	<div class="mx-auto w-[95%]">
		<div class="flex flex-row items-center justify-between">
			<NavbarBrand />
			<NavbarNavigation {mode} {toggleTheme} {session} />
		</div>
	</div>
</div>
