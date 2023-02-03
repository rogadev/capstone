<script lang="ts">
	import ConfirmationRequired from '$lib/components/auth/ConfirmationRequired.svelte';

	export let email: string;
</script>

<ConfirmationRequired {email} />
