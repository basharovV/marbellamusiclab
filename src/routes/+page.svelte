<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import YoutubeVideo from '../components/YoutubeVideo.svelte';
	import InstagramIcon from '../icons/InstagramIcon.svelte';
	import MailIcon from '../icons/MailIcon.svelte';
	import { loading, t } from '../lib/translations';

	export let data;
</script>

<SvelteSeo
	title="Uncle John's Band"
	description="Jamming since 2022"
	openGraph={{
		title: "Uncle John's Band",
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
			<div class="title">
				<h1>Uncle John's Band</h1>
				<!-- <p>{$t('home.subtitle')}</p> -->
			</div>
			<div class="language">
				<a href="?lang=en"> EN </a>
				<p>/</p>
				<a href="?lang=es">ES</a>
			</div>
		</div>

		<div class="date-container">
			<div class="line" />
			<small class="date">{data.today}</small>
			<div class="line" />
		</div>

		<div class="sections">
			<div class="grid">
				<!-- <img class="img-1" src="band-media/calling.webp" /> -->

				<div class="bio">
					<h3>
						❂ {$t('home.bio.title')}
					</h3>
					<p><b> {$t('home.bio.body')} </b></p>
					<small><b> {$t('home.bio.small')} </b></small>
				</div>

				<div class="video big">
					<YoutubeVideo
						videoId="HQkky9tImHY"
						platform="yt"
						thumbnail={data.videos['HQkky9tImHY']?.thumbnail}
						title={data.videos['HQkky9tImHY']?.title}
					/>
				</div>

				<div class="text-divider">
					<p>There's a problem out there, somewhere</p>
					<div class="page-divider" />
					<p>And we pretend like it just don't exist</p>
					<div class="page-divider" />
					<p>You know exactly what I'm talking about</p>
					<div class="page-divider" />
					<p>I'm talking about this</p>
				</div>

				<div class="video">
					<YoutubeVideo
						videoId="F3K6e8yN_pg"
						platform="yt"
						thumbnail={data.videos['F3K6e8yN_pg']?.thumbnail}
						title={data.videos['F3K6e8yN_pg']?.title}
					/>
				</div>
				<!-- <video
					src="band-media/walking-in-ragtime-outro.mp4#t=0.01"
					preload="metadata"
					controls
					poster="/band-media/calling.webp"
					async
				/> -->
				<!-- <img class="img-2" src="band-media/flower-power.webp" /> -->

				<div class="video">
					<YoutubeVideo
						videoId="MjXHpK2UzSU"
						platform="yt"
						thumbnail={data.videos['MjXHpK2UzSU']?.thumbnail}
						title={data.videos['MjXHpK2UzSU']?.title}
					/>
				</div>

				<!-- <div class="video">
					<YoutubeVideo
						videoId="25GFtCvNC_4"
						platform="yt"
						thumbnail={data.videos['25GFtCvNC_4']?.thumbnail}
						title={data.videos['25GFtCvNC_4']?.title}
					/>
				</div> -->
				<!-- <img class="img-3" src="band-media/studio-1.webp" /> -->

				<div class="text-divider">
					<p>people come, people go</p>
					<div class="page-divider" />
					<p>people laugh, people cry</p>
					<div class="page-divider" />
					<p>sometimes they look at each other</p>
					<div class="page-divider" />
					<p>and not know what to say</p>
				</div>

				<section class="dates">
					<h2><span>✼</span> {$t('home.shows.title')}</h2>
					<table>
						<th>{$t('home.shows.date')}</th>
						<th>{$t('home.shows.location')}</th>
						<th>{$t('home.shows.tickets')}</th>
						{#each data.shows as show}
							<tr>
								<td class="show-date" class:passed={show.passed}>{show.date}</td>
								<td>
									{#if show.link}
										<a href={show.link}>{show.location}</a>
									{:else}
										{show.location}
									{/if}
									{#if show.description}
										<br />
										<small class="description">{show.description}</small>
									{/if}
								</td>
								<td>
									{#if show.link}
										<a href={show.link}>{show.tickets}</a>
									{:else}
										{show.tickets}
									{/if}
								</td>
							</tr>
						{/each}
					</table>
				</section>

				<section class="contact">
					<a href="mailto:contact@elpatorecords.com">
						<span>
							<div class="mail-icon">
								<MailIcon />
							</div>
							<p>contact@elpatorecords.com</p>
						</span>
					</a>

					<a href="https://instagram.com/unclejohns.band">
						<span>
							<div class="instagram-icon">
								<InstagramIcon />
							</div>
							unclejohns.band
						</span>
					</a>
					<br />
				</section>

				<div class="video">
					<YoutubeVideo
						videoId="LXFqTxhzIf0"
						platform="yt"
						thumbnail={data.videos['LXFqTxhzIf0']?.thumbnail}
						title={data.videos['LXFqTxhzIf0']?.title}
					/>
				</div>
				<div class="video">
					<YoutubeVideo
						videoId="25GFtCvNC_4"
						platform="yt"
						thumbnail={data.videos['25GFtCvNC_4']?.thumbnail}
						title={data.videos['25GFtCvNC_4']?.title}
					/>
				</div>

				<div class="art" />
				<div class="videos-info">
					<h2>{$t('home.rehearsals')}⌟</h2>
				</div>

				<div class="video small">
					<YoutubeVideo
						videoId="xddr-mpKC-M"
						platform="yt"
						thumbnail={data.videos['xddr-mpKC-M']?.thumbnail}
						title={data.videos['xddr-mpKC-M']?.title}
					/>
				</div>

				<div class="video small">
					<YoutubeVideo
						videoId="LhrZMKmF0WE"
						platform="yt"
						thumbnail={data.videos['LhrZMKmF0WE']?.thumbnail}
						title={data.videos['LhrZMKmF0WE']?.title}
					/>
				</div>

				<div class="video small">
					<YoutubeVideo
						videoId="3xOD2pT4xBQ"
						platform="yt"
						thumbnail={data.videos['3xOD2pT4xBQ']?.thumbnail}
						title={data.videos['3xOD2pT4xBQ']?.title}
					/>
				</div>

				<div class="video small">
					<YoutubeVideo
						videoId="wemrSTU7fYA"
						platform="yt"
						thumbnail={data.videos['wemrSTU7fYA']?.thumbnail}
						title={data.videos['wemrSTU7fYA']?.title}
					/>
				</div>

				<div class="video small">
					<YoutubeVideo
						videoId="ET1eQCj6LQQ"
						platform="yt"
						thumbnail={data.videos['ET1eQCj6LQQ']?.thumbnail}
						title={data.videos['ET1eQCj6LQQ']?.title}
					/>
				</div>

				<section class="rehearsals">
					<!-- <img src="el-pato-records.png" /> -->
					<a href="https://www.youtube.com/channel/UCy_39NlQINm-Nt_F5vR3deA"
						><h2>☞ {$t('home.elpato.link')}</h2></a
					>
					<h1>+ {$t('home.elpato.description')}</h1>
				</section>



				<div class="text-divider">
					<p>There's a problem out there, somewhere</p>
					<div class="page-divider" />
					<p>And we pretend like it just don't exist</p>
					<div class="page-divider" />
					<p>You know exactly what I'm talking about</p>
					<div class="page-divider" />
					<p>I'm talking about this</p>
				</div>

				<section class="map">
					<!-- <img src="el-pato-records.png" /> -->
					<a href="/map"
						><h2>☞ {$t('home.map.title')}</h2></a
					>
					<p>{$t('home.map.description')}</p>
				</section>

				<div class="text-divider">
					<p>There's a problem out there, somewhere</p>
					<div class="page-divider" />
					<p>And we pretend like it just don't exist</p>
					<div class="page-divider" />
					<p>You know exactly what I'm talking about</p>
					<div class="page-divider" />
					<p>I'm talking about this</p>
				</div>

				
				<section class="members">
					<h1>{$t('home.band.title')}</h1>
					<img src="reaper.png" />
				</section>

				<!-- 
				<section class="poem">
					<small>
						There's people on the streets<br />
						Going about their usual business<br />
						Some of them got permed up hairdos<br />
						And money in their purse<br />
						Others got newspaper hats and<br />
						Half a dime to their name, but<br />
						Beggars and businessmen<br />
						They all do it the same<br />
						Staring 'til their eyes fall out<br />
						From the back of their heads<br />
						Turning as that woman walks by<br />
						The lady all dressed in paint<br />
						<br />
						There's purple in the sky tonight<br />
						And a rain rising from below<br />
						Street sellers singing their trade<br />
						Under burned out broken bulbs<br />
						Symbols of authority<br />
						Hiding beneath their coats<br />
						Pretending not to notice <br />
						The kicks to the cowering drunk, but<br />
						Lawmen and criminals<br />
						They are all too alike<br />
						The instance that womanly saint walks past<br />
						The lady all dressed in paint<br />
						<br />
						There's a problem out there, somewhere<br />
						And we pretend like it just don't exist<br />
						You know exactly what I'm talking about<br />
						I'm talking about this<br />
						These state of affairs we're living<br />
						Bootleg handshakes and ballroom deals<br />
						One night stands with our conciousness<br />
						Meanwhile married to our sins, but<br />
						Greed and gluttony<br />
						Are synonyms at times<br />
						When every fool hungers<br />
						For that lady all dressed in paint<br />
						<br />
						--- Written by Michael Kirkland
					</small>
				</section>
			</div> -->

				<div class="text-divider">
					<p>people come, people go</p>
					<div class="page-divider" />
					<p>people laugh, people cry</p>
					<div class="page-divider" />
					<p>sometimes they look at each other</p>
					<div class="page-divider" />
					<p>and not know what to say</p>
				</div>
			</div>
		</div></container
	>
	<footer>
		<img src="/logo.png" />
		<p>© El Pato Records 2023</p>
	</footer>
{/if}

<style lang="scss">
	@keyframes rotate {
		from {
			transform: rotate(0turn);
		}
		to {
			transform: rotate(-1turn);
		}
	}

	container {
		display: block;
		max-width: 1250px;
		margin: auto;
		padding: 0 3em;
		@media screen and (max-width: 900px) {
			padding: 0 1em;
		}
		@media screen and (max-width: 600px) {
			padding: 0 0em;
		}
	}
	.bg {
		/* position: absolute; */
		top: -20px;
		left: 0;
		right: 0;
		position: relative;
		display: flex;
		margin: auto;
		width: 500px;
		z-index: -1;
		filter: grayscale(0.6);
	}

	.line {
		height: 1px;
		background-color: rgb(77, 70, 70);
		width: 100%;
		margin: 0 1em;
	}

	.text-divider {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		grid-column: 1 / 5;
		color: rgb(35, 33, 33);
		white-space: nowrap;
		gap: 5px;
		transform: rotate(180deg);
		font-size: x-small;
	}

	.page-divider {
		height: 1px;
		background-color: black;
		width: 100%;
	}
	.date-container {
		padding: 0 1em;
		.line {
			margin: 0;
			background-color: rgb(77, 70, 70);
			height: 2px;
		}

		.date {
			width: 100%;
			margin: 0.5em auto;
			display: block;
			font-weight: bold;
			text-align: center;
			@media screen and (max-width: 900px) {
				top: 1.4em;
				right: 0em;
				left: 0em;
			}
		}
	}
	.nav {
		margin: 5em 0em 0;
		color: black;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: left;
		padding: 0;
		height: 100%;
		position: relative;

		.title {
			p {
				margin: 0 0 0.5em 2em;
				opacity: 0.5;
				word-wrap: break-spaces;
				white-space: normal;
			}
			h1 {
				padding: 0;
				font-size: 3em;
			}
		}
		p {
			color: black;
			margin: 0;
			white-space: nowrap;
		}
		@media screen and (max-width: 900px) {
			flex-direction: column;
			margin: 2em 0;
			.title {
				align-self: center;
				margin: 0;
				p {
					max-width: 300px;
					text-align: center;
					margin: 0 auto;
				}
				h1 {
					font-size: 3em;
					margin-block-start: 0;
					margin: 0;
				}
			}
			.line {
				margin: 0 2em;
			}
		}

		@media screen and (max-width: 600px) {
			.title {
				h1 {
					font-size: 2.5em;
					margin-block-start: 0;
					margin: 0.5em 0 0 0;
				}
			}
		}

		.language {
			position: absolute;
			right: 1em;
			display: flex;
			@media screen and (max-width: 900px) {
				position: absolute;
				top: -20px;
				right: 20px;
			}
		}
		/* background-color: rgb(30, 29, 28); */
		/* border: 2px dashed rgba(255, 255, 255, 0.126); */
		h1 {
			margin: 0 0 0 0.5em;
			font-size: 3.3em;
			padding: 10px 0 0 0;
			z-index: 2;
			position: relative;
			white-space: nowrap;
		}
		a {
			font-size: 1.5em;
		}
	}

	.sections {
		color: rgb(59, 5, 5);
		font-size: 1.2em;
		padding: 0 1em;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: auto auto auto auto;
		min-height: inherit;
		position: relative;
		margin: 0.2em 0;
		/* border-left: 1px solid rgb(37, 36, 36);
		border-right: 1px solid rgb(44, 43, 43); */

		@media screen and (max-width: 900px) {
			flex-direction: column;
			width: 100%;
			margin: 0.2em 0em;
		}
		&:after {
			content: "There's purple in the sky tonight - And a rain rising from below";
			transform: rotate(270deg);
			left: -600px;
			top: 400px;
			opacity: 0.7;
			position: absolute;
			@media screen and (max-width: 900px) {
				display: none;
			}
		}
		&:before {
			content: 'Greed and gluttony _ Are synonyms at times _  When every fool hungers  _  For that lady all dressed in paint';
			transform: rotate(90deg);
			right: -600px;
			opacity: 0.7;
			top: 600px;
			position: absolute;

			@media screen and (max-width: 900px) {
				display: none;
			}
		}
	}

	section {
		padding: 1em;
		color: white;
		box-sizing: border-box;
		&:nth-child(even) {
		}

		&.about {
			padding: 0;
		}

		p {
			margin-bottom: 0;
		}
	}
	h2 {
		margin: 0;
	}

	.grid {
		justify-self: flex-end;
		position: relative;
		/* border: 2px solid rgb(228, 227, 221); */
		/* filter: sepia(0.1); */
		grid-column: 1 / 5;
		gap: 5px;
		grid-row: 1;
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		/* grid-template-rows: 180px 1fr auto; */

		grid-template-rows: auto;
		z-index: 1;
		width: 100%;

		@media screen and (max-width: 900px) {
			display: grid;
			grid-template-rows: auto;
			flex-direction: row;
			flex-wrap: wrap;

			> * {
				grid-column: span 8 !important;
				grid-row: auto !important;
			}

			.img-3 {
				display: none;
			}

			section {
				height: fit-content;
			}
		}

		.bio {
			grid-column: span 8;
			padding: 0 0 1em;
			text-align: center;
			margin: 0 auto;
			h3 {
				margin: 1em auto 0;
				font-family: 'Zina';
				font-size: 2em;
				max-width: 600px;
				font-weight: bold;
			}
			p {
				margin: 1em 0 0 0;
				max-width: 700px;
			}
		}

		video {
			grid-column: span 4;
			background-image: url('/dark-tire.png');
			/* background-color: #030202; */
			width: 100%;
			height: 100%;
			mask-border-source: url('/rect-clip.svg');
			mask-border-slice: 10%;
			-webkit-mask-box-image-source: url('/rect-clip.svg');
			@media screen and (max-width: 900px) {
				height: auto;
				flex: 0 1 auto;
			}
		}

		img {
			display: flex;
			position: relative;
			mask-border-source: url('/rect-clip.svg');
			mask-border-slice: 10%;
			-webkit-mask-box-image-source: url('/rect-clip.svg');

			height: 100%;
			@media screen and (max-width: 900px) {
				height: auto;
				flex: 0 1 auto;
			}
		}

		.img-1 {
			grid-row: 1 / 3;
			grid-column: 1;
			object-fit: cover;
			/* filter: grayscale(1); */
		}

		.img-2 {
			grid-row: 1;
			grid-column: 6 / 9;
			object-fit: cover;
		}

		.img-3 {
			grid-row: 2;
			grid-column: 6 / 9;
			object-fit: cover;
		}
		.img-4 {
			grid-column: 2;
			object-fit: cover;
		}
		.dates {
			grid-row: 4;
			grid-column: 1 / 6;
			color: rgb(255, 255, 255);
			transform: rotateZ(0.35deg) rotateX(0.5deg);
			z-index: -1;
			position: relative;
			background-color: #2c2626;
			background-image: url('/dark-tire.png');

			span {
				display: inline-flex;
				margin: 0;
				padding: 0;
				vertical-align: middle;
				line-height: 0.8em;
				animation: rotate 4s infinite reverse linear;
			}
			.show-date {
				font-size: 0.8em;
				white-space: nowrap;
				vertical-align: top;
				@media screen and (max-width: 600px) {
					white-space: normal;
				}
			}
			.description {
				opacity: 0.5;
			}
		}
		.text-divider {
			grid-column: 1 / 9;
			@media screen and (max-width: 900px) {
				display: none;
			}
		}
		.contact {
			grid-row: 4;
			grid-column: 6 / 9;
			color: rgb(244, 235, 235);
			/* background-color: rgb(20, 10, 10); */
			position: relative;

			transform: rotateZ(-0.5deg) rotateX(2deg);
			z-index: -1;
			background-color: rgb(58, 35, 35);
			background-image: url('/dark-tire.png');
			p {
				margin: 0;
			}
			span {
				margin-top: 0.5em;
				display: inline-flex;
				align-items: center;
				gap: 10px;
				div {
					display: inline-flex;
					align-items: center;
					width: fit-content;
					font-size: 2em;
				}
			}
		}
		.videos-info {
			grid-column: span 8;
			display: flex;
			align-items: center;
			justify-content: left;
			color: rgb(44, 38, 38);
			padding: 0;
			/* background-image: url('/dark-tire.png'); */
			width: 100%;
			@keyframes recording {
				0% {
					color: white;
				}
				50% {
					color: red;
				}
				100% {
					color: white;
				}
			}
			h2 {
				width: fit-content;
				margin: 0.5em 0;
				/* color: rgb(123, 106, 106); */
				/* border-bottom: 2px dashed rgb(171, 154, 154); */
				&::before {
					content: '•';
					left: -10px;
					top: 2px;
					position: relative;
					color: red;
					animation: recording 0.95s infinite forwards cubic-bezier(0.075, 0.82, 0.165, 1);
				}
			}
			img {
				margin-top: 1.5em;
				width: 100%;
				height: auto;
				filter: sepia(0.3);
			}
		}
		.video {
			mask-border-source: url('/rect-clip.svg');
			mask-border-slice: 10%;
			-webkit-mask-box-image-source: url('/rect-clip.svg');
			grid-column: span 4;
			height: 100%;

			&:nth-of-type(3) {
				/* grid-column: span 8; */
			}
			&.big {
				grid-column: span 8;
			}

			@media screen and (max-width: 900px) {
				height: auto;
				width: 100%;

				&.big {
					grid-row: 1;
				}
			}
		}

		.video-3 {
			grid-column: span 5;
			height: 100%;
			@media screen and (max-width: 900px) {
				height: auto;
				width: 100%;
			}
		}

		.members {
			grid-column: span 8;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1em;
			padding: 0;
			padding-bottom: 10px;
			color: rgb(244, 235, 235);
			position: relative;
			background-color: rgb(44, 38, 38);
			background-image: url('/dark-tire.png');
			overflow: hidden;

			img {
				height: auto;
				width: auto;
				object-fit: contain;
				max-width: 500px;
			}
			@media screen and (max-width: 900px) {
				width: 100%;
				height: fit-content;
				img {
					height: auto;
					width: 100%;
					object-fit: contain;
				}
			}
			small {
				opacity: 0.7;
			}
			h1 {
				width: fit-content;
			}
		}
		.poem {
			grid-row: 7;
			grid-column: 1 / 4;
			color: white;
			position: relative;
			background: url('/noise.png');
			/* background-color: #030202; */
			@media screen and (max-width: 900px) {
				height: auto;
				flex: 0 1 auto;
				background-color: white;
				color: #030202;
				transform: rotate(10deg);
			}
		}
		.rehearsals,
		.map {
			margin: 2em 0;
			grid-column: span 8;
			color: rgb(44, 38, 38);
			/* background-image: url('/dark-tire.png'); */
			text-align: center;
			img {
				width: 80px;
				height: auto;
				margin: 2em auto;
				animation: rotate 4s infinite forwards linear;
			}
			h2 {
				margin: 0;
			}

			h1 {
				margin-top: 0.4em;
				font-size: 1.8em;
			}
		}
	}

	.map {
		background-image: url('/map_bg.png');
	}

	.page-divider {
		grid-column: 1 / 5;
	}

	.videos {
		grid-column: 1 / 5;
	}

	img {
		width: 100%;
	}

	th,
	td {
		text-align: left;
		&:nth-child(n + 2) {
			padding-left: 2em;
		}
	}
	.passed {
		text-decoration: line-through;
	}

	footer {
		padding: 2em;
		text-align: center;
		img {
			max-width: min(130px, 50%);
		}
	}
</style>
