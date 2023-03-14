<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let time: string;

	let timeUntil: string;
	let timer: ReturnType<typeof setTimeout>;
	let secondsRemaining: number;

	function updateTime() {
		const now = new Date();
		const [stopHours, stopMinutes] = time.split(':').map(Number);
		const stopTime = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate(),
			stopHours,
			stopMinutes
		);
		const diff = Math.floor((stopTime.getTime() - now.getTime()) / 1000);
		const hours = Math.floor(diff / 3600);
		const minutes = Math.floor((diff % 3600) / 60);
		secondsRemaining = diff;
		timeUntil = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
		timer = setTimeout(updateTime, 10000);
	}

	onMount(() => {
		updateTime();
	});

	onDestroy(() => {
		clearTimeout(timer);
	});
</script>

{#if secondsRemaining > 0}
	<h3 class={secondsRemaining > 15 * 60 ? 'font-medium text-black' : 'font-bold text-red-500'}>
		{timeUntil}
	</h3>
{:else}
	<h3 class="font-bold text-red-500">LATE</h3>
{/if}

<style scoped>
	h3 {
		font-size: 1.25rem;
		margin: 0;
	}
</style>
