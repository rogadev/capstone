<script lang="ts">
	import Icon from '@iconify/svelte';
	export let slug: string;
	export let text: string;
	export let placeholder: string;
	export let required: boolean;
	export let value: string;
	export let errors: string[] | [];
</script>

<div>
	<div class="grid grid-cols-3 items-center">
		<label class="col-span-1" for={slug}>{text}</label>
		<div class="flex gap-2 items-center justify-end col-span-2">
			{#if required}
				<Icon icon="mdi:required" class="text-red-600" />
			{/if}
			<input
				type="text"
				class="w-full"
				name={slug}
				id={slug}
				bind:value
				placeholder={placeholder ? placeholder : null}
				{required}
			/>
		</div>
	</div>
	{#if errors.length > 0}
		<ul>
			{#each errors as error}
				<li>{error}</li>
			{/each}
		</ul>
	{/if}
</div>
