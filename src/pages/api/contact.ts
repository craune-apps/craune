import type { APIRoute } from 'astro';
// A partir de Astro 6 las variables del Worker se leen desde este módulo,
// ya no desde `Astro.locals.runtime.env`.
import { env } from 'cloudflare:workers';
import { DEFAULT_LANG, ui, type Lang } from '../../i18n/ui';

/**
 * Único punto de la web que se ejecuta en el servidor (un Worker de Cloudflare).
 * Todo lo demás es HTML estático servido desde el CDN.
 */
export const prerender = false;

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

/** Límites generosos, pero suficientes para que nadie nos mande una novela. */
const LIMITS = { name: 120, email: 200, company: 160, budget: 80, message: 5000 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface ContactFields {
	name: string;
	email: string;
	company: string;
	budget: string;
	message: string;
	website: string; // honeypot
	lang: Lang;
}

const json = (data: unknown, status = 200) =>
	new Response(JSON.stringify(data), {
		status,
		headers: { 'content-type': 'application/json; charset=utf-8' },
	});

/**
 * En producción los valores vienen de `wrangler.jsonc` (los públicos) y de
 * los secretos del Worker. En local, de `wrangler.jsonc` y `.dev.vars`.
 * En ambos casos se leen igual, desde el módulo `cloudflare:workers`.
 */
function readEnv(key: string): string | undefined {
	const value = (env as unknown as Record<string, unknown>)[key];
	return typeof value === 'string' && value.length > 0 ? value : undefined;
}

/** Acepta tanto JSON (envío por fetch) como un POST de formulario clásico. */
async function readFields(request: Request): Promise<Record<string, unknown>> {
	const contentType = request.headers.get('content-type') ?? '';

	if (contentType.includes('application/json')) {
		return (await request.json()) as Record<string, unknown>;
	}

	const formData = await request.formData();
	return Object.fromEntries(formData) as Record<string, unknown>;
}

const asString = (value: unknown, max: number) =>
	typeof value === 'string' ? value.trim().slice(0, max) : '';

/** Evita que un salto de línea en el asunto permita inyectar cabeceras. */
const sanitizeHeader = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

const escapeHtml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

export const POST: APIRoute = async ({ request, redirect }) => {
	// Si el navegador no lleva JavaScript, el formulario hace un POST normal
	// y hay que devolverle una página, no un JSON.
	const wantsJson = (request.headers.get('content-type') ?? '').includes('application/json');

	let raw: Record<string, unknown>;
	try {
		raw = await readFields(request);
	} catch {
		return json({ ok: false, message: 'Malformed request body.' }, 400);
	}

	const lang: Lang = raw.lang === 'en' ? 'en' : DEFAULT_LANG;
	const copy = ui[lang].contact.form;

	const fields: ContactFields = {
		name: asString(raw.name, LIMITS.name),
		email: asString(raw.email, LIMITS.email),
		company: asString(raw.company, LIMITS.company),
		budget: asString(raw.budget, LIMITS.budget),
		message: asString(raw.message, LIMITS.message),
		website: asString(raw.website, 100),
		lang,
	};

	// Trampa para bots: si el campo oculto viene relleno, fingimos éxito
	// y no enviamos nada. El bot se va contento y nosotros sin spam.
	if (fields.website) {
		return wantsJson
			? json({ ok: true, message: copy.successBody })
			: redirect(thanksPath(lang), 303);
	}

	if (!fields.name || !fields.email || !fields.message) {
		return json({ ok: false, message: copy.errorRequired }, 400);
	}

	if (!EMAIL_RE.test(fields.email)) {
		return json({ ok: false, message: copy.errorEmail }, 400);
	}

	const apiKey = readEnv('RESEND_API_KEY');
	const to = readEnv('CONTACT_TO_EMAIL');
	const from = readEnv('CONTACT_FROM_EMAIL');

	if (!apiKey || !to || !from) {
		// Falta configuración: es un fallo nuestro, no del visitante.
		console.error('[contact] Faltan variables de entorno: RESEND_API_KEY, CONTACT_TO_EMAIL o CONTACT_FROM_EMAIL');
		return json({ ok: false, message: copy.errorGeneric }, 500);
	}

	const subject = sanitizeHeader(
		`Craune · ${fields.name}${fields.company ? ` (${fields.company})` : ''}`,
	);

	const summary = [
		`Nombre:      ${fields.name}`,
		`Email:       ${fields.email}`,
		`Empresa:     ${fields.company || '—'}`,
		`Presupuesto: ${fields.budget || '—'}`,
		`Idioma web:  ${fields.lang}`,
		'',
		fields.message,
	].join('\n');

	try {
		const response = await fetch(RESEND_ENDPOINT, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${apiKey}`,
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				from,
				to: [to],
				subject,
				// Respondes desde tu cliente de correo y le llega directamente.
				reply_to: fields.email,
				text: summary,
				html: `<pre style="font:14px/1.6 ui-monospace,monospace;white-space:pre-wrap">${escapeHtml(summary)}</pre>`,
			}),
		});

		if (!response.ok) {
			console.error('[contact] Resend respondió', response.status, await response.text());
			return json({ ok: false, message: copy.errorGeneric }, 502);
		}
	} catch (error) {
		console.error('[contact] No se pudo contactar con Resend', error);
		return json({ ok: false, message: copy.errorGeneric }, 502);
	}

	return wantsJson
		? json({ ok: true, message: copy.successBody })
		: redirect(thanksPath(lang), 303);
};

/** Página de gracias para quien envía el formulario sin JavaScript. */
function thanksPath(lang: Lang): string {
	return lang === 'en' ? '/en/thanks/' : '/gracias/';
}

/** Un GET a este endpoint no tiene sentido; lo decimos claramente. */
export const GET: APIRoute = () => json({ ok: false, message: 'Method not allowed.' }, 405);
