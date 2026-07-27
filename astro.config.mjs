// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import { settings } from './src/config/settings';

// https://astro.build/config
export default defineConfig({
	// Cambia esto por tu dominio real antes de desplegar.
	// Lo usan el sitemap, los canonical y las etiquetas Open Graph.
	site: 'https://craune.com',

	adapter: cloudflare(),

	// Estático por defecto: cada página se prerenderiza a HTML en el build.
	// Solo `src/pages/api/contact.ts` opta por ejecutarse en el servidor.
	output: 'static',

	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'en'],
		routing: {
			// El español vive en `/`, el inglés en `/en/`.
			prefixDefaultLocale: false,
		},
	},

	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [
		sitemap({
			// Las páginas de confirmación no aportan nada en buscadores. Con la web
			// en obras no se indexa nada, así que el sitemap no llega a generarse;
			// `src/pages/robots.txt.ts` deja de anunciarlo en ese caso.
			filter: (page) => !settings.inConstruction && !/\/(gracias|thanks)\/?$/.test(page),
			i18n: {
				defaultLocale: 'es',
				locales: { es: 'es-ES', en: 'en-US' },
			},
		}),
	],
});
