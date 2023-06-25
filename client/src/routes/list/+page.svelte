<script lang="ts">
	import type { PageData } from './$types';
	import Learning from '$components/Learning.svelte';
	import Filter from '$components/Filter.svelte';

	export let data: PageData;

	$: ({ topics, topicId, q, nextCursor, previousCursor, learnings } = data);

	/* DEBUGGING */
	console.log('data', data);
</script>

<Filter {q} {topicId} {topics} />
<hr />
<div class="flex" style="justify-content: space-between">
	<form method="GET" data-sveltekit-noscroll>
		<input name="cursor" type="hidden" value={String(previousCursor)} />
		<button type="submit" disabled={previousCursor === undefined}>Previous</button>
	</form>
	<form method="GET" data-sveltekit-noscroll>
		<input name="cursor" type="hidden" value={String(nextCursor)} />
		<button type="submit" disabled={nextCursor === undefined}>Next</button>
	</form>
</div>
<hr />
{#each learnings as learning}
	<Learning {...learning} />
{/each}
<div class="flex" style="justify-content: space-between">
	<form method="GET" data-sveltekit-noscroll>
		<input name="cursor" type="hidden" value={String(previousCursor)} />
		<button type="submit" disabled={previousCursor === undefined}>Previous</button>
	</form>
	<form method="GET" data-sveltekit-noscroll>
		<input name="cursor" type="hidden" value={String(nextCursor)} />
		<button type="submit" disabled={nextCursor === undefined}>Next</button>
	</form>
</div>
