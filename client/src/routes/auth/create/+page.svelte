<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import { fade } from 'svelte/transition';

	export let data: PageData;
	export let form: ActionData;

	let loading = false;

	$: ({ learnings, topics } = data);

	console.log(data);
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
		><tr><th scope="col">Date</th><th scope="col">Topic</th><th scope="col">Learning</th></tr>
	</thead>
	<tbody>
		{#each learnings as { learningId, createdAt, topic, topicId, content }}
			<tr
				in:fade
				class={form?.requestEditLearning?.learningId === learningId ? 'visible' : 'hidden'}
			>
				<td>{new Date(createdAt).toLocaleDateString()}</td><td>
					<form id="updateLearning" action="?/updateLearning" method="POST" />
					<label>
						<select name="topicId" value={topicId}>
							{#each topics as { name, id }}
								<option value={id}>{name}</option>
							{/each}
						</select>
					</label>
				</td><td class="content">
					<label>
						<textarea name="content" value={content} />
					</label>
					<button type="submit" formaction="updateLearning">Save</button>
					<button>Reset</button>
				</td>
			</tr>
			<tr
				in:fade
				class={form?.requestEditLearning?.learningId === learningId ? 'hidden' : 'visible'}
				><td>{new Date(createdAt).toLocaleDateString()}</td><td>{topic}</td><td
					><div class="content">
						<p>{content}</p>
						<form method="POST" action="?/requestEdit">
							<input value={learningId} type="hidden" name="learningId" />
							<button class="edit" type="submit">Edit</button>
						</form>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

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
	tr:hover .edit {
		visibility: visible;
	}
	td.content {
		display: flex;
		flex-direction: row;
	}
</style>
