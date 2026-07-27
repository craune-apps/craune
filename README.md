# Craune — Landing

Web corporativa de Craune. Astro en modo estático, bilingüe (ES/EN), desplegada en
Cloudflare Workers. El único código que se ejecuta en servidor es el endpoint del
formulario de contacto; todo lo demás es HTML servido desde el CDN.

## Puesta en marcha

```bash
npm install
npm run dev          # http://localhost:4321
```

El servidor de desarrollo queda en segundo plano. Para pararlo: `npx astro dev stop`.

## Comandos

| Comando                  | Qué hace                                                  |
| ------------------------ | --------------------------------------------------------- |
| `npm run dev`            | Servidor local con recarga en caliente                     |
| `npm run build`          | Genera `dist/` listo para producción                       |
| `npm run preview`        | Sirve el build en local con el runtime de Worker           |
| `npx astro check`        | Comprueba tipos y plantillas                               |
| `npm run generate-types` | Regenera los tipos del Worker tras tocar `wrangler.jsonc`  |

## Estructura

```
src/
├── i18n/
│   ├── ui.ts            ← TODO el texto de la web, en ES y EN
│   └── utils.ts         ← detección de idioma y rutas traducidas
├── layouts/Layout.astro ← <head>, SEO, hreflang, animaciones de scroll
├── components/          ← una sección de la home por fichero
├── pages/
│   ├── index.astro      ← portada ES  (/)
│   ├── gracias.astro    ← confirmación ES
│   ├── en/              ← portada EN  (/en/) y confirmación
│   └── api/contact.ts   ← el único endpoint de servidor
└── styles/global.css    ← design tokens (colores, tipografías, escalas)
```

### Para cambiar textos

Todo el copy está en [`src/i18n/ui.ts`](src/i18n/ui.ts). No hay texto escrito
directamente en los componentes. Si añades una clave en español y olvidas
traducirla al inglés, `npm run build` falla — no se puede publicar a medias.

### Para cambiar el aspecto

Los colores, tipografías y escalas están en el bloque `@theme` de
[`src/styles/global.css`](src/styles/global.css). Cambiar `--color-gold` cambia
el acento de toda la web.

## Antes de publicar

Hay contenido de relleno que debes sustituir:

- [ ] **Dominio** — `site:` en [`astro.config.mjs`](astro.config.mjs) y la línea
      `Sitemap:` de [`public/robots.txt`](public/robots.txt) apuntan a `https://craune.com`.
- [ ] **Proyectos** — `work.items` en `ui.ts` son tres ejemplos genéricos
      ("Proyecto Uno", "Proyecto Dos"…).
- [ ] **Testimonios** — `testimonials.items` son placeholders con
      "Nombre Apellido / Empresa Cliente". **Sustitúyelos por testimonios reales
      o borra la sección**: publicar reseñas inventadas como si fueran auténticas
      es engañoso y, en publicidad, ilegal en la UE.
- [ ] **Cifras del hero** — `hero.stats` ("+12 productos lanzados") son ejemplos,
      ajústalas a la realidad.
- [ ] **Redes sociales** — el footer enlaza a `github.com/craune-apps`,
      `linkedin.com/company/craune` y `x.com/craune`. Verifica que existen o quítalos.
- [ ] **Emails** — `hola@craune.com` y `web@craune.com`, en `ui.ts` y `wrangler.jsonc`.
- [ ] **Imagen de compartir** — `public/og.png` lleva el titular en español.

## Formulario de contacto

Envía un email a través de [Resend](https://resend.com) (3.000 emails/mes gratis)
desde un Worker de Cloudflare.

Funciona **con y sin JavaScript**: con JS se envía por `fetch` y la confirmación
aparece en la misma página; sin JS hace un POST normal y redirige a `/gracias/`.
Incluye trampa para bots (campo oculto), validación en cliente y servidor, y la
protección CSRF de Astro, que rechaza envíos desde otros dominios.

### Configuración local

```bash
cp .dev.vars.example .dev.vars   # y pon dentro tu clave de Resend
```

`.dev.vars` está en `.gitignore`. Tras crearlo hay que reiniciar el servidor
(`npx astro dev stop && npm run dev`) para que lo lea.

### Configuración en producción

Las direcciones públicas están en `vars` dentro de [`wrangler.jsonc`](wrangler.jsonc).
La clave de Resend es un secreto y va aparte:

```bash
npx wrangler secret put RESEND_API_KEY
```

En Resend hay que **verificar el dominio** desde el que se envía
(`CONTACT_FROM_EMAIL`) añadiendo unos registros DNS. Hasta entonces solo se puede
enviar desde su dominio de pruebas.

## Despliegue en Cloudflare

Coste: **0 €**. Las peticiones a ficheros estáticos son gratis e ilimitadas y no
consumen cuota. Lo único que se paga es el dominio (~10-15 €/año).

### Opción A — desde Git (recomendada)

1. Panel de Cloudflare → **Workers & Pages → Create → Workers → Import a repository**.
2. Elige `craune-apps/craune`.
3. Build command `npm run build`, directorio de salida `dist`.
4. En **Settings → Variables and Secrets**, añade `RESEND_API_KEY` como *Secret*.

Desde ahí, cada push a `main` despliega solo y cada pull request genera una URL
de vista previa.

### Opción B — desde tu máquina

```bash
npm run build
npx wrangler deploy
```

### Dominio propio

En el Worker: **Settings → Domains & Routes → Add custom domain**. Si el dominio
está en Cloudflare, el DNS y el certificado HTTPS se configuran solos.

## Notas técnicas

- **Fuentes autoalojadas** (Sora + Inter). Cero peticiones a Google Fonts, sin
  saltos de maquetación al cargar y sin terceros.
- **`output: 'static'`** — las páginas se prerenderizan en el build. Solo
  `src/pages/api/contact.ts` lleva `prerender = false` y corre en el Worker.
- **Accesibilidad** — los tres niveles de texto cumplen contraste AA, hay enlace
  para saltar al contenido, foco visible, y las animaciones se desactivan si el
  sistema pide menos movimiento.
- **Variables del Worker** — desde Astro 6 se leen con
  `import { env } from 'cloudflare:workers'`; `Astro.locals.runtime.env` ya no existe.
