<script>
	import { onMount } from 'svelte';
	import { getStores } from '$app/stores';
	const { page } = getStores();

	$: pathname = $page?.url?.pathname;
</script>

<nav>
	<menu>
		<item>
			<a aria-current={pathname === '/' ? 'page' : undefined} href="/">home</a>
		</item>
		<item>
			<a aria-current={pathname?.includes('/events') ? 'page' : undefined} href="/events">eventos</a
			>
		</item>

		<item>
			<a aria-current={pathname?.includes('/map') ? 'page' : undefined} href="/map" rel="prefetch"
				>mapa</a
			>
		</item>

		<item>
			<a href="/mailto:marbellamusiclab@@gmail.com">contacto</a>
		</item>
	</menu>
</nav>

<style lang="scss">
	
	nav {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	.language {
		display: flex;
		justify-content: center;
	}

	menu {
		justify-content: center;
		font-size: large;
		display: flex;
		gap: 2em;
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

</style>
