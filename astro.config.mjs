// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

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
			// Las páginas de confirmación no aportan nada en buscadores.
			filter: (page) => !/\/(gracias|thanks)\/?$/.test(page),
			i18n: {
				defaultLocale: 'es',
				locales: { es: 'es-ES', en: 'en-US' },
			},
		}),
	],
});
