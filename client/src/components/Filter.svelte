<script lang="ts">
	import { loading } from '$lib/stores';

	export let topics: { id: number; name: string }[];
	export let topicId: string | null;
	export let q: string | null;
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
