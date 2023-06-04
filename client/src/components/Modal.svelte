<script lang="ts">
	export let show = true;

	const handleClose = () => (show = false);
</script>

{#if show}
	<div on:click={handleClose} on:keydown={handleClose} class="background">
		<div class="container">
			<slot />
		</div>
	</div>
{/if}

<style>
	.background {
		display: flex;
		position: absolute;
		top: 0;
		left: 0;
		justify-content: center;
		align-items: center;
		min-width: 100vw;
		min-height: 100vh;
		backdrop-filter: blur(1em);
		z-index: 2;
	}

	.container {
		position: relative;
		z-index: 3;
	}
</style>
