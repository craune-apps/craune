// @ts-check

// Debe ser el primer import: carga `.env` en process.env antes de que se
// evalúe la configuración. Astro lo lee también, pero más tarde, y sin esto
// este fichero no vería lo que sí ven las páginas.
import './src/config/load-env.mjs';

import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import { isProduction, settings } from './src/config/settings';

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
			// Solo producción en modo normal publica sitemap. En obras no hay nada
			// que indexar, y staging sirve el mismo contenido que producción, así
			// que anunciarlo la haría competir consigo misma. Cuando el filtro deja
			// la lista vacía, la integración ni siquiera crea el fichero, y
			// `src/pages/robots.txt.ts` deja de anunciarlo.
			// Las páginas de confirmación nunca aportan nada en buscadores.
			filter: (page) =>
				isProduction && !settings.inConstruction && !/\/(gracias|thanks)\/?$/.test(page),
			i18n: {
				defaultLocale: 'es',
				locales: { es: 'es-ES', en: 'en-US' },
			},
		}),
	],
});
