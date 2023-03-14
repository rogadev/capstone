<script lang="ts">
	export let pageTitle: string = '';
</script>

<div class="p-2">
	<h1 class="text-center">{pageTitle}</h1>
	<slot />
</div>
