<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { learnings } = data;
</script>

<!-- TODO: implement search -->
<div class="flex">
	<form id="search" action="?/search" method="GET" />
	<input form="search" type="text" name="q" />
	<button formaction="search" type="submit">Search</button>
	<a href="/auth/create">Create</a>
</div>
<table>
	<thead
		><tr><th scope="col">Date</th><th scope="col">Topic</th><th scope="col">Learning</th></tr>
	</thead>
	<tbody>
		{#if learnings}
			{#each learnings as { createdAt, topic, content }}
				<tr
					><td>{new Date(createdAt).toLocaleDateString()}</td><td>{topic}</td><td>{content}</td></tr
				>
			{/each}
		{:else}
			Loading...
		{/if}
	</tbody>
</table>
