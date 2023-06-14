<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import YoutubeVideo from '../components/YoutubeVideo.svelte';
	import InstagramIcon from '../icons/InstagramIcon.svelte';
	import MailIcon from '../icons/MailIcon.svelte';
	import { loading, t } from '../lib/translations';

	export let data;
</script>

<SvelteSeo
	title="Marbella Music Lab"
	description="Jamming since 2022"
	openGraph={{
		title: 'Marbella Music Lab',
		description: 'Jamming since 2022',
		url: `https://unclejohnsband.xyz`,
		type: 'website',
		images: [
			{
				url: '/og.webp',
				width: 850,
				height: 650,
				alt: 'band'
			}
		]
	}}
/>

{#if $loading}
	<p>wait</p>
{:else}
	<container>
		<div class="nav">
			<img class="logo" src="/logo-transparent.png" />
			<div class="title">
				<!-- <h1>una iniciativa de los músicos locales de Marbella</h1> -->
				<!-- <p>{$t('home.subtitle')}</p> -->
			</div>
			<div class="language">
				<a href="?lang=en"> EN </a>
				<p>/</p>
				<a href="?lang=es">ES</a>
			</div>
			<menu>
				<item><a href="/events">Eventos</a> </item>
				<item>
					<a href="/map">Mapa</a>
				</item>
				<item>
					<a href="mailto:marbellamusiclab@@gmail.com">Contacto</a>
				</item>
			</menu>

			<a class="instagram" href="https://instagram.com/marbellamusiclab">
				<span>
					<div class="instagram-icon">
						<InstagramIcon />
					</div>
				</span>
			</a>
		</div>
	</container>
{/if}

<style lang="scss">
	container {
		display: flex;
		height: 100%;
		width: 100%;
		margin: auto;
	}

	h1 {
		text-align: center;
	}
	p {
		margin: 0;
	}

	.logo {
		max-width: 500px;
		margin: auto;
	}
	.nav {
		align-self: center;
		justify-content: center;
		margin: auto;
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

	.instagram {
		margin-top: 4em;
		align-self: center;
	}

	.instagram-icon {
		font-size: 3em;
		color: grey;
	}
</style>
