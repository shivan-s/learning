<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { loading } from '$lib/stores';
	import { enhance } from '$app/forms';
	import Learning from '$components/Learning.svelte';

	export let data: PageData;
	export let form: ActionData;

	$: ({ randomLearning, learningsCount } = data);

	if (form?.randomLearning) {
		randomLearning = form.randomLearning;
	}

	/* DEBUGGING */
	console.log('form', form);
	console.log('data', data);
</script>

{#if randomLearning}
	<form
		method="POST"
		action="?/randomLearning"
		use:enhance={() => {
			loading.set(true);
			return async ({ update }) => {
				await update();
				loading.set(false);
			};
		}}
	>
		<button type="submit" disabled={$loading}>Draw</button> from
		{learningsCount === 1 ? `${learningsCount} learning.` : `${learningsCount - 1} learnings.`}
	</form>
	<hr />
	<Learning learning={randomLearning} />
{:else}
	<p style="text-align: center">
		No learnings. Please <a href="/auth/create/">create</a> some learnings to share.
	</p>
{/if}
