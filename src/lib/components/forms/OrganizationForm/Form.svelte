<script lang="ts">
	import type { OrganizationData } from '$lib/schemas/organization';
	import organizationSchema from '$lib/schemas/organization';
	import TextInput from './TextInput.svelte';
	import SliderInput from './SliderInput.svelte';

	export let organization: OrganizationData | null = null;

	$: method = organization ? 'PUT' : 'POST';

	const orgData: OrganizationData = {
		organization_name: '',
		public_phone: '',
		public_email: '',
		public_address: '',
		show_phone: false,
		show_email: false,
		show_address: false
	};

	$: if (organization) {
		orgData.organization_name = organization.organization_name;
		orgData.public_phone = organization.public_phone;
		orgData.public_email = organization.public_email;
		orgData.public_address = organization.public_address;
		orgData.show_phone = organization.show_phone;
		orgData.show_email = organization.show_email;
		orgData.show_address = organization.show_address;
	}

	// We may have one or more zod errors for each field. We may also have zero errors. We want to capture all errors in an object that we can use later to dynamically display errors below each field. Each field is either an empty array, or an array of strings.
	let errors: {
		organization_name: string[];
		public_phone: string[];
		public_email: string[];
		public_address: string[];
		show_phone: string[];
		show_email: string[];
		show_address: string[];
	} = {
		organization_name: [],
		public_phone: [],
		public_email: [],
		public_address: [],
		show_phone: [],
		show_email: [],
		show_address: []
	};

	function validateOrgName() {
		const result = organizationSchema.organization_name.safeParse(orgData.organization_name);
		if (result.success) {
			errors.organization_name = [];
		} else {
			// zod either returns an array or one error. We want to make sure we always have an array.
			errors.organization_name = [...result.error.errors.map((error) => error.message)];
		}
	}

	let validSubmission = false;
</script>

<form {method}>
	<TextInput
		text="Organization Name"
		slug="organization_name"
		bind:value={orgData.organization_name}
		placeholder="Organization Name"
		required
		errors={errors.organization_name}
	/>
	<TextInput
		text="Public Phone"
		slug="public_phone"
		bind:value={orgData.public_phone}
		placeholder="Public Phone"
		required
		errors={errors.public_phone}
	/>
	<TextInput
		text="Public Email"
		slug="public_email"
		bind:value={orgData.public_email}
		placeholder="Public Email"
		required
		errors={errors.public_email}
	/>

	<TextInput
		text="Public Address"
		slug="public_address"
		bind:value={orgData.public_address}
		placeholder="Public Address"
		required
		errors={errors.public_address}
	/>

	<SliderInput
		text="Show Phone"
		slug="show_phone"
		bind:value={orgData.show_phone}
		errors={errors.show_phone}
	/>

	<SliderInput
		text="Show Email"
		slug="show_email"
		bind:value={orgData.show_email}
		errors={errors.show_email}
	/>

	<SliderInput
		text="Show Address"
		slug="show_address"
		bind:value={orgData.show_address}
		errors={errors.show_address}
	/>

	<button
		class="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
		type="submit"
		disabled={!validSubmission}
		title={!validSubmission ? 'Please fill out all required fields' : ''}
	>
		Submit
	</button>
</form>
