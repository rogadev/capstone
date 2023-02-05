<script lang="ts">
	import Icon from '@iconify/svelte';
	export let href: string;
</script>

<a {href} class="font rounded bg-blue-900 p-1 text-white shadow hover:bg-blue-700 hover:shadow-lg">
	<Icon icon="mdi:plus" class="mr-2 hidden font-semibold text-white lg:inline-block" />
	<slot />
</a>
