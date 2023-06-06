<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ learnings } = data);
</script>

<!-- TODO: implement search -->
<div class="flex">
	<form method="GET">
		<input type="text" name="q" value={$page.url.searchParams.get('q') ?? ''} />
		<button type="submit">Search</button>
	</form>
	<a href="/auth/create">Create</a>
</div>
{#each learnings as { createdAt, topic, content }}
	<div in:fade>
		<p>{new Date(createdAt).toLocaleDateString()}</p>
		<p><strong>{topic}</strong></p>
		<p>{content}</p>
	</div>
{/each}
