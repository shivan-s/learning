<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { loading } from '$lib/stores';
	import Learning from '$components/Learning.svelte';

	export let data: PageData;
	export let form: ActionData;
	$: ({ topics, topicId, q, learningsCount } = data);

	const learningsPage: (typeof data.learnings)[] = [];

	learningsPage.push(data.learnings);

	if (form?.learnings) {
		learningsPage.push(form.learnings);
	}

	/* DEBUGGING */
	console.log('data', data);
	console.log('form', form);
	console.log('learningPage', learningsPage);
</script>

{#if learningsCount > 1}
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
	{#each learningsPage as learnings}
		{#each learnings as learning}
			<Learning {learning} />
		{/each}
	{/each}
	<form method="POST" action="?/fetchLearnings">
		<input name="cursor" type="hidden" value={String(form?.nextCursor) || '2'} />
		<button type="submit">Load more</button>
	</form>
{:else}
	<p style="text-align: center">
		No learnings. Please <a href="/auth/create/">create</a> some learnings to share.
	</p>
{/if}
