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
<table>
	<thead
		><tr><th scope="col">Date</th><th scope="col">Topic</th><th scope="col">Learning</th></tr>
	</thead>
	<tbody>
		{#if learnings}
			{#each learnings as { createdAt, topic, content }}
				<tr in:fade
					><td>{new Date(createdAt).toLocaleDateString()}</td><td>{topic}</td><td>{content}</td></tr
				>
			{/each}
		{:else}
			Loading...
		{/if}
	</tbody>
</table>

<style>
	form {
		margin: 0;
		padding: 0;
	}
</style>
