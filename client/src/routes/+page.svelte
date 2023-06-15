<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { loading } from '$lib/stores';
	import { enhance } from '$app/forms';

	export let data: PageData;
	export let form: ActionData;
	$: ({ learnings, topics, topicId, q, randomLearning, nextCursor, learningsTotal } = data);

	if (form?.randomLearning) {
		randomLearning = form.randomLearning;
	}

	console.log(data);
	console.log(form);
</script>

{#if randomLearning}
	<div style="min-height: 10rem">
		<p>{new Date(randomLearning.createdAt).toLocaleDateString()}</p>
		<p><strong>{randomLearning.topic}</strong></p>
		<p>{randomLearning.content}</p>
	</div>
	<form
		method="POST"
		action="?/randomLearning"
		use:enhance={() => {
			loading.set(true);
			return async ({ update }) => {
				await update();
				loading.set(false);
			};
		}}
	>
		<button type="submit" disabled={$loading}>Generate</button>
	</form>
	<hr style="border-top: 1px solid gray" />
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
	{#each learnings as { createdAt, topic, content }}
		<div>
			<p>{new Date(createdAt).toLocaleDateString()}</p>
			<p><strong>{topic}</strong></p>
			<p>{content}</p>
		</div>
	{/each}
	<form method="GET">
		<input name="cursor" type="hidden" value={nextCursor} />
		<button type="submit">Load more</button>
	</form>
{:else}
	<p style="text-align: center">
		No learnings. Please <a href="/auth/create/">create</a> some learnings to share.
	</p>
{/if}
