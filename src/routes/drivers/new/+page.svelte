<script lang="ts">
	import ResponsiveSidebar from '$lib/components/ui/wrappers/ResponsiveSidebar.svelte';
	export let form: FormResponse;

	type ReturnedDriverInviteSchema = {
		name: string;
		email: string;
	};

	type FormResponse = {
		data: ReturnedDriverInviteSchema;
		errors: {
			name?: string;
			email?: string;
			terms?: string;
		};
	};
</script>

<ResponsiveSidebar title="Add New Driver" actions={undefined}>
	<div class="flex flex-col items-center justify-center">
		<form method="post" class="w-[400px] p-4 text-black dark:text-white">
			<h6 class="mb-4 text-center text-xl font-semibold">New Driver Form</h6>
			<div class="input-container">
				<label for="name">Name</label>
				<input
					value={form?.data?.name ?? ''}
					type="text"
					name="name"
					autocomplete="off"
					class="text-black dark:text-black"
					tabindex="0"
				/>
				{#if form?.errors?.name}
					<small class="text-red-500">{form?.errors?.name ?? ''}</small>
				{/if}
			</div>
			<div class="input-container">
				<label for="email">Email</label>
				<input
					value={form?.data?.email ?? ''}
					type="text"
					name="email"
					autocomplete="off"
					class="text-black dark:text-black"
					tabindex="0"
				/>
				{#if form?.errors?.email}
					<small class="text-red-500">{form.errors.email}</small>
				{/if}
			</div>
			<div>
				<small>
					By clicking the "I Agree", you agree to our <a
						class="font-semibold text-blue-500"
						href="/terms"
						rel="noreferrer"
						target="_blank"
						tabindex="-1">Terms of Service</a
					>
					and
					<a
						class="font-semibold text-blue-500"
						href="/privacy"
						rel="noreferrer"
						target="_blank"
						tabindex="-1">Privacy Policy</a
					>.
				</small>

				<div class="mb-4 flex items-center justify-end gap-4">
					{#if form?.errors?.terms}
						<small class="max-w-[70%] text-red-500">{form?.errors?.terms || ''}</small>
					{/if}
					<label for="terms">I Agree</label>
					<input type="checkbox" name="terms" tabindex="0" />
				</div>
			</div>
			<div class="flex justify-end">
				<button
					type="submit"
					class="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
					tabindex="0"
				>
					Submit
				</button>
			</div>
		</form>
	</div>
</ResponsiveSidebar>

<style>
	.input-container {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
	}
</style>
