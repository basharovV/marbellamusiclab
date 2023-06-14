<script>
	import { onMount } from 'svelte';
	import { getStores } from '$app/stores';
	const { page } = getStores();

	$: pathname = $page?.url?.pathname;
</script>

<nav>
	{#if pathname !== '/music'}
		<a class="logo" href="/"><img alt="Logo" src="/logo.svg" /></a>
	{/if}
	<div>
		<ul>
			<li>
				<a aria-current={pathname === '/' ? 'page' : undefined} href="/">home</a>
			</li>
			<li>
				<a aria-current={pathname?.includes('/dev') ? 'page' : undefined} href="/dev">gigs</a>
			</li>

			<li>
				<a
					rel="prefetch"
					aria-current={pathname?.includes('/blog') ? 'page' : undefined}
					href="/blog">updates</a
				>
			</li>

			<li>
				<a
					aria-current={pathname?.includes('/music') ? 'page' : undefined}
					href="/music"
					rel="prefetch">music</a
				>
			</li>

			<li>
				<a
					rel="prefetch"
					aria-current={pathname?.includes('/shop') ? 'page' : undefined}
					href="/shop">shop</a
				>
			</li>
		</ul>
	</div>
</nav>

<style lang="scss">
	:global(body) {
		transition: background-color cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.3s;
		// transition: color cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.3s;
	}

	.theme-toggle {
		opacity: 0.7;
		svg {
			&:hover {
				transform: scale(1.2);
				cursor: pointer;
			}
		}
	}
	nav {
		/* border-bottom: 1px solid rgba(74, 74, 74, 0.1); */
		font-weight: 300;
		padding: 0;
		display: flex;
		justify-content: center;
		position: relative;
		> div {
			max-width: 400px;
			width: 100%;
			display: inline-flex;
		}
		@media only screen and (max-width: 500px) {
			border-bottom: 1px solid rgba(74, 74, 74, 0.1);
		}
	}

	ul {
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: center;
		justify-content: space-around;
		width: 100%;
		@media only screen and (max-width: 522px) {
			/* min-width: 0px;
      width: 100%; */
		}
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
		position: relative;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
		opacity: 1;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255, 62, 0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		opacity: 0.8;
		display: block;

		&:hover {
			font-weight: bold;
			opacity: 1;
		}
	}
	:global(.dark-mode) img {
		filter: invert(1);
	}

	.logo {
		position: absolute;
		top: 0;
		left: 10px;
		width: 30px;
		bottom: 0;

		@media only screen and (max-width: 500px) {
			display: none;
		}
	}
</style>
