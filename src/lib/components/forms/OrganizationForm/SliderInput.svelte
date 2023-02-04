<script lang="ts">
	export let slug: string;
	export let text: string;
	export let value: boolean;
	export let errors: string[] | [];
</script>

<div>
	<div class="grid grid-cols-3 items-center">
		<label class="col-span-1" for={slug}>{text}</label>
		<div class="flex gap-2 items-center justify-end col-span-2">
			<input
				type="checkbox"
				name={slug}
				id={slug}
				checked={value}
				class="form-checkbox h-5 w-5 text-gray-600"
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
