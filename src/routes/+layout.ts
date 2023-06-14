import type { LayoutLoad } from '../../.svelte-kit/types/src/routes/$types';
import { locale, loadTranslations } from '$lib/translations';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
import shows from '../data/shows.json';
import YOUTUBE_VIDEOS from '../data/videos.json';

// TODO remove if not gonna be used? All data is local until embed is loaded
async function getYouTubeTitle(fetch, videoId) {
	return await fetch(
		`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&feature=emb_logo&format=json`
	)
		.then((response) => response.json())
		.then((response) => {
			console.log('response', response);
			if (response) {
				return {
					title: response.title,
					thumbnail: `/thumbnails/${videoId}.webp`
				};
				// thumbnail = response.thumbnail_url.replace('hqdefault', 'maxresdefault');
			}
		});
}

async function getAllYouTubeVideos(fetch) {
	return await YOUTUBE_VIDEOS.reduce(async (obj, current) => {
		console.log('obj', obj);
		console.log('current', current);
		const objResolved = await obj;

		// Add title
		objResolved[current.id] = {
			...current,
			thumbnail: `/thumbnails/${current.id}.webp`
		};

		console.log('objcurrent', obj[current.id]);
		return Promise.resolve(objResolved);
	}, Promise.resolve({}));
}

export const load: LayoutLoad = async ({ fetch, url }) => {
	const { pathname } = url;

	const defaultLocale = 'en'; // get from cookie, user session, ...
	const initLocale = url.searchParams.get('lang') || locale.get() || defaultLocale; // set default if no locale already set
	dayjs.locale(initLocale);

	await loadTranslations(initLocale, pathname); // keep this just before the `return`

	const transformedShows = shows.shows.map((s) => ({
		...s,
		date: dayjs(s.date, 'DD-MM-YYYY').format('ddd, D MMM YYYY'),
		passed: dayjs().isAfter(dayjs(s.date, 'DD-MM-YYYY'))
	}));

	console.log('shows', transformedShows);
	let videos = {};

	try {
		videos = await getAllYouTubeVideos(fetch);
		console.log('videos', videos);
	} catch (err) {
		console.error(err);
		videos = YOUTUBE_VIDEOS.reduce((obj, current) => {
			obj[current.id] = {};
			return obj;
		}, YOUTUBE_VIDEOS);
	}
	return {
		shows: transformedShows,
		today: dayjs().format(initLocale === 'es' ? 'dddd, D [de] MMMM YYYY' : 'dddd, Do MMMM YYYY'),
		videos
	};
};
