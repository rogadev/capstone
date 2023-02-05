<script lang="ts">
	import { page } from '$app/stores';
	import supabase from '$lib/db';
	import Icon from '@iconify/svelte';
	import NavbarLinksMobile from './NavbarLinksMobile.svelte';
	import NavbarLinks from './NavbarLinks.svelte';
	import ThemeToggle from '$lib/components/theme/ThemeToggle.svelte';

	export let mode: Boolean;
	export let toggleTheme: () => void;

	$: session = $page.data.session;

	const logout = async () => {
		await supabase.auth.signOut();
		window.location.href = '/';
	};

	let showMobileMenu = false;

	const toggleMobileMenu = () => {
		showMobileMenu = !showMobileMenu;
	};

	const links = [
		{
			name: 'Dashboard',
			icon: 'mdi:chart-line',
			href: '/dashboard'
		},
		{
			name: 'Properties',
			icon: 'mdi:home',
			href: '/properties'
		},
		{
			name: 'Customers',
			icon: 'mdi:account-group',
			href: '/customers'
		},
		{
			name: 'Evaluations',
			icon: 'mdi:clipboard-check',
			href: '/evaluations'
		},
		{
			name: 'Quotes',
			icon: 'mdi:file-document-box',
			href: '/quotes'
		},
		{
			name: 'Price Sheets',
			icon: 'mdi:file-document',
			href: '/price-sheets'
		}
	];
</script>

{#if session}
	<div class="flex flex-row gap-2">
		<NavbarLinks {links} />
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
					class="rounded border border-slate-300 bg-blue-50 p-1 hover:border-transparent hover:bg-blue-900 hover:bg-opacity-10 dark:border-white dark:bg-transparent dark:hover:bg-white dark:hover:bg-opacity-10"
				>
					<Icon icon="mdi:menu" />
				</div>
			</button>
			{#if showMobileMenu}
				<!--Invisible backdrop, full h and w, behind the dropdown list, if clicked on, closes showMenuMobile  -->
				<div
					class="fixed inset-0 z-0 h-full w-full bg-black bg-opacity-25"
					on:click={toggleMobileMenu}
					on:keypress={toggleMobileMenu}
				/>
				<!-- dropdown vertical list of navbar links -->
				<!-- on select of any item, close mobile menu, then navigate -->
				<div
					class="absolute top-2 right-28 z-10 mt-12 w-48 rounded border bg-white p-2 shadow-lg"
					on:click={toggleMobileMenu}
					on:keypress={toggleMobileMenu}
				>
					<NavbarLinksMobile {links} />
				</div>
			{/if}
		</div>
		<div
			id="account"
			class="flex flex-row items-center justify-center gap-2 text-2xl font-semibold dark:text-white"
		>
			<ThemeToggle {mode} {toggleTheme} />

			<a
				href="/profile"
				title="Profile"
				class="rounded border border-slate-300 bg-blue-50 p-1 hover:border-transparent hover:bg-blue-900 hover:bg-opacity-10 dark:border-white dark:bg-transparent dark:hover:bg-white dark:hover:bg-opacity-10"
			>
				<Icon icon="mdi:user-circle" />
			</a>

			<button
				type="button"
				title="Logout"
				class="rounded border border-slate-300 bg-blue-50 p-1 hover:border-transparent hover:bg-blue-900 hover:bg-opacity-10 dark:border-white dark:bg-transparent dark:hover:bg-white dark:hover:bg-opacity-10"
				on:click={logout}
			>
				<Icon icon="mdi:logout" />
			</button>
		</div>
	</div>
{:else}
	<ThemeToggle {mode} {toggleTheme} />
{/if}
