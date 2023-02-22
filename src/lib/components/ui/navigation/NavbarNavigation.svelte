<script lang="ts">
	import Icon from '@iconify/svelte';
	import NavbarLinksMobile from './NavbarLinksMobile.svelte';
	import NavbarLinks from './NavbarLinks.svelte';
	import ThemeToggle from '$lib/components/theme/ThemeToggle.svelte';
	import type { Session } from 'lucia-auth';
	import links from './links';

	export let mode: Boolean;
	export let toggleTheme: () => void;
	export let session: Session | null;

	const logout = async () => {
		window.location.href = '/logout';
	};

	let showMobileMenu = false;

	const toggleMobileMenu = () => {
		showMobileMenu = !showMobileMenu;
	};
</script>

{#if session}
	<div class="flex flex-row gap-2">
		<NavbarLinks {session} {links} />
		<!-- Mobile Navigation Hamburger -->
		<div class="flex md:hidden">
			<button
				type="button"
				title="Menu"
				class="text-2xl"
				on:click={() => {
					showMobileMenu = !showMobileMenu;
				}}
			>
				<div
					class="rounded bg-light p-1 shadow hover:bg-dark hover:text-white dark:bg-light dark:text-black dark:hover:bg-slate-600 dark:hover:text-slate-50"
				>
					{#if showMobileMenu}
						<Icon icon="mdi:arrow-down" />
					{:else}
						<Icon icon="mdi:menu" />
					{/if}
				</div>
			</button>
			{#if showMobileMenu}
				<!--Invisible backdrop, full h and w, behind the dropdown list, if clicked on, closes showMenuMobile  -->
				<div
					class="fixed inset-0 z-0 h-full w-full bg-dark bg-opacity-25"
					on:click={toggleMobileMenu}
					on:keypress={toggleMobileMenu}
				/>
				<!-- dropdown vertical list of navbar links -->
				<!-- on select of any item, close mobile menu, then navigate -->
				<div
					class="absolute top-2 right-28 z-10 mt-12 w-48 rounded border border-gray-400 bg-mid p-2 shadow-lg dark:border-gray-800 dark:bg-dark"
					on:click={toggleMobileMenu}
					on:keypress={toggleMobileMenu}
				>
					<NavbarLinksMobile {links} />
				</div>
			{/if}
		</div>
		<div
			class="flex flex-row items-center justify-center gap-2 text-2xl font-semibold dark:text-white"
		>
			<ThemeToggle {mode} {toggleTheme} />
			<a
				href="/account"
				title="Account Settings"
				class="rounded bg-light p-1 shadow hover:bg-dark hover:text-white dark:bg-light dark:text-black dark:hover:bg-slate-600 dark:hover:text-slate-50"
			>
				<Icon icon="material-symbols:settings-account-box" />
			</a>

			<button
				type="button"
				title="Logout"
				class="rounded bg-light p-1 shadow hover:bg-dark hover:text-white dark:bg-light dark:text-black dark:hover:bg-slate-600 dark:hover:text-slate-50"
				on:click={logout}
			>
				<Icon icon="mdi:logout" />
			</button>
		</div>
	</div>
{:else}
	<ThemeToggle {mode} {toggleTheme} />
{/if}
