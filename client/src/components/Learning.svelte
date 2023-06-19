<script lang="ts">
	import fromNow from '$lib/utils/fromNow';

	export let learning: {
		createdAt: Date;
		updatedAt: Date;
		topic: string;
		content: string;
	};

	const { topic, createdAt, content } = learning;
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
