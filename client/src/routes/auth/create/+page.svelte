<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import { fade } from 'svelte/transition';
	import { loading } from '$lib/stores';

	export let data: PageData;
	export let form: ActionData;

	let content = form?.content ?? '';

	$: ({ learnings, topics, totalChar } = data);

	console.log(data);
	console.log(form);
</script>

<form
	action="?/create"
	method="POST"
	use:enhance={() => {
		loading.set(true);
		return async ({ update }) => {
			await update();
			loading.set(false);
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
		<textarea name="content" bind:value={content} class={form?.error && 'error'} />
		<p style="position: absolute; bottom: 0px; right: 0px; padding: 0.5rem 0.25rem;">
			({content.length}/{totalChar})
		</p>
	</label>
	<button type="submit" disabled={$loading}>Create</button>
</form>
<hr style="border-top: 1px solid gray" />
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
				<form
					action="?/update"
					method="POST"
					use:enhance={() => {
						loading.set(true);
						return async ({ update }) => {
							await update();
							loading.set(false);
						};
					}}
				>
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
						<button type="submit" disabled={$loading}>Save</button>
						<button type="submit" formaction="?/resetEdit" disabled={$loading}>Reset</button>
						<button class="btn-danger" type="submit" formaction="?/delete" disabled={$loading}
							>Delete</button
						>
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
					<form
						method="POST"
						action="?/undelete"
						use:enhance={() => {
							loading.set(true);
							return async ({ update }) => {
								await update();
								loading.set(false);
							};
						}}
					>
						<input value={learningId} type="hidden" name="learningId" />
						<button class="edit btn-success" type="submit" disabled={$loading}>Restore</button>
					</form>
				{:else}
					<form
						method="POST"
						action="?/requestEdit"
						use:enhance={() => {
							loading.set(true);
							return async ({ update }) => {
								await update();
								loading.set(false);
							};
						}}
					>
						<input value={learningId} type="hidden" name="learningId" />
						<button class="edit" type="submit" disabled={$loading}>Edit</button>
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
		gap: 0.25rem;
	}
	.button-group {
		display: flex;
		flex-direction: row;
		gap: 0.25rem;
	}
</style>
