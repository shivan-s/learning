<script lang="ts">
	import type { PageData } from './$types';
	import Learning from '$components/Learning.svelte';
	import Filter from '$components/Filter.svelte';

	export let data: PageData;

	$: ({ topics, topicId, q, nextCursor, learnings } = data);

	/* DEBUGGING */
	/* console.log('data', data); */
</script>

<Filter {q} {topicId} {topics} />
<hr />
{#each learnings as learning}
	<Learning {...learning} />
{/each}
{#if nextCursor}
	<form method="GET">
		<input name="cursor" type="hidden" value={String(nextCursor)} />
		<button type="submit">Load more</button>
	</form>
{/if}
