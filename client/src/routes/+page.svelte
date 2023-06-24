<script lang="ts">
	import type { PageData } from './$types';
	import Learning from '$components/Learning.svelte';

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
	<p>
		from {learningsCount?.count === 1
			? `${learningsCount.count} learning.`
			: `${learningsCount.count - 1} learnings.`}
	</p>
</div>
<hr />
{#if randomLearning}
	<Learning {...randomLearning} />
{:else}
	<p>No Learnings!</p>
{/if}
