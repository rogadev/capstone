<script lang="ts">
	import ResponsiveSidebar from '$lib/components/ui/wrappers/ResponsiveSidebar.svelte';
</script>

<ResponsiveSidebar title="Add New Driver" actions={undefined}>
	<div class="flex flex-col items-center justify-center">
		<p>New Driver Form</p>
		<form method="post" class="text-black dark:text-white">
			<div>
				<label for="name">Name</label>
				<input type="text" name="name" autocomplete="off" class="text-black dark:text-black" />
			</div>
			<div>
				<label for="email">Email</label>
				<input type="text" name="email" autocomplete="off" class="text-black dark:text-black" />
			</div>
			<div>
				<div class="mt-4">
					<small
						>EzTripr strongly recommends only inviting users who are part of your organization. By
						clicking <b>I Agree</b>, you confirm that you have verified the accuracy of the email
						address of the individual you are about to invite. You acknowledge that the person you
						invite will have access to personal information of your clients and that, if the email
						address is not controlled by your organization, the person may continue to have access
						even after their removal from the EzTripr app. You understand that the creators of
						EzTripr are not responsible for your distribution of personal information through using
						the app. You acknowledge that personal information of Canadians is protected under PIPA
						laws in BC and PIPEDA on the federal level. You acknowledge that a breach of personal
						privacy can carry with it a penalty of up to $100,000 per incident. By using EzTripr,
						you acknowledge that the creators of the app are not liable for any actions or
						consequences resulting from the use of the app. To learn more about PIPA and PIPEDA
						laws, please visit the following links:
						<a
							href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/03063_01"
							target="_blank"
							rel="noreferrer"
							>https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/03063_01</a
						>
						and
						<a
							href="https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/"
							target="_blank"
							rel="noreferrer"
							>https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/</a
						>.
					</small>
				</div>
				<div class="mb-4 flex items-center justify-end gap-4">
					<label for="terms">I Agree</label>
					<input type="checkbox" name="terms" />
				</div>
			</div>
			<div class="flex justify-end">
				<button
					type="submit"
					class="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
				>
					Submit
				</button>
			</div>
		</form>
	</div>
</ResponsiveSidebar>
