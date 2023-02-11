<!-- <script lang="ts">
	export let label: string;
	let showMenu = false;
</script> -->

<div class="grow overflow-auto ">
	<div class="grid grid-cols-10">
		<section class="col-span-2 min-w-0">asslakdjflasjdflajksdfdf</section>
		<main class="col-span-8">sss</main>
	</div>
</div>

<!-- <div class="flex flex-col md:flex-row">
	<section class="col-span-2 min-w-fit bg-slate-200 p-4 dark:bg-dark dark:bg-opacity-60">
		<div class="flex flex-grow">
			<div class="grid w-[20vw] min-w-[200px] grid-cols-1">
				{#if label}
					<h1>{label}</h1>
				{/if}
				<div class="hidden md:block">
					<slot name="sidebar" />
				</div>
				<div class="md:hidden">
					<button type="button" on:click={() => (showMenu = !showMenu)}>Show/Hide</button>
					{#if showMenu}
						<slot name="sidebar" />
					{/if}
				</div>
			</div>
		</div>
	</section>
	<section class="col-span-8 m-4 w-full max-w-[80vw]">
		<slot />
	</section>
</div> -->
