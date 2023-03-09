<script lang="ts">
	import { page } from '$app/stores';
	import type { ActionArray } from './ActionArray';

	// PROPS
	export let actions: ActionArray | undefined;
	let currentAction: string;
	const selectAction = (action: string) => {
		currentAction = action;
	};
	export let title: string;

	// ACTIONS
	function isActionActive(href: string) {
		return $page.url.pathname === href;
	}
</script>

<div class="grow overflow-auto ">
	<div class="hidden md:flex md:flex-row">
		<section
			class="h-[92.9vh] w-[20vw] min-w-fit flex-grow bg-mid bg-opacity-75 p-4 dark:bg-dark dark:bg-opacity-75"
		>
			<h1 class="mb-4 text-3xl font-semibold">
				{title}
			</h1>
			<nav>
				{#if actions}
					{#each actions as action}
						{#if 'href' in action}
							<a
								href={action.href}
								class="my-2 flex w-full flex-row items-center justify-start rounded-md px-3 py-2 hover:bg-accent hover:text-white  dark:hover:bg-accent {isActionActive(
									action.href
								)
									? 'bg-primary text-dark hover:bg-primary hover:text-dark dark:hover:bg-primary'
									: 'bg-black bg-opacity-5 text-black dark:bg-white dark:bg-opacity-5 dark:text-white'}"
							>
								<span class="text-lg font-semibold">{action.label}</span>
							</a>
						{:else if 'action' in action}
							<button
								on:click={action.action}
								class="my-2 flex w-full flex-row items-center justify-start rounded-md px-3 py-2 hover:bg-accent hover:text-white  dark:hover:bg-accent {currentAction ===
								action.label
									? 'bg-primary text-dark hover:bg-primary hover:text-dark dark:hover:bg-primary'
									: 'bg-black bg-opacity-5 text-black dark:bg-white dark:bg-opacity-5 dark:text-white'}"
							>
								<span class="text-lg font-semibold">{action.label}</span>
							</button>
						{/if}
					{/each}
				{/if}
			</nav>
		</section>
		<main class="w-[80vw] flex-grow p-4">
			<slot />
		</main>
	</div>
	<div class="flex flex-col items-start justify-start md:hidden">
		<section
			class="m-0 flex w-screen flex-row justify-between bg-mid bg-opacity-75 p-4 dark:bg-dark dark:bg-opacity-75"
		>
			<h1 class="text-3xl font-semibold">
				{title}
			</h1>
		</section>
		<nav
			class="flex w-screen flex-row flex-wrap gap-2 bg-mid bg-opacity-75 px-4 pb-1 dark:bg-dark dark:bg-opacity-75"
		>
			{#if actions}
				{#each actions as action}
					{#if 'action' in action}
						<button
							on:click={action.action}
							class="my-2 flex w-fit flex-row items-center justify-start rounded-md px-3 py-2 hover:bg-accent hover:text-white  dark:hover:bg-accent {currentAction ===
							action.label
								? 'bg-primary text-dark hover:bg-primary hover:text-dark dark:hover:bg-primary'
								: 'bg-black bg-opacity-5 text-black dark:bg-white dark:bg-opacity-5 dark:text-white'}"
						>
							<span class="text-lg font-semibold">{action.label}</span>
						</button>
					{:else if 'href' in action}
						<a
							href={action.href}
							class="my-2 flex w-fit flex-row items-center justify-start rounded-md px-3 py-2 hover:bg-accent hover:text-white  dark:hover:bg-accent {isActionActive(
								action.href
							)
								? 'bg-primary text-dark hover:bg-primary hover:text-dark dark:hover:bg-primary'
								: 'bg-black bg-opacity-5 text-black dark:bg-white dark:bg-opacity-5 dark:text-white'}"
						>
							<span class="text-lg font-semibold">{action.label}</span>
						</a>
					{/if}
				{/each}
			{/if}
		</nav>
		<main class="w-screen p-4">
			<slot />
		</main>
	</div>
</div>
