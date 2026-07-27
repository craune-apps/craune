import { DEFAULT_LANG, ui, type Lang, type Translation } from './ui';

/**
 * Deduce el idioma a partir de la URL.
 * `/en/...` → inglés. Cualquier otra cosa → español (idioma por defecto,
 * que vive en la raíz porque `prefixDefaultLocale` está en `false`).
 */
export function getLangFromUrl(url: URL): Lang {
	const [, segment] = url.pathname.split('/');
	if (segment && segment in ui) return segment as Lang;
	return DEFAULT_LANG;
}

/** Devuelve el diccionario completo del idioma indicado. */
export function useTranslations(lang: Lang): Translation {
	return ui[lang];
}

/**
 * Construye una ruta con el prefijo de idioma correcto.
 *   localizePath('/', 'es')       → '/'
 *   localizePath('/', 'en')       → '/en/'
 *   localizePath('/aviso', 'en')  → '/en/aviso'
 */
export function localizePath(path: string, lang: Lang): string {
	const clean = path.startsWith('/') ? path : `/${path}`;
	if (lang === DEFAULT_LANG) return clean;
	return clean === '/' ? `/${lang}/` : `/${lang}${clean}`;
}

/**
 * La misma página en el otro idioma, conservando la ruta actual.
 * Se usa en el selector de idioma de la cabecera.
 */
export function getAlternatePath(url: URL, target: Lang): string {
	const current = getLangFromUrl(url);
	if (current === target) return url.pathname;

	// Quita el prefijo del idioma actual para quedarnos con la ruta "desnuda".
	const bare =
		current === DEFAULT_LANG ? url.pathname : url.pathname.replace(new RegExp(`^/${current}`), '') || '/';

	return localizePath(bare, target);
}

/** Todos los idiomas con su ruta equivalente. Alimenta las etiquetas hreflang. */
export function getAlternateLinks(url: URL): Array<{ lang: Lang; path: string }> {
	return (Object.keys(ui) as Lang[]).map((lang) => ({
		lang,
		path: getAlternatePath(url, lang),
	}));
}
