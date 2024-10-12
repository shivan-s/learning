<script lang="ts">
	import type { PageData } from './$types';
	import Learning from '$components/Learning.svelte';

	export let data: PageData;
</script>

<div class="flex center">
	<form method="GET" data-sveltekit-reload>
		<button type="submit">Draw</button>
	</form>
	{#if data.learningsCount.count > 1}
		from {data.learningsCount.count} learnings.
	{/if}
</div>
<hr />
{#if data.randomLearning}
	<Learning {...data.randomLearning} />
{:else}
	<p>No Learnings!</p>
{/if}
