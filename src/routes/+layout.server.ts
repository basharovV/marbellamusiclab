import type { LayoutServerLoad } from './$types';
import { locale, loadTranslations } from '../lib/translations';

export const load: LayoutServerLoad = async ({ url }) => {
	const defaultLocale = 'en'; // get from cookie, user session, ...
	const initLocale = url.searchParams.get('lang') || locale.get() || defaultLocale; // set default if no locale already set
	await loadTranslations(initLocale, url.pathname); // keep this just before the `return`

	return {
		shows: [],
		locale: initLocale
	};
};
