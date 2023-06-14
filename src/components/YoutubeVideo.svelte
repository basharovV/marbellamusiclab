<script lang="ts">
	export let videoId;
	export let platform;
	export let showTitle = true;

	export let title = "Loading...";
	export let thumbnail = "";

	async function getVimeoThumbnail() {
		await fetch(
			`https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${videoId}&width=480&height=360`
		)
			.then((response) => response.json())
			.then((response) => {
				console.log('response', response);
				if (response) {
					thumbnail = response.thumbnail_url.replace('295x166', '480x360');
				}
			});
	}

	async function getYouTubeTitle() {
		await fetch(
			`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&feature=emb_logo&format=json`
		)
			.then((response) => response.json())
			.then((response) => {
				console.log('response', response);
				if (response) {
					title = response.title;
					// thumbnail = response.thumbnail_url.replace('hqdefault', 'maxresdefault');
					thumbnail = `/thumbnails/${videoId}.jpg`;
				}
			});
	}

	let loadIframe = false;

	if (typeof window !== 'undefined' && platform === "yt" && thumbnail === undefined && title === undefined) {
		getYouTubeTitle();
	}
</script>

<svelte:head>
	<link rel="preload" as="image" href={thumbnail} />
</svelte:head>

<div class="embed">
	{#if loadIframe}
		<iframe
			alt="One of my videos"
			loading="lazy"
			src={platform === 'yt'
				? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`
				: `https://player.vimeo.com/video/${videoId}`}
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
			title="Content"
		/>
	{:else}
		<div
			on:click={() => {
				loadIframe = true;
			}}
		>
			<img alt="thumbnail" src={thumbnail} />
			<div class="play-button" />
			{#if showTitle}<p>{title}</p>{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	.embed {
		position: relative;
		width: 100%;
		height: 100%;
		padding-bottom: 56.25%;
		overflow: hidden;

		box-sizing: border-box;
		border: 2px solid #c1c1c15b;
		@media only screen and (max-width: 522px) {
			width: 100%;
		}

		p {
			position: absolute;
			background-color: rgba(44, 38, 38, 0.909);
			background-image: url('/dark-tire.png');
			left: 0px;
			right: 0px;
			bottom: 0px;
			vertical-align: middle;
			text-align: center;
			width: 100%;
			margin: auto;
			font-size: 0.9em;
			font-weight: bold;
			color: #efddc8;
			padding: 0 0.3em;
			/* border-radius: 5px; */
		}

		&:hover {
			opacity: 0.9;
			cursor: pointer;
		}
		.play-button {
			position: absolute;
			display: block;
			box-sizing: border-box;
			width: 0;
			height: 37px;
			margin: auto;
			border-color: transparent transparent transparent rgb(255, 255, 255);
			transition: 100ms all ease;
			cursor: pointer;
			border-style: solid;
			border-width: 18.5px 0 18.5px 30px;
			top: 0px;
			bottom: 0px;
			left: 0px;
			right: 0px;
		}

		img {
			object-fit: cover;
			transition: all 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
		}

		> iframe,
		img {
			position: absolute;
			/* padding: 2px; */
			left: 0;
			right: 0;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			@media only screen and (max-width: 522px) {
				position: absolute;
				left: 0;
				right: 0;
				box-sizing: border-box;
				border: none;
				width: 100%;
			}
		}
	}
</style>
