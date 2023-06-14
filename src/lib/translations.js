import i18n from 'sveltekit-i18n';

/** @type {import('sveltekit-i18n').Config} */
const config = {
	loaders: [
		{
			locale: 'en',
			key: 'home',

			loader: async () => (await import('../en.json')).default
		},
		{
			locale: 'es',
			key: 'home',

			loader: async () => (await import('../es.json')).default
		}
	]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
