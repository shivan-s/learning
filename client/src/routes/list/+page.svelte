<script lang="ts">
	import type { PageData } from './$types';
	import { loading } from '$lib/stores';
	import Learning from '$components/Learning.svelte';

	export let data: PageData;

	$: ({ topics, topicId, q, nextCursor, learnings } = data);

	/* DEBUGGING */
	/* console.log('data', data); */
</script>

<form method="GET">
	<select name="topic" value={topicId ?? '-1'}>
		<option value="-1">All</option>
		{#each topics as { id, name }}
			<option value={String(id)}>{name}</option>
		{/each}
	</select>
	<input type="text" name="q" value={q ?? ''} />
	<button type="submit" disabled={$loading}>Search</button>
</form>
<hr />
{#each learnings as learning}
	<Learning {learning} />
{/each}
{#if nextCursor}
	<form method="GET">
		<input name="cursor" type="hidden" value={String(nextCursor)} />
		<button type="submit">Load more</button>
	</form>
{/if}
