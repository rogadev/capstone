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

<!-- TODO - Need to rip auth component apart. Split into 2 parts - signup/signin -->
<!-- TODO - Need to add a "forgot password" link to the auth component. -->
<!-- TODO - Need to add a "resend confirmation" link to the auth component. Must fill in email address to navigate to /confirm -->
