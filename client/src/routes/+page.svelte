<script lang="ts">
	import type { PageData } from './$types';
	import Learning from '$components/Learning.svelte';
	import Loading from '$components/Loading.svelte';
	import Error from '$components/Error.svelte';

	export let data: PageData;

	$: ({ randomLearning, learningsCount } = data);

	/* DEBUGGING */
	/* console.log('form', form); */
	/* console.log('data', data); */
</script>

<div class="flex center">
	<form method="GET" data-sveltekit-reload>
		<button type="submit">Draw</button>
	</form>
	{#await learningsCount}
		<Loading />
	{:then { count }}
		<p>from {count === 1 ? `${count} learning.` : `${count - 1} learnings.`}</p>
	{:catch error}
		<Error {error} />
	{/await}
</div>
<hr />
{#await randomLearning}
	<Loading />
{:then randomLearning}
	<Learning learning={randomLearning} />
{:catch error}
	<Error {error} />
{/await}
