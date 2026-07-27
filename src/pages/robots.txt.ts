import type { APIRoute } from 'astro';
import { settings } from '../config/settings';

/**
 * `robots.txt` generado en el build, porque su contenido depende del modo.
 *
 * Con la web en obras no hay sitemap que anunciar (el filtro lo deja vacío y
 * la integración ni siquiera crea el fichero), así que anunciarlo dejaría un
 * enlace roto. Y de paso pedimos a los buscadores que no rastreen nada,
 * reforzando el `noindex` de la propia página.
 */
export const GET: APIRoute = ({ site }) => {
	const lines = settings.inConstruction
		? ['User-agent: *', 'Disallow: /']
		: ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('sitemap-index.xml', site)}`];

	return new Response(`${lines.join('\n')}\n`, {
		headers: { 'content-type': 'text/plain; charset=utf-8' },
	});
};
