<script lang="ts">
	import type { PageData } from './$types';
	import Learning from '$components/Learning.svelte';
	import Filter from '$components/Filter.svelte';

	export let data: PageData;
</script>

<Filter q={data.q} topicId={data.topicId} topics={data.topics} />
<hr />
<form id="search" method="GET" data-sveltekit-noscroll>
	<input type="hidden" name="q" value={data.q ?? ''} />
	<input type="hidden" name="topic" value={data.topicId ?? '-1'} />
</form>
<div class="flex" style="justify-content: space-between">
	<button
		form="search"
		name="cursor"
		value={data.previousCursor?.toString()}
		disabled={data.previousCursor === undefined}>Previous</button
	>
	<button
		form="search"
		name="cursor"
		value={data.nextCursor?.toString()}
		disabled={data.nextCursor === undefined}>Next</button
	>
</div>
<hr />
{#each data.learnings as learning}
	<Learning {...learning} />
{/each}
<div class="flex" style="justify-content: space-between">
	<button
		form="search"
		name="cursor"
		value={data.previousCursor?.toString()}
		disabled={data.previousCursor === undefined}>Previous</button
	>
	<button
		form="search"
		name="cursor"
		value={data.nextCursor?.toString()}
		disabled={data.nextCursor === undefined}>Next</button
	>
</div>
