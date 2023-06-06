<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import { fade } from 'svelte/transition';

	export let data: PageData;
	export let form: ActionData;

	let loading = false;

	let content = form?.content ?? '';

	$: ({ learnings, topics, totalChar } = data);

	console.log(data);
	console.log(form);
</script>

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
	<label style="position: relative">
		<textarea
			on:change={({ target }) => (content = target.value)}
			name="content"
			bind:value={content}
		/>
		<p style="position: absolute; bottom: 0px; right: 0px; padding: 0.5em 0.25em;">
			({content.length}/{totalChar})
		</p>
	</label>
	<button type="submit" disabled={loading}>Create</button>
</form>
{#if form?.error}
	<p class="error-message">{form.error}</p>
{/if}
<div>
	{#each learnings as { learningId, createdAt, updatedAt, deletedAt, topic, topicId, content }}
		<div
			in:fade
			class={form?.requestEditLearning?.learningId === learningId ? 'visible' : 'hidden'}
		>
			<p>
				{new Date(createdAt).toLocaleDateString()}
				{createdAt != updatedAt && `Updated ${new Date(updatedAt).toLocaleDateString()}`}
			</p>
			<div>
				<form action="?/update" method="POST">
					<input value={learningId} type="hidden" name="learningId" />
					<label>
						<select name="topicId" value={topicId}>
							{#each topics as { name, id }}
								<option value={id}>{name}</option>
							{/each}
						</select>
					</label>
					<label>
						<textarea name="content" value={content} />
					</label>
					<div class="button-group">
						<button type="submit">Save</button>
						<button type="submit" formaction="?/resetEdit">Reset</button>
						<button class="btn-danger" type="submit" formaction="?/delete">Delete</button>
					</div>
				</form>
			</div>
		</div>
		<div
			in:fade
			class="{form?.requestEditLearning?.learningId === learningId
				? 'hidden'
				: 'visible'} learning {deletedAt && 'deleted'}
      "
		>
			<p>{new Date(createdAt).toLocaleDateString()}</p>
			<strong>{topic}</strong>
			<div>
				<p>{content}</p>
				{#if deletedAt}
					<form method="POST" action="?/undelete">
						<input value={learningId} type="hidden" name="learningId" />
						<button class="edit btn-success" type="submit">Restore</button>
					</form>
				{:else}
					<form method="POST" action="?/requestEdit">
						<input value={learningId} type="hidden" name="learningId" />
						<button class="edit" type="submit">Edit</button>
					</form>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.visible {
		display: block;
	}
	.hidden {
		display: none;
	}
	.edit {
		visibility: hidden;
	}
	.learning:hover .edit {
		visibility: visible;
	}
	.deleted {
		color: lightgray;
	}
	.deleted:hover {
		color: darkgray;
	}
	form {
		min-width: 100%;
		display: flex;
		flex-direction: column;
	}
	.button-group {
		display: flex;
		flex-direction: row;
		gap: 0.25em;
	}
</style>
