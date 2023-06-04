<script lang="ts">
	import { enhance } from '$app/forms';
	import Modal from '$components/Modal.svelte';
	import type { ActionData, PageData } from './$types';
	import { fade } from 'svelte/transition';

	export let data: PageData;
	export let form: ActionData;

	let loading = false;

	if (form?.newLearning) {
		data.learnings.splice(0, 0);
	}

	$: ({ learnings, topics } = data);
</script>

{#if form?.requestEdit}
	<Modal show={true}>Test</Modal>
{/if}

<form
	action="?/create"
	method="POST"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	}}
>
	<label>
		<select name="topicId" value={form?.topicId ?? topics[0].id}>
			{#each topics as { name, id }}
				<option value={id}>{name}</option>
			{/each}
		</select>
	</label>
	<label>
		<textarea name="content" value={String(form?.content ?? '')} />
	</label>
	<button type="submit" disabled={loading}>Create</button>
</form>
{#if form?.error}
	<p class="error-message">{form.error}</p>
{/if}
<table>
	<thead
		><tr
			><th scope="col">Date</th><th scope="col">Topic</th><th scope="col" colspan="2">Learning</th
			></tr
		>
	</thead>
	<tbody>
		{#each learnings as { learningId, createdAt, topic, content }, order}
			<tr transition:fade
				><td>{new Date(createdAt).toLocaleDateString()}</td><td>{topic}</td><td class="content"
					><p>{content}</p>
					<div class="edit">
						<form id="requestEdit" method="POST" action="?/requestEdit" />
						<input form="requestEdit" type="hidden" value={learningId} />
						<input form="requestEdit" type="hidden" value={order} />
						<button formaction="requestEdit">Edit</button>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.edit {
		visibility: hidden;
	}
	tr:hover .edit {
		visibility: visible;
	}
	td.content {
		display: flex;
		flex-direction: row;
	}
</style>
