<script lang="ts">
	import { page } from '$app/stores';
	import supabase from '$lib/db';
	import Icon from '@iconify/svelte';
	import NavbarLinksMobile from './NavbarLinksMobile.svelte';
	import NavbarLinks from './NavbarLinks.svelte';

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
	<div class="flex flex-row gap-4">
		<NavbarLinks {links} />
		<!-- Mobile Navigation Hamburger -->
		<div class="flex flex-row items-center gap-2 md:hidden">
			<button
				type="button"
				title="Menu"
				class="text-2xl text-blue-900 hover:text-blue-700"
				on:click={() => {
					showMobileMenu = !showMobileMenu;
				}}
			>
				<div
					class="p-1 bg-white border rounded shadow hover:bg-blue-600 hover:text-white hover:shadow-none focus:outline-none focus:bg-blue-600 focus:text-white focus:shadow-inner"
				>
					<Icon icon="mdi:menu" />
				</div>
			</button>
			{#if showMobileMenu}
				<!--Invisible backdrop, full h and w, behind the dropdown list, if clicked on, closes showMenuMobile  -->
				<div
					class="fixed inset-0 z-0 w-full h-full bg-black bg-opacity-25"
					on:click={toggleMobileMenu}
					on:keypress={toggleMobileMenu}
				/>
				<!-- dropdown vertical list of navbar links -->
				<!-- on select of any item, close mobile menu, then navigate -->
				<div
					class="absolute z-10 w-48 p-2 mt-12 bg-white border rounded shadow-lg top-2 right-28"
					on:click={toggleMobileMenu}
					on:keypress={toggleMobileMenu}
				>
					<NavbarLinksMobile {links} />
				</div>
			{/if}
		</div>
		<div id="account" class="flex flex-row items-center gap-2">
			<a href="/profile" title="Profile" class="text-2xl text-blue-900 hover:text-blue-700">
				<Icon icon="mdi:user-circle" />
			</a>
			<button
				type="button"
				title="Logout"
				on:click={logout}
				class="text-2xl text-blue-900 hover:text-blue-700"
			>
				<Icon icon="mdi:logout" />
			</button>
		</div>
	</div>
{/if}
