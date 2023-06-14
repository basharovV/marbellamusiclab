<script lang="ts">
	import maplibre, { Marker, NavigationControl, Popup } from 'maplibre-gl';
	import { onMount } from 'svelte';
	import SvelteSeo from 'svelte-seo';
	import venues from '../../data/venues.json';
	let map: maplibregl.Map;
	let mapElement;
	let isMounted = false;
	let isReady = false;
	let selectedPlace: any;
	let selectedPlaceIdx: number = -1;
	let shouldFly = false;

	let hasJamSessions = false;

	let filteredVenues = venues;
	let markers: Marker[] = [];

	/**
	 * For the legend
	 */
	let placeTypes = {
		venue: {
			label: 'Sala',
			color: '#FF6D6D'
		},
		bar: {
			label: 'Bar',
			color: '#EFCC24'
		},
		restaurant: {
			label: 'Restaurante',
			color: '#76BB69'
		},
		studio: {
			label: 'Estudio',
			color: '#6977BB'
		},
		festival: {
			label: 'Festival',
			color: '#26efc4'
		}
	};

	/**
	 * Ids of selected place types.
	 */
	let selectedPlaceTypes: string[] = [];

	function onJamCheck(e: Event) {
		const checked = e.currentTarget.checked;
		if (checked) {
			// filter the list, update indexes
			filteredVenues = venues.filter((v) => v.jam);
			markers.forEach((m) => {
				m.remove();
				if (filteredVenues.map((p) => p.name).includes(m.place?.name)) {
					m.addTo(map);
				}
			});
			if (!filteredVenues.map((p) => p.name).includes(selectedPlace?.name)) {
				shouldFly = true;
				selectedPlaceIdx = 0; // go to first
			}
			// If the new
		} else {
			filteredVenues = venues;
			markers.forEach((m) => {
				m.remove();
				m.addTo(map);
			});
			selectedPlaceIdx = -1;
		}
	}

	function onPlaceTypeSelected(placeType: string) {
		if (selectedPlaceTypes.includes(placeType)) {
			const idx = selectedPlaceTypes.findIndex((p) => p === placeType);
			selectedPlaceTypes.splice(idx, 1);
		} else {
			selectedPlaceTypes.push(placeType);
		}
		selectedPlaceTypes = selectedPlaceTypes;

		if (selectedPlaceTypes.length) {
			// filter the list, update indexes
			filteredVenues = venues.filter((v) => selectedPlaceTypes.includes(v.category));
			// Re-add filtered markers
			markers.forEach((m) => {
				m.remove();
				if (filteredVenues.map((p) => p.name).includes(m.place?.name)) {
					m.addTo(map);
				}
			});
		} else {
			// Re-add all markers
			filteredVenues = venues;
			markers.forEach((m) => {
				m.remove();
				m.addTo(map);
			});
		}
	}

	$: {
		if (selectedPlaceIdx > -1) {
			selectedPlace = filteredVenues[selectedPlaceIdx];
			if (selectedPlace) {
				const marker = document.querySelector(`.marker-${selectedPlace.id}`);
				if (marker) {
					marker.classList.add('selected');
					const others = document.querySelectorAll(`:not(.marker-${selectedPlace.id}`);
					others.forEach((m) => {
						m.classList.remove('selected');
					});
				}
			}
			if (shouldFly) {
				map.flyTo({
					center: isMobile
						? [selectedPlace.pos.lng, selectedPlace.pos.lat - 0.2]
						: [selectedPlace.pos.lng, selectedPlace.pos.lat],
					zoom: isMobile ? 8.5 : 10.5,
					speed: 0.3,
					curve: 1
				});
				shouldFly = false;
			}
		} else {
			selectedPlace = null;
			if (isMounted) {
				const others = document.querySelectorAll(`[aria-label="Map marker"]`);
				others.forEach((m) => {
					m.classList.remove('selected');
				});
			}
		}
		selectedPlaceTypes = selectedPlaceTypes;
	}

	let isLoading = true;
	let showExplainer = true;
	let isMobile = false;

	// extend mapboxGL Marker so we can pass in an onClick handler
	class ClickableMarker extends Marker {
		setPlace(place: any, idx: number) {
			this.placeId = idx;
			this.place = place;
			return this;
		}
		// new method onClick, sets _handleClick to a function you pass in
		onClick(handleClick) {
			this._handleClick = handleClick;
			this._element.classList.add(`marker-${this.place.id}`);
			return this;
		}

		showPopupOnHover() {
			if (!isMobile) {
				this._element.addEventListener('mouseenter', () => {
					if (selectedPlace !== this.place && !this.getPopup().isOpen()) {
						this.togglePopup();
					}
				});
				this._element.addEventListener('mouseleave', () => {
					if (selectedPlace !== this.place && this.getPopup().isOpen()) {
						this.togglePopup();
					}
				});
			}

			return this;
		}

		// the existing _onMapClick was there to trigger a popup
		// but we are hijacking it to run a function we define
		_onMapClick(e) {
			console.log('e ', e);
			const targetElement = e.originalEvent.target;
			const element = this._element;
			if (this._handleClick && (targetElement === element || element.contains(targetElement))) {
				this._element.classList.add('selected');
				this._handleClick();
			} else {
				this._element.classList.remove('selected');
			}
		}
	}

	function init() {
		console.log('initing');
		map = new maplibre.Map({
			container: 'map',
			style:
				'https://api.maptiler.com/maps/0f4a38e3-a830-4fa6-8d8d-0a745f993b06/style.json?key=GcUcBeo8aBFeRFp7EqoL', // stylesheet location
			center: isMobile ? [-4.8807, 36.2934] : [-4.9607, 36.4934], // starting position [lng, lat]
			zoom: isMobile ? 8.5 : 9.5, // starting zoom,
			trackResize: true,
			attributionControl: false
		});

		map.on('load', function () {
			map.resize();
			loadData();
			isLoading = false;
		});

		window.addEventListener('resize', () => {
			w = window.innerWidth;
			h = window.innerHeight;
		});
	}

	function loadData() {
		map.addControl(new NavigationControl({ showZoom: true }));
		// Set options
		var markerHeight = 50,
			markerRadius = 10,
			linearOffset = 25;

		filteredVenues.forEach((venue, idx) => {
			markers.push(
				new ClickableMarker({
					color: venue.category !== undefined ? placeTypes[venue?.category]?.color : '#FFFFFF'
				})
					.setPopup(
						new Popup().setHTML(`
                <div>
                    <h1 class="popup-title">
                        ${venue.name}
                    </h1>
                    <h2 class="popup-description">${venue.description}</h2>
					<p>Click para más detalles</p>
                </div>`)
					) // add popup
					.setLngLat([venue.pos.lng, venue.pos.lat])
					.addTo(map)
					.setPlace(venue, idx)
					.showPopupOnHover()
					.onClick(() => {
						selectedPlaceIdx = filteredVenues.findIndex((v) => v.id === venue.id);
					})
			);
		});
	}

	function onMapLoad() {
		console.log('map loaded');
		isReady = true;
	}

	function goToPrevPlace() {
		shouldFly = true;
		if (selectedPlaceIdx >= 1) {
			selectedPlaceIdx = selectedPlaceIdx - 1;
		}
	}

	function goToNextPlace() {
		shouldFly = true;
		if (selectedPlaceIdx < filteredVenues.length - 1) {
			selectedPlaceIdx = selectedPlaceIdx + 1;
		}
	}

	let w;
	let h;

	onMount(() => {
		w = window.innerWidth;
		h = window.innerHeight;
		isMobile = w < 500;
		console.log('mounted');
		isMounted = true;
		init();
	});
</script>

<SvelteSeo
	title="Música en la Costa del Sol"
	description="Un mapa interactivo de la nueva escena musical en la Costa del Sol, para bandas locales y los que buscan cultura alternativa."
	openGraph={{
		title: 'Música en la Costa del Sol',
		description:
			'Un mapa interactivo de la nueva escena musical en la Costa del Sol, para bandas locales y los que buscan cultura alternativa.',
		url: `https://unclejohnsband.xyz/costadelsol`,
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

<svelte:head>
	<link href="https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.css" rel="stylesheet" />
</svelte:head>

<div class="container">
	<div
		id="map"
		class:loading={isLoading}
		bind:this={mapElement}
		style="width: {w}px; height: {h}px"
	/>
	{#if isLoading}
		<div class="loading">
			<img src="/map/DRUM.GIF" />
			<h2>Cargando mapa...</h2>
		</div>
	{/if}
	<div class="toolbar">
		<p class="label" />
		<div>
			<h1>Música en la Costa</h1>
			<h2>mapa de la escena local</h2>
		</div>
		<p />
	</div>

	<div class="bottom" class:has-info={selectedPlace}>
		{#if selectedPlace}
			<div class="info">
				<div
					class="circle-button close"
					on:click={() => {
						selectedPlaceIdx = -1;
					}}
				>
					<p>x</p>
				</div>

				<div class="content">
					<p>{selectedPlace.description}</p>
					{#if selectedPlace.jam}
						<p>✅ jam sessions</p>
					{/if}
					{#if selectedPlace.season === 'summer'}
						❄️ cerrado en invierno
					{/if}
					{#if selectedPlace?.links}
						<span class="links">
							{#each selectedPlace.links as link}
								{#if link.url}
									<a href={link.url}>{link.type}</a>
								{:else if link.phone}
									<p>🤙 {link.type}: {link.phone}</p>
								{:else}
									<p>{link.type}: {link.text}</p>
								{/if}
							{/each}
						</span>
					{/if}
				</div>
				<div class="header">
					<div class="prev" class:disabled={selectedPlaceIdx === 0} on:click={goToPrevPlace}>
						<p>←</p>
					</div>
					<h2>
						{selectedPlace.name}
					</h2>
					<div
						class="next"
						class:disabled={selectedPlaceIdx === filteredVenues.length - 1}
						on:click={goToNextPlace}
					>
						<p>→</p>
					</div>
				</div>
			</div>
		{/if}

		<div class="legend">
			{#if showExplainer}
				<p style="color: #DFEFE0">
					Illo! Hemos creado esta página para gente que busca ver música en directo, y para ayudar a
					bandas y artistas locales a encontrar sitios donde <span style="color: white"
						>actuar, grabar y ensayar.</span
					><br /><br />Sabemos que el tema de la música por la Costa deja mucho que desear, pero
					esperamos que os sirva de ayuda 🤘
				</p>
				<div class="ok-section">
					<button
						class="explainer-ok-btn"
						on:click={() => {
							showExplainer = false;
						}}>OK</button
					>
					<small class="signed"><a href="/">- Uncle John's Band</a></small>
				</div>
				<br />
				<p style="border: 1px solid white;padding: 0.5em;">
					Conoces un sitio que debería estar en el mapa? Manda un email a <a
						href="mailto:contact@elpatorecords.com">contact@elpatorecords.com</a
					>
				</p>
			{:else}
				<p class="legend-label">Leyenda</p>
				{#each Object.entries(placeTypes) as placeType}
					<span
						class="legend-item"
						class:selected={selectedPlaceTypes.includes(placeType[0])}
						on:click={() => onPlaceTypeSelected(placeType[0])}
					>
						<div class="circle" style="background-color: {placeType[1].color};" />
						<p>{placeType[1].label}</p>
						<p style="opacity: 0.5">{venues.filter(v=>v.category === placeType[0]).length}</p>
					</span>
				{/each}
				<label>
					<input type="checkbox" on:change={onJamCheck} /> jam sessions
				</label>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		position: relative;

		.toolbar {
			position: absolute;
			top: 0;
			width: 100%;
			display: grid;
			grid-template-columns: 250px 1fr 250px;
			padding: 1em;

			@media only screen and (max-width: 500px) {
				grid-template-columns: 0px 1fr 0px;
			}

			div {
				margin: 0 auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				@media only screen and (max-width: 600px) {
					align-items: flex-start;
				}

				* {
					margin: 0;
				}
				h2 {
					@media only screen and (max-width: 600px) {
						padding: 0;
					}
					/* background-color: #3a3939; */
					padding: 0 0.5em;
					/* color: aliceblue; */
				}
			}
		}

		.loading {
			position: absolute;
			height: 100vh;
			width: 100vw;
			margin: auto;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: -1;
		}
		#map {
			position: absolute;
			height: 100%;
			width: 100%;
			opacity: 1;
			z-index: 0;
			transition: opacity 0.5s ease-in-out;

			&.loading {
				opacity: 0;
			}
			/* Change the cursor to a pointer on hover so the user knows it's clickable */
			:global(.mapboxgl-marker:hover) {
				cursor: pointer;
			}
			:global(.mapboxgl-marker.selected) {
				z-index: 1000 !important;
			}
			:global(.mapboxgl-marker.selected svg > g > g:nth-child(2)) {
				fill: #000000 !important;
			}

			/* darken the marker on hover */
			:global(.mapboxgl-marker:hover svg > g > g:nth-child(2)) {
				fill: #7993a5;
			}

			:global(.maplibregl-popup) {
				max-width: 350px !important;
			}

			:global(.popup-title) {
				margin: 0;
				font-family: 'Times New Roman', serif;
			}

			:global(.popup-description) {
				margin: 0;
				margin-top: 1em;
				color: rgb(199, 193, 193);
			}
			:global(.maplibregl-popup-tip) {
				border-top-color: #3a3939;
			}

			:global(.mapboxgl-popup-content) {
				background: #3a3939;
				color: white;
				padding: 1em 2.4em;
				/* border: 3px solid rgba(255, 255, 255, 0.116); */
			}

			:global(.maplibregl-popup-close-button) {
				padding: 10px;
				color: rgb(139, 134, 134);
				font-size: 1.4em;
			}
		}

		:global(.mapboxgl-canvas) {
			position: relative;
			left: 0;
			top: 0;
		}

		.bottom {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			position: fixed;
			bottom: 1em;
			left: 1em;
			right: 1em;

			&.has-info {
				flex-direction: row-reverse;
				justify-content: space-between;
				align-items: flex-end;
			}

			@media only screen and (max-width: 600px) {
				flex-direction: column;
				&.has-info {
					flex-direction: column;
					align-items: flex-end;
				}
			}
		}

		.info {
			width: 350px;
			z-index: 10;
			border-radius: 2px;
			@media only screen and (max-width: 600px) {
				width: 100%;
				padding: 0;
				margin-bottom: 1em;
			}
			display: block;
			padding: 0.5em 1em;
			color: white;
			position: relative;

			.header {
				display: grid;
				grid-template-columns: auto 1fr auto;
				margin-top: 0.5em;
			}
			h2 {
				font-weight: bold;
				color: #24efc4;
				background-color: #3a3939;
				padding: 0.5em 1em;
				margin: 0;
				margin-top: 0;
				position: relative;
			}

			.circle-button {
				background-color: #3a3939;
				border-radius: 30px;
				width: 30px;
				height: 30px;
				&:hover {
					opacity: 0.5;
				}
				p {
					margin: 0;
					text-align: center;
					vertical-align: middle;
					line-height: normal;
					padding: 0;
					font-size: 1.4em;
				}
			}

			.close {
				position: absolute;
				top: -35px;
				right: 0;
				left: 0;
				margin: 0 auto;
				&:hover {
					cursor: pointer;
				}
			}
			.next {
				width: 35px;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #3a3939;
				color: white;
				user-select: none;
				z-index: 4;
				&:hover {
					cursor: pointer;
					background-color: #565454;
				}
				&.disabled {
					color: rgb(139, 134, 134);
				}
				p {
					line-height: 1em;
					font-size: 1.6em;
				}
			}
			.prev {
				width: 35px;
				height: 100%;
				display: flex;
				background-color: #3a3939;
				align-items: center;
				color: white;
				z-index: 4;
				user-select: none;
				&:hover {
					cursor: pointer;
					background-color: #565454;
				}
				justify-content: center;
				&.disabled {
					color: rgb(139, 134, 134);
				}
				p {
					line-height: 1em;
					font-size: 1.6em;
				}
			}

			.links {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				gap: 10px;
				p {
					margin: 0;
					padding: 0;
				}
			}
			span {
				width: 100%;
				display: block;
			}
			.content {
				background-color: #3a3939;
				padding: 0.5em 1em;
			}
			p,
			span {
				padding: 0.2em 0.5em;
				margin: 5px 0;
			}
		}

		.legend {
			display: grid;
			background-color: #3a3939;
			padding: 0.5em 1em;
			color: white;
			max-width: 350px;
			@media only screen and (max-width: 600px) {
				display: block;
				width: 100%;
				max-width: 100%;
			}
			> .legend-label {
				margin: 0;
				width: 100%;
				text-align: center;
				color: rgb(143, 143, 139);
			}

			.ok-section {
				display: grid;
				grid-template-columns: 1fr auto;
			}
			.explainer-ok-btn {
				width: fit-content;
				align-self: flex-end;
			}
			.signed {
				float: right;
				top: 0em;
				position: relative;
			}

			span {
				vertical-align: middle;
			}
			.legend-item {
				display: inline-flex;
				vertical-align: middle;
				position: relative;
				border: 1px solid transparent;
				padding: 0 0.5em;
				margin: 0;

				&:hover {
					cursor: pointer;
					border: 1px solid #7993a5;
					border-radius: 2px;
				}

				&.selected {
					background-color: #7993a5b6;
					border: 1px solid white;
				}

				div {
					margin: auto 0;
				}
				p {
					margin: 0 0 0 0.5em;
				}
			}

			.circle {
				width: 10px;
				height: 10px;

				&.venue {
					background-color: #ff0000;
				}

				&.bar {
					background-color: #ff0000;
				}

				&.festival {
					background-color: #24efc4;
				}
			}
		}
	}
</style>
