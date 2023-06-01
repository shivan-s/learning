<script lang="ts">
	export let data;

	const { entries } = data;
</script>

<h1>Learning</h1>
<table>
	<thead
		><tr><th scope="col">Date</th><th scope="col">Type</th><th scope="col">Content</th></tr></thead
	>
	<tbody>
		{#each entries as { date, type, content }}
			<tr><td>{new Date(date).toLocaleDateString()}</td><td>{type}</td><td>{content}</td></tr>
		{/each}
	</tbody>
</table>
