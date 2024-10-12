<script lang="ts">
	import fromNow from '$lib/utils/fromNow';

	export let createdAt: string;
	export let topic: string;
	export let content: string;
</script>

<div style="background-color: var(--secondary-color); border-radius: 0.25rem; padding: 1rem;">
	<p><strong>{topic}</strong></p>
	<p
		title={`${new Date(createdAt).toLocaleTimeString('en-NZ')}, ${new Date(
			createdAt
		).toLocaleDateString('en-NZ', {
			month: 'short',
			day: '2-digit',
			year: 'numeric'
		})}`}
	>
		<i>{fromNow(new Date(createdAt))}</i>
	</p>
	<p style="word-break: break-word; white-space: break-spaces">{content}</p>
</div>
<hr />
