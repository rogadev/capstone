<script lang="ts">
	import ConfirmationRequired from '$lib/components/auth/ConfirmationRequired.svelte';
	export let email: string;

	// TODO - If no email parameter was provided for this page, redirect to login page.
</script>

<ConfirmationRequired {email} />
