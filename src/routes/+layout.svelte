<script>
	import { getStores } from '$app/stores';
	import '../global.css';

	const { page } = getStores();

	import Nav from '../components/Nav.svelte';

	let isClient = false;

	$: pathname = $page?.url?.pathname;

	$: isLarge = pathname.includes('/shop/vintage-electric');
	$: isFullWidth = pathname.includes('/map');

	$: isProduct = pathname.includes('/shop/');

	if (typeof window !== 'undefined') {
		isClient = true;
	}
</script>

<!-- <Nav /> -->

<main class:full-width={isFullWidth}>
	<slot />
</main>

<!-- <GdprBanner cookieName="foo" description="bar" /> -->
<style lang="scss">
	main {
		max-width: 100vw;
		min-height: 100vh;
		background-color: none;
		padding: 0 0 2em;
		margin: 0 auto;
		box-sizing: border-box;
		display: flex;
	}

	.large {
		max-width: 70em;
	}
	.full-width {
		max-width: 100vw;

		:global(post) {
		}
	}

	:global(#cusdis_thread) {
		margin-top: 2em;
		max-width: 56em;
		margin: auto;
	}
</style>
