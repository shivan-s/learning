<script lang="ts">
	import { browser } from '$app/environment';
	export let value: string | null = null;
</script>

{#if browser}
	<div contenteditable bind:innerText={value} />
	<input type="hidden" bind:value />
{:else}
	<textarea {value} />
{/if}

<style>
	div {
		min-height: 3ch;
	}
</style>
