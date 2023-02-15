<script lang="ts">
	import { page } from '$app/stores';
	import Auth from '$lib/components/auth/Auth.svelte';
	import FeatureSection from '$lib/components/ui/wrappers/FeatureSection.svelte';

	$: session = $page.data.session;
</script>

{#if !session}
	<FeatureSection>
		<Auth />
	</FeatureSection>
{/if}
