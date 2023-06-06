<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	const { searchParams } = $page.url;
	const q = searchParams.get('q');
	const topicId = searchParams.get('topicId');

	export let data: PageData;
	$: ({ learnings, topics } = data);
</script>

<form method="GET">
	<select name="topic" value={topicId}>
		<option value={null}>All</option>
		{#each topics as { id, name }}
			<option value={String(id)}>{name}</option>
		{/each}
	</select>
	<input type="text" name="q" value={q ?? ''} />
	<button type="submit">Search</button>
</form>
{#each learnings as { createdAt, topic, content }}
	<div in:fade>
		<p>{new Date(createdAt).toLocaleDateString()}</p>
		<p><strong>{topic}</strong></p>
		<p>{content}</p>
	</div>
{/each}
