<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { learnings } = data;
</script>

<h1>Learning</h1>
<table>
	<thead
		><tr><th scope="col">Date</th><th scope="col">Topic</th><th scope="col">Learning</th></tr
		></thead
	>
	<tbody>
		{#each learnings as { createdAt, topic, content }}
			<tr><td>{new Date(createdAt).toLocaleDateString()}</td><td>{topic}</td><td>{content}</td></tr>
		{/each}
	</tbody>
</table>
