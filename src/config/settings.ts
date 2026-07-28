/**
 * Ajustes del sitio que se resuelven en el build, no en cada visita.
 *
 * `SETTINGS` es una variable de **build**, no de ejecución. En Cloudflare vive
 * en los ajustes de la build del Worker, y en local en un fichero `.env`.
 * No confundir con `.dev.vars`, que son las variables que lee el Worker en
 * ejecución (ahí va la clave de Resend).
 *
 * Su valor queda horneado en el HTML generado: por eso cambiar de modo obliga
 * a redesplegar, y por eso las páginas se siguen sirviendo estáticas desde el
 * CDN sin ejecutar nada en servidor.
 */

export interface Settings {
	/** Con `true`, todas las rutas sirven la página de "en construcción". */
	inConstruction: boolean;
}

const DEFAULTS: Settings = {
	inConstruction: false,
};

function readRaw(): string | undefined {
	// En el build (Node) las variables del entorno llegan por `process.env`.
	// `import.meta.env` queda como respaldo por si se define en un `.env`.
	const fromProcess = typeof process !== 'undefined' ? process.env?.SETTINGS : undefined;
	return fromProcess ?? (import.meta.env.SETTINGS as string | undefined);
}

function readSettings(): Settings {
	const raw = readRaw();
	if (!raw) return DEFAULTS;

	let parsed: unknown;
	try {
		parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
	} catch {
		// Fallar aquí es lo correcto: un JSON mal escrito publicaría la web
		// entera justo cuando querías dejarla en obras.
		throw new Error(`SETTINGS no es JSON válido. Recibido: ${String(raw)}`);
	}

	if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
		throw new Error(`SETTINGS debe ser un objeto JSON. Recibido: ${String(raw)}`);
	}

	return { ...DEFAULTS, ...(parsed as Partial<Settings>) };
}

export const settings = readSettings();

/**
 * Entorno de Cloudflare con el que se construyó, tomado de `CLOUDFLARE_ENV`.
 * En producción no se define, y de ahí sale `isProduction`.
 *
 * Hay que mirar en los dos sitios, y no es un cinturón y tirantes: el build
 * evalúa este módulo en dos contextos distintos y la variable llega por un
 * camino diferente en cada uno. Al renderizar las páginas solo existe en
 * `import.meta.env`; en `astro.config`, solo en `process.env`.
 */
export const environment =
	(typeof process !== 'undefined' ? process.env?.CLOUDFLARE_ENV : undefined) ||
	(import.meta.env.CLOUDFLARE_ENV as string | undefined) ||
	'production';

/**
 * Solo producción debe aparecer en buscadores. Staging sirve el mismo
 * contenido, así que sin esto competiría con la web real por las mismas
 * búsquedas — y encima su URL es pública mientras no tenga Access delante.
 */
export const isProduction = environment === 'production';
