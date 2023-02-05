<script lang="ts">
	import Icon from '@iconify/svelte';
	// import { z, ZodError } from 'zod';
	import OrganizationForm from '$lib/components/forms/OrganizationForm/Form.svelte';

	export let data;

	const currentUser = data.userId;
	const existingOrganization = data.userOrganization;
	const errorsFetchingOrganization = data.error;
</script>

<h1>Step 1: Register an account</h1>
{#if currentUser === null}
	<p>Please log in and return to onboarding to continue.</p>
	<a href="/">Log in</a>
{:else}
	<div class="flex items-center gap-2">
		<Icon icon="carbon:checkmark-filled" />
		<p>You are logged in.</p>
	</div>
{/if}

<h1>Step 2: Create an organization</h1>
{#if existingOrganization}
	<div class="flex items-center gap-2">
		<Icon icon="carbon:checkmark-filled" />
		<p>You have an organization.</p>
	</div>
{:else if errorsFetchingOrganization}
	<div class="flex items-center gap-2">
		<Icon icon="carbon:error-filled" />
		<p>There was an error fetching your organization.</p>
	</div>
{:else}
	<OrganizationForm organization={existingOrganization} />
{/if}

<form method="post">
	<!-- {#if organization}
		{#if $organization.organization_name}
			<h1>Welcome to {$organization.organization_name}!</h1>
		{/if}
	{/if}

	{#if $organization && $organization.owner_id === $user.id}
		<h2>Organization Details</h2>
		<label for="organization_name">Organization Name</label>
		<input
			type="text"
			name="organization_name"
			id="organization_name"
			bind:value={$organization.organization_name}
			placeholder="Organization Name"
			required
		/>
		{#if $organization.organization_name}
			<p>
				Your organization name is <strong>{$organization.organization_name}</strong>.
			</p>
		{/if} -->
	<!-- 
	<label for="public_email">Public Email</label>
	<input
		type="email"
		name="public_email"
		id="public_email"
		bind:value={$organization.public_email}
		placeholder="Public Email"
	/>
	{#if $organization.public_email}
		<p>
			Your public email is <strong>{$organization.public_email}</strong>.
		</p>
	{/if}

	<label for="public_phone">Public Phone</label>
	<input
		type="tel"
		name="public_phone"
		id="public_phone"
		bind:value={$organization.public_phone}
		placeholder="Public Phone"
	/>
	{#if $organization.public_phone}
		<p>
			Your public phone is <strong>{$organization.public_phone}</strong>.
		</p>
	{/if}

	<label for="public_website">Public Website</label>
	<input
		type="url"
		name="public_website"
		id="public_website"
		bind:value={$organization.public_website}
		placeholder="Public Website"
	/>
	{#if $organization.public_website}
		<p>
			Your public website is <strong>{$organization.public_website}</strong>.
		</p>
	{/if}

	<label for="show_email">Show Email</label>
	<input
		type="checkbox"
		name="show_email"
		id="show_email"
		bind:checked={$organization.show_email}
	/>

	<label for="show_phone">Show Phone</label>
	<input
		type="checkbox"
		name="show_phone"
		id="show_phone"
		bind:checked={$organization.show_phone}
	/>

	<label for="show_website">Show Website</label>
	<input
		type="checkbox"
		name="show_website"
		id="show_website"
		bind:checked={$organization.show_website}
	/>

	<button type="submit" on:click|preventDefault={saveOrganization}>Save</button> -->
	<!-- {/if} -->
</form>
