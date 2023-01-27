<script lang="ts">
	import Icon from '@iconify/svelte';
	export let href: string;
</script>

<a {href} class="p-1 text-white bg-blue-900 rounded shadow font hover:bg-blue-700 hover:shadow-lg">
	<Icon icon="mdi:plus" class="hidden mr-2 font-semibold text-white lg:inline-block" />
	<slot />
</a>
