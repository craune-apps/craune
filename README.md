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
├── config/settings.ts   ← el modo "en construcción", resuelto en el build
├── i18n/
│   ├── ui.ts            ← TODO el texto de la web, en ES y EN
│   └── utils.ts         ← detección de idioma y rutas traducidas
├── layouts/
│   ├── Layout.astro     ← <head>, SEO, hreflang, animaciones de scroll
│   └── BareLayout.astro ← sin cabecera ni pie; solo para la página de obras
├── components/          ← una sección de la home por fichero
├── pages/
│   ├── index.astro      ← portada ES  (/)
│   ├── gracias.astro    ← confirmación ES
│   ├── en/              ← portada EN  (/en/) y confirmación
│   ├── robots.txt.ts    ← generado en el build: su contenido depende del modo
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

## Modo "en construcción"

La web tiene dos modos. Con el modo obras activo, **todas** las rutas sirven una
página mínima de "próximamente" y el contenido real ni siquiera llega al HTML
generado: no está oculto, no existe. Además `robots.txt` responde `Disallow: /`
y no se genera sitemap.

Lo controla la variable `SETTINGS`, con forma JSON:

```json
{ "inConstruction": true }
```

Es una variable **de build**, no de ejecución. Se resuelve al construir el sitio
y su valor queda horneado en el HTML, que es lo que permite seguir sirviendo
páginas estáticas desde el CDN sin ejecutar el Worker. El precio de esa decisión
es que **cambiar de modo exige volver a desplegar** (menos de un minuto).

Si `SETTINGS` contiene un JSON inválido, el build falla a propósito: es
preferible a publicar la web entera cuando querías dejarla en obras.

### En local

```bash
cp .env.example .env     # y pon dentro inConstruction a true o false
npx astro dev stop && npm run dev
```

Hay que **reiniciar el servidor**: el valor se lee al arrancar, no hay recarga
en caliente. Para una prueba puntual sin tocar el fichero, la variable de la
shell tiene prioridad sobre el `.env`:

```bash
SETTINGS='{"inConstruction":true}' npm run dev
```

### En producción

En el panel del Worker, en los ajustes de **Build** → *Variables and secrets*
(no confundir con las de ejecución, que están en otro sitio). Se cambia el valor
y se pulsa **Retry deployment**.

### Los tres ficheros de configuración

Es lo único que se presta a confusión en este proyecto:

| Fichero           | Lo lee | Cuándo               | Contiene                        |
| ----------------- | ------ | -------------------- | ------------------------------- |
| `.env`            | Astro  | al construir         | `SETTINGS`                      |
| `.dev.vars`       | Worker | en cada petición     | `RESEND_API_KEY`, emails        |
| `wrangler.jsonc`  | Worker | en producción        | emails públicos                 |

## Antes de publicar

Hay contenido de relleno que debes sustituir. Mientras el **modo obras** esté
activo nada de esto es visible, pero todo tiene que estar resuelto antes de
desactivarlo:

- [x] **Dominio** — `craune.com`, en `site:` de [`astro.config.mjs`](astro.config.mjs).
      El `Sitemap:` de `robots.txt` lo deriva de ahí, no hay que tocarlo aparte.
- [x] **Emails** — `contact@craune.com` (un grupo de Workspace) recibe, y
      `web@craune.com` envía. En `ui.ts` y `wrangler.jsonc`.
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
      Están además en el `sameAs` de [`Layout.astro`](src/layouts/Layout.astro).
- [ ] **Imagen de compartir** — `public/og.png` lleva el titular en español, y la
      versión inglesa usa la misma.

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

Usa **una clave distinta** de la de producción. La de local vive en texto plano
en tu portátil; si se filtra, la revocas sin tumbar la web. En Resend créala con
permiso *Sending access* y restringida a `craune.com`: la web solo envía, no
necesita poder borrar dominios ni crear claves.

### Configuración en producción

Las direcciones públicas están en `vars` dentro de [`wrangler.jsonc`](wrangler.jsonc).
La clave de Resend es un secreto y va aparte:

```bash
npx wrangler secret put RESEND_API_KEY
```

El valor **no se pasa como argumento**: wrangler lo pide por un prompt oculto.
Si despliegas con la integración de Git, mejor añadirlo desde el panel.

### Resend: lo que no es obvio

**Hasta verificar el dominio** solo se puede enviar desde `onboarding@resend.dev`
y **solo a la dirección con la que se registró la cuenta**. Un alias no vale.
El error es un `403 validation_error`, no un fallo de configuración tuyo.

**Al verificar el dominio**, Resend pone sus registros en el subdominio `send`
(`MX` y `SPF` en `send.craune.com`, más un `DKIM` con selector `resend`). **No
toca el `MX` de la raíz**, así que el correo de Google Workspace sigue igual: los
dos DKIM conviven porque usan selectores distintos.

**`contact@craune.com` es un grupo de Workspace**, no un buzón. Aunque el
remitente sea del propio dominio, el mensaje entra por servidores de Resend y
Google lo trata como **externo**: el grupo necesita "Quiénes pueden publicar" en
*Cualquier usuario en la Web*, o los mensajes se pierden en silencio.

**Reenvío y SPF.** Cuando el grupo reparte el mensaje a sus miembros lo reenvía,
y eso rompe el SPF por diseño. El DKIM sí sobrevive al reenvío, que es la razón
de peso para verificar el dominio en Resend. Aun así conviene un filtro en Gmail
sobre `contact@craune.com` con *"Nunca enviarlo a Spam"*.

## Despliegue en Cloudflare

Coste: **0 €**. Las peticiones a ficheros estáticos son gratis e ilimitadas y no
consumen cuota. Lo único que se paga es el dominio (~10-15 €/año).

### Opción A — desde Git (recomendada)

1. Panel de Cloudflare → **Workers & Pages → Create → Workers → Import a repository**.
2. Elige `craune-apps/craune`.
3. Rellena la configuración de build. Ojo: el flujo de Workers **no tiene campo
   "directorio de salida"** — eso es de Pages. Aquí sobra, porque
   [`wrangler.jsonc`](wrangler.jsonc) ya declara `"directory": "./dist"`.

   | Campo                                  | Valor                        |
   | -------------------------------------- | ---------------------------- |
   | Build command                          | `npm run build`              |
   | Deploy command                         | `npx wrangler deploy`        |
   | Non-production branch deploy command   | `npx wrangler versions upload` |
   | Root directory                         | vacío                        |

   El tercero importa: si ahí pones `npx wrangler deploy`, **cualquier push a
   cualquier rama despliega a producción**. Con `versions upload`, las ramas
   generan una vista previa y producción no se toca.

4. Las variables van en **dos sitios distintos** con nombres casi idénticos:

   | Variable          | Dónde                                | Tipo     |
   | ----------------- | ------------------------------------ | -------- |
   | `SETTINGS`        | Settings → **Build**                 | Variable |
   | `RESEND_API_KEY`  | Settings → Variables and Secrets     | Secret   |

   `SETTINGS` la lee Astro al construir; `RESEND_API_KEY` la lee el Worker en
   cada envío del formulario. Ponerlas al revés no da error: simplemente no
   funcionan.

El nombre del Worker (`name` en `wrangler.jsonc`) debe coincidir con el del
panel. Si no, un `wrangler deploy` desde local crea un Worker distinto y vacío.

Desde ahí, cada push a `main` despliega solo y cada pull request genera una URL
de vista previa.

### Entorno de pruebas

`staging.craune.com` es un **Worker distinto** (`craune-staging`), definido en el
bloque `env.staging` de [`wrangler.jsonc`](wrangler.jsonc). Tiene sus propias
variables de build, su propio secreto de Resend y su propio modo, así que puedes
tener producción en obras y staging con la web completa, o al revés.

Se construye desde la rama `staging` y **el entorno se elige al construir, no al
desplegar**:

```bash
CLOUDFLARE_ENV=staging npm run build && npx wrangler deploy
```

Esto es importante y no es lo que uno esperaría. El adaptador de Astro resuelve
`wrangler.jsonc` durante el build y escribe un `dist/server/wrangler.json` ya
aplanado, al que wrangler se redirige. Para cuando corre `deploy`, el bloque
`env` **ya no existe**: `wrangler deploy --env staging` no falla, simplemente
ignora el entorno y **despliega sobre producción**.

Si te equivocas escribiendo el nombre del entorno, el build falla y te lista los
válidos. Ese camino es seguro.

Configuración del Worker de staging en el panel:

| Campo                                  | Valor                                |
| -------------------------------------- | ------------------------------------ |
| Git branch (producción del Worker)     | `staging`                            |
| Build command                          | `CLOUDFLARE_ENV=staging npm run build` |
| Deploy command                         | `npx wrangler deploy`                |
| Build variable `SETTINGS`              | independiente de producción          |
| Secret `RESEND_API_KEY`                | la clave de **desarrollo**           |

En el Worker de producción, excluye la rama `staging` en **Branch control**. Si
no, cada push a `staging` dispara también un build allí.

El acceso se restringe con **Cloudflare Access** (Zero Trust, gratis hasta 50
usuarios): una política sobre `staging.craune.com` que solo deje entrar a
`@craune.com`, con PIN por correo si no quieres configurar proveedor de
identidad. Sin eso, la URL es pública para quien la conozca.

### Opción B — desde tu máquina

```bash
npm run build
npx wrangler deploy
```

### Dominio propio

En el Worker: **Settings → Domains & Routes → Add custom domain**. Si el dominio
está en Cloudflare, el DNS y el certificado HTTPS se configuran solos.

El `www` **no** se añade como segundo dominio del Worker: se redirige al raíz,
para no servir el mismo contenido en dos direcciones. Hacen falta dos piezas,
porque los Redirect Rules solo actúan sobre tráfico proxeado:

1. Un registro `AAAA` en `www` apuntando a `100::` (dirección de descarte del
   RFC 6666, no enruta a ningún sitio) con el **proxy activado**, nube naranja.
2. Un Redirect Rule 301 de `www.craune.com` al raíz, conservando ruta y query
   string.

Cuidado al tocar el DNS: los registros de correo (`MX`, `SPF`, `DKIM`) van en
gris, **DNS only**. Solo los que sirven web van en naranja.

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
