<script lang="ts">
	import { page } from '$app/stores';

	const { organizations } = $page.data.organizations;
</script>

<h1>Launchpad</h1>
<p>Here, choose your organization, or create a new one.</p>

{#each organizations as organization}
	<a href="/launch-pad/{organization.id}">{organization.name}</a>
{/each}
