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
	
	return {
		// Data here
	};
};
