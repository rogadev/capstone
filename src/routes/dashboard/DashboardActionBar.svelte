<script>
	import DashboardActionBarLink from './DashboardActionBarLink.svelte';
	const actions = [
		{
			href: '/properties/new',
			label: 'Property'
		},
		{
			href: '/customers/new',
			label: 'Customer'
		},
		{
			href: '/evaluations/new',
			label: 'Evaluation'
		},
		{
			href: '/quotes/new',
			label: 'Quote'
		},
		{
			href: '/price-sheets/new',
			label: 'Price Sheet'
		}
	];
</script>

<div>
	<h3 class="my-4 text-2xl font-semibold text-center sm:text-left">Quick Links</h3>
	<div
		id="dashboard-options"
		class="grid grid-cols-2 gap-4 text-center md:grid-cols-3 lg:grid-cols-5"
	>
		{#each actions as { href, label }}
			<DashboardActionBarLink {href}>{label}</DashboardActionBarLink>
		{/each}
	</div>
</div>
