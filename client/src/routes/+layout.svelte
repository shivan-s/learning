<script>
	import { fade } from 'svelte/transition';
</script>

<svelte:head><title>Shivan's Learning</title></svelte:head>

<header>
	<h1><a href="/">Learning</a></h1>
	<a data-sveltekit-reload href="/auth/create">Create</a>
</header>
<main transition:fade>
	<slot />
</main>
<footer />

<style>
	:global(:root) {
		--primary-color: whitesmoke;
		--secondary-color: dimgrey;
		--text-color: black;
		--text-accent-color: darkgray;
		--danger-text: firebrick;
		--danger-color: lightpink;
		--success-text: darkgreen;
		--success-color: darkseagreen;
	}

	:global(:root[dark-theme='dark']) {
		--primary-color: slategrey;
		--secondary-color: ghostwhite;
		--text-color: whitesmoke;
		--text-accent-color: lightcyan;
		--danger-text: lightpink;
		--danger-color: firebrick;
		--success-text: darkseagreen;
		--success-color: darkgreek;
	}
	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}
	:global(*) {
		margin: 0;
		border: 0px solid red;
	}
	:global(html, body) {
		height: 100%;
	}
	:global(body) {
		display: flex;
		flex-direction: column;
		align-items: center;
		line-height: 1.5;
		background: var(--primary-color);
		font-family: 'Ubuntu Mono', monospace;
		color: var(--text-color);
		-webkit-font-smoothing: antialiased;
	}
	:global(img, picture, video, canvas, svg) {
		display: block;
		max-width: 100%;
	}
	:global(input, button, textarea, select) {
		padding: 0.25rem 0.5rem;
		border-radius: 0.125rem;
		font: inherit;
		width: fit-content;
	}

	:global(textarea) {
		width: 100%;
		resize: none;
		height: 8rem;
	}

	:global(button) {
		cursor: pointer;
	}
	:global(p, h1, h2, h3, h4, h5, h6) {
		overflow-wrap: break-word;
	}
	:global(a) {
		text-decoration: none;
		color: var(--text-accent-color);
	}
	:global(a:hover) {
		text-decoration: underline;
	}
	:global(ul) {
		list-style: none;
		text-indent: -1rem;
	}
	:global(li::before) {
		content: '✽ ';
		color: var(--secondary-color);
	}
	:global(h1 a) {
		text-decoration: none;
		color: var(--text-color);
	}
	:global(.flex) {
		display: flex;
	}
	:global(.wrap) {
		flex-wrap: wrap;
	}
	:global(.row) {
		flex-direction: row;
	}
	:global(.col) {
		flex-direction: column;
	}
	:global(.center) {
		align-items: center;
	}
	:global(.sp-bwtn) {
		justify-content: space-between;
	}
	:global(.icon) {
		width: 12rem;
		height: 8rem;
	}
	:global(.display-box) {
		display: flex;
		flex-direction: columns;
		padding: 1rem;
		background: var(--primary-color);
		flex-direction: column;
		border-radius: 0.5rem;
	}
	:global(.btn-danger) {
		background-color: var(--danger-color);
		color: var(--danger-text);
	}
	:global(.btn-danger:hover) {
		filter: brightness(120%);
	}
	:global(.btn-success) {
		background-color: var(--success-color);
		color: var(--success-text);
	}
	:global(.btn-success:hover) {
		filter: brightness(120%);
	}
	:global(.animate-content) {
		animation-duration: 0.5s;
		animation-name: animate-fade;
		animation-fill-mode: backwards;
	}
	:global(.error) {
		border: 2px solid var(--danger-color);
	}
	:global(.error-message) {
		color: var(--danger-text);
	}
	main {
		display: flex;
		flex-direction: column;
		padding-right: 6rem;
		padding-left: 6rem;
		padding-top: 2rem;
		min-width: 768px;
		max-width: 768px;
		gap: 1rem;
	}
	@media only screen and (max-width: 1536px) {
		main {
			padding-right: 6rem;
			padding-left: 6rem;
		}
	}
	@media only screen and (max-width: 1280px) {
		main {
			padding-right: 5rem;
			padding-left: 5rem;
		}
	}
	@media only screen and (max-width: 1024px) {
		main {
			padding-right: 4rem;
			padding-left: 4rem;
		}
	}
	@media only screen and (max-width: 768px) {
		main {
			padding-right: 2rem;
			padding-left: 2rem;
			min-width: 100%;
		}
	}
	@media only screen and (max-width: 640px) {
		main {
			padding-right: 0.5rem;
			padding-left: 0.5rem;
		}
	}
	header {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	@keyframes -global-animate-fade {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
