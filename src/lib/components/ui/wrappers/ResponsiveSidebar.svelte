<div class="flex min-h-[92.7vh] flex-col items-stretch justify-items-stretch md:flex-row">
	<section
		class="w-screen bg-slate-200 p-4 dark:bg-dark dark:bg-opacity-60 md:w-[20vw] md:min-w-fit"
	>
		<slot name="sidebar" />
	</section>
	<section class="m-4">
		<slot />
	</section>
</div>
