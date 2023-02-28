<script lang="ts">
	import { supabase } from '$lib/db';

	export let email: string;

	let loading = true;

	const resendConfirmation = async () => {
		loading = true;
		try {
			const baseUrl = window.location.origin;
			// TODO this may need to go in a back end api route.
			const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
				redirectTo: baseUrl + '/confirm'
			});
			if (error) throw error;
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	};
</script>

<div class="flex min-h-full">
	<div
		class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
	>
		<div class="mx-auto w-full max-w-sm lg:w-96">
			<h2 class="">Please check your email to confirm your account.</h2>
			<p class="mt-2 text-sm text-gray-600">
				If you don't see the email, check other places it might be, like your junk, spam, social, or
				other folders.
			</p>

			<p class="mt-2 text-sm text-gray-600">
				If you still don't see the email, you can
				<button
					type="button"
					class="font-medium text-indigo-600 hover:text-indigo-500"
					on:click={resendConfirmation}
				>
					<!-- TODO finish and remove strikethrough -->
					<s class=" hover:cursor-not-allowed" title="feature is currently unavailable...">
						resend the confirmation email.
					</s>
				</button>
			</p>
		</div>
	</div>
</div>
