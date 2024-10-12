<script lang="ts">
	import fromNow from '$lib/utils/fromNow';

	export let createdAt: string;
	export let topic: string;
	export let content: string;
</script>

<div>
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
	<p>{content}</p>
</div>
<hr />
