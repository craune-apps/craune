/**
 * Carga `.env` en `process.env`.
 *
 * Astro también lee `.env`, pero lo hace con Vite y **después** de evaluar
 * `astro.config.mjs`. El resultado es que las variables de `.env` llegan a las
 * páginas pero no a la configuración, y las dos acaban construyendo con
 * valores distintos: las páginas en modo obras y el sitemap creyendo que no.
 *
 * Esto solo importa en local. En Cloudflare las variables de build llegan
 * como variables de entorno de verdad y todos los contextos las ven.
 *
 * Se importa como efecto lateral y **debe ir antes** que cualquier import que
 * lea configuración.
 */
import { existsSync } from 'node:fs';

if (existsSync('.env')) {
	// No pisa lo que ya venga del entorno: una variable de la shell debe poder
	// imponerse sobre el fichero para pruebas puntuales.
	const before = { ...process.env };
	process.loadEnvFile('.env');
	for (const [key, value] of Object.entries(before)) {
		if (value !== undefined) process.env[key] = value;
	}
}
