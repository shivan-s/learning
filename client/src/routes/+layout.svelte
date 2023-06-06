<svelte:head><title>Shivan's Learning</title></svelte:head>

<header>
	<h1><a href="/">Learning</a></h1>
</header>
<main>
	<slot />
</main>
<footer />

<style>
	:global(:root) {
		--primary-color: whitesmoke;
		--secondary-color: ;
		--text-color: black;
		--text-accent-color: darkgray;
		--danger-text: firebrick;
		--danger-color: lightpink;
	}

	:global(:root[dark-theme='dark']) {
		--primary-color: slategrey;
		--secondary-color: ;
		--text-color: whitesmoke;
		--text-accent-color: lightcyan;
		--danger-text: lightpink;
		--danger-color: firebrick;
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
		font: inherit;
		width: fit-content;
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
	:global(strong) {
		color: var(--secondary-color);
	}
	:global(ul) {
		list-style: none;
		text-indent: -1em;
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
		width: 12em;
		height: 8em;
	}
	:global(.display-box) {
		display: flex;
		flex-direction: columns;
		padding: 1em;
		background: var(--primary-color);
		flex-direction: column;
		border-radius: 0.5em;
	}

	:global(.btn-danger) {
		background-color: var(--danger-color);
		color: var(--danger-text);
	}

	:global(.animate-content) {
		animation-duration: 0.5s;
		animation-name: animate-fade;
		animation-fill-mode: backwards;
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
