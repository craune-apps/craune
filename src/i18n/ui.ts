/**
 * Todo el texto de la web vive aquí, en los dos idiomas.
 *
 * Los componentes nunca escriben texto directamente: piden `t.seccion.clave`.
 * Así, para cambiar un copy o traducir algo, solo tocas este fichero.
 *
 * Los dos idiomas deben tener exactamente la misma forma; TypeScript
 * te avisará si añades una clave en `es` y te olvidas de ella en `en`.
 */

export const LANGUAGES = {
	es: 'Español',
	en: 'English',
} as const;

export const DEFAULT_LANG = 'es';

export const ui = {
	es: {
		meta: {
			title: 'Craune — Estudio de producto digital',
			description:
				'Craune diseña y construye aplicaciones móviles, plataformas web y productos con IA. Del prototipo al lanzamiento, con un equipo senior y entregas cada semana.',
			ogAlt: 'Craune — Estudio de producto digital',
		},

		nav: {
			services: 'Servicios',
			work: 'Proyectos',
			process: 'Proceso',
			about: 'Nosotros',
			contact: 'Contacto',
			cta: 'Hablemos',
			openMenu: 'Abrir menú',
			closeMenu: 'Cerrar menú',
			skipToContent: 'Saltar al contenido',
			langLabel: 'Cambiar idioma',
		},

		hero: {
			badge: 'Estudio de producto digital',
			titleLead: 'Convertimos ideas en',
			titleAccent: 'producto real',
			subtitle:
				'Craune es un estudio de software. Diseñamos, construimos y lanzamos aplicaciones móviles, plataformas web y productos con IA — los nuestros y los de quienes confían en nosotros.',
			ctaPrimary: 'Cuéntanos tu proyecto',
			ctaSecondary: 'Ver lo que hacemos',
			stats: [
				{ value: '+5', label: 'Productos lanzados' },
				{ value: '4', label: 'Plataformas: iOS, Android, web y API' },
				{ value: '2 sem.', label: 'De la idea al primer prototipo' },
			],
		},

		services: {
			eyebrow: 'Servicios',
			title: 'Todo lo que hace falta para llevar una app a producción',
			subtitle:
				'No subcontratamos las partes difíciles. Diseño, desarrollo, infraestructura y publicación en tiendas los hacemos en casa.',
			items: [
				{
					number: '01',
					title: 'Apps móviles',
					description:
						'iOS y Android, nativo o multiplataforma. Nos encargamos de todo el camino: del primer prototipo a la ficha publicada en la App Store y Google Play.',
					tags: ['Swift', 'Kotlin', 'React Native', 'App Store'],
				},
				{
					number: '02',
					title: 'Web apps y SaaS',
					description:
						'Plataformas, paneles internos y productos de suscripción. Arquitectura pensada para crecer sin reescribirlo todo dentro de un año.',
					tags: ['Astro', 'React', 'Node', 'PostgreSQL'],
				},
				{
					number: '03',
					title: 'IA y automatización',
					description:
						'Agentes, integraciones con modelos de lenguaje y automatizaciones que eliminan el trabajo repetitivo. Con criterio sobre qué merece IA y qué no.',
					tags: ['LLMs', 'Agentes', 'RAG', 'Integraciones'],
				},
				{
					number: '04',
					title: 'Producto propio',
					description:
						'Además de proyectos de cliente, ideamos y lanzamos nuestras propias apps. Eso nos obliga a pensar como dueños del producto, no como proveedores.',
					tags: ['Discovery', 'MVP', 'Growth', 'Métricas'],
				},
			],
		},

		work: {
			eyebrow: 'Proyectos',
			title: 'Algunas cosas que hemos construido',
			subtitle:
				'Una muestra del tipo de producto con el que nos sentimos cómodos. Podemos enseñarte más en una llamada.',
			viewLabel: 'Ver proyecto',
			items: [
				{
					name: 'Proyecto Uno',
					category: 'App móvil · iOS y Android',
					description:
						'Aplicación de reservas con pagos integrados y modo offline. Del diseño al lanzamiento en las dos tiendas en cuatro meses.',
					tags: ['React Native', 'Stripe', 'Offline-first'],
					href: '#contact',
				},
				{
					name: 'Proyecto Dos',
					category: 'Plataforma SaaS',
					description:
						'Panel de gestión multiempresa con roles, facturación recurrente y una API pública documentada para integradores.',
					tags: ['React', 'Node', 'PostgreSQL'],
					href: '#contact',
				},
				{
					name: 'Proyecto Tres',
					category: 'Producto con IA',
					description:
						'Asistente interno que responde sobre la documentación de la empresa y automatiza el triaje de tickets de soporte.',
					tags: ['LLM', 'RAG', 'Automatización'],
					href: '#contact',
				},
			],
		},

		process: {
			eyebrow: 'Cómo trabajamos',
			title: 'Un proceso corto, sin sorpresas y con entregas visibles',
			subtitle:
				'Cada semana ves algo funcionando. Sin meses de silencio y una demo final que no se parece a lo que pediste.',
			steps: [
				{
					number: '01',
					title: 'Entender el problema',
					description:
						'Antes de escribir código, acordamos qué problema resolvemos, para quién y cómo sabremos que ha funcionado.',
				},
				{
					number: '02',
					title: 'Diseñar y prototipar',
					description:
						'Un prototipo navegable que puedes tocar y enseñar. Es mucho más barato cambiar de idea aquí que a medio desarrollo.',
				},
				{
					number: '03',
					title: 'Construir por partes',
					description:
						'Sprints cortos con entregas cada semana en un entorno real. Tú priorizas, nosotros ejecutamos y avisamos pronto si algo se tuerce.',
				},
				{
					number: '04',
					title: 'Lanzar y evolucionar',
					description:
						'Publicación en tiendas, monitorización y métricas desde el día uno. Un producto no termina el día que sale.',
				},
			],
		},

		about: {
			eyebrow: 'Nosotros',
			title: 'Un equipo pequeño y senior, no una fábrica de horas',
			body: [
				'Craune nació de una idea simple: la mayoría de proyectos digitales no fracasan por falta de tecnología, sino porque nadie se hace responsable del producto de principio a fin.',
				'Trabajamos en equipos reducidos donde quien diseña habla con quien programa y con quien va a usar la app. Sin capas de gestión que traducen lo que quisiste decir.',
				'Construimos apps propias, así que sabemos lo que cuesta mantener algo vivo después del lanzamiento. Esa es la perspectiva que traemos a cada proyecto de cliente.',
			],
			values: [
				{ title: 'Sin intermediarios', description: 'Hablas directamente con quien construye tu producto.' },
				{ title: 'Código que se mantiene', description: 'Te entregamos algo que otro equipo puede continuar.' },
				{ title: 'Plazos honestos', description: 'Preferimos decir que no a prometer lo que no llega.' },
				{ title: 'Propiedad total', description: 'El código, las cuentas y los datos son tuyos desde el primer día.' },
			],
		},

		testimonials: {
			eyebrow: 'Confianza',
			title: 'Lo que dicen quienes ya han trabajado con nosotros',
			items: [
				{
					quote:
						'Llegaron con el proyecto a medias y lo dejaron en producción en dos meses. Lo que más valoramos fue la claridad: siempre supimos en qué punto estábamos.',
					author: 'Nombre Apellido',
					role: 'CEO, Empresa Cliente',
				},
				{
					quote:
						'Nos propusieron reducir el alcance de la primera versión para salir antes. Tenían razón: validamos la idea con usuarios reales meses antes de lo previsto.',
					author: 'Nombre Apellido',
					role: 'Head of Product, Empresa Cliente',
				},
				{
					quote:
						'El código que entregaron lo recogió nuestro equipo interno sin fricción. Documentado, con tests y sin sorpresas escondidas.',
					author: 'Nombre Apellido',
					role: 'CTO, Empresa Cliente',
				},
			],
		},

		contact: {
			eyebrow: 'Contacto',
			title: 'Cuéntanos qué tienes en mente',
			subtitle:
				'Escríbenos con dos líneas sobre tu proyecto. Respondemos en menos de 24 horas laborables y te decimos con franqueza si podemos ayudarte.',
			emailLabel: 'Escríbenos a',
			email: 'contact@craune.com',
			responseNote: 'Respuesta en menos de 24 h laborables',
			form: {
				name: 'Nombre',
				namePlaceholder: 'Cómo te llamas',
				email: 'Email',
				emailPlaceholder: 'tu@empresa.com',
				company: 'Empresa',
				companyPlaceholder: 'Opcional',
				budget: 'Presupuesto aproximado',
				budgetOptions: [
					'Aún no lo sé',
					'Menos de 10.000 €',
					'10.000 € – 30.000 €',
					'30.000 € – 75.000 €',
					'Más de 75.000 €',
				],
				message: 'Tu proyecto',
				messagePlaceholder: 'Qué quieres construir, para quién y en qué plazo te gustaría tenerlo.',
				submit: 'Enviar mensaje',
				submitting: 'Enviando…',
				successTitle: '¡Mensaje enviado!',
				successBody: 'Gracias por escribirnos. Te respondemos en menos de 24 horas laborables.',
				errorGeneric:
					'No hemos podido enviar el mensaje. Inténtalo de nuevo o escríbenos directamente a contact@craune.com.',
				errorRequired: 'Rellena nombre, email y mensaje para poder responderte.',
				errorEmail: 'Revisa la dirección de email, parece incompleta.',
				privacy: 'Solo usamos tus datos para responderte. Nada de listas de correo.',
			},
		},

		/* Página a la que llega quien envía el formulario sin JavaScript. */
		thanks: {
			metaTitle: 'Mensaje enviado — Craune',
			title: 'Mensaje enviado',
			body: 'Gracias por escribirnos. Hemos recibido tu mensaje y te respondemos en menos de 24 horas laborables.',
			back: 'Volver al inicio',
		},

		/* Lo único que se ve cuando SETTINGS.inConstruction está activo. */
		construction: {
			metaTitle: 'Craune — Próximamente',
			metaDescription: 'Estamos terminando nuestra web. Vuelve pronto o escríbenos mientras tanto.',
			eyebrow: 'Próximamente',
			title: 'Estamos construyendo',
			body: 'Nos dedicamos a lanzar productos digitales para otros, así que la web de Craune tenía que estar a la altura. Estamos en ello.',
			emailLabel: 'Mientras tanto, escríbenos a',
		},

		footer: {
			tagline: 'Estudio de producto digital. Diseñamos y construimos aplicaciones de principio a fin.',
			navTitle: 'Navegación',
			contactTitle: 'Contacto',
			socialTitle: 'Redes',
			rights: 'Todos los derechos reservados.',
			legal: 'Aviso legal',
			privacy: 'Privacidad',
			builtWith: 'Hecho con Astro y desplegado en Cloudflare.',
		},
	},

	en: {
		meta: {
			title: 'Craune — Digital product studio',
			description:
				'Craune designs and builds mobile apps, web platforms and AI-powered products. From prototype to launch, with a senior team and weekly releases.',
			ogAlt: 'Craune — Digital product studio',
		},

		nav: {
			services: 'Services',
			work: 'Work',
			process: 'Process',
			about: 'About',
			contact: 'Contact',
			cta: "Let's talk",
			openMenu: 'Open menu',
			closeMenu: 'Close menu',
			skipToContent: 'Skip to content',
			langLabel: 'Change language',
		},

		hero: {
			badge: 'Digital product studio',
			titleLead: 'We turn ideas into',
			titleAccent: 'real products',
			subtitle:
				'Craune is a software studio. We design, build and ship mobile apps, web platforms and AI-powered products — our own, and those of the people who trust us with theirs.',
			ctaPrimary: 'Tell us about your project',
			ctaSecondary: 'See what we do',
			stats: [
				{ value: '12+', label: 'Products shipped' },
				{ value: '4', label: 'Platforms: iOS, Android, web and API' },
				{ value: '2 wks', label: 'From idea to first prototype' },
			],
		},

		services: {
			eyebrow: 'Services',
			title: 'Everything it takes to get an app into production',
			subtitle:
				'We do not outsource the hard parts. Design, development, infrastructure and store releases all happen in-house.',
			items: [
				{
					number: '01',
					title: 'Mobile apps',
					description:
						'iOS and Android, native or cross-platform. We handle the whole journey: from the first prototype to a published listing on the App Store and Google Play.',
					tags: ['Swift', 'Kotlin', 'React Native', 'App Store'],
				},
				{
					number: '02',
					title: 'Web apps & SaaS',
					description:
						'Platforms, internal dashboards and subscription products. Architecture built to grow without rewriting everything a year from now.',
					tags: ['Astro', 'React', 'Node', 'PostgreSQL'],
				},
				{
					number: '03',
					title: 'AI & automation',
					description:
						'Agents, language-model integrations and automations that remove repetitive work. With a clear view of what deserves AI and what does not.',
					tags: ['LLMs', 'Agents', 'RAG', 'Integrations'],
				},
				{
					number: '04',
					title: 'Our own products',
					description:
						'Alongside client work, we design and launch our own apps. That forces us to think like product owners rather than vendors.',
					tags: ['Discovery', 'MVP', 'Growth', 'Metrics'],
				},
			],
		},

		work: {
			eyebrow: 'Work',
			title: 'A few things we have built',
			subtitle: 'A sample of the kind of product we are comfortable with. Happy to show you more on a call.',
			viewLabel: 'View project',
			items: [
				{
					name: 'Project One',
					category: 'Mobile app · iOS & Android',
					description:
						'Booking app with integrated payments and offline mode. From design to launch on both stores in four months.',
					tags: ['React Native', 'Stripe', 'Offline-first'],
					href: '#contact',
				},
				{
					name: 'Project Two',
					category: 'SaaS platform',
					description:
						'Multi-tenant management dashboard with roles, recurring billing and a documented public API for integrators.',
					tags: ['React', 'Node', 'PostgreSQL'],
					href: '#contact',
				},
				{
					name: 'Project Three',
					category: 'AI product',
					description:
						'Internal assistant that answers questions over company documentation and automates support ticket triage.',
					tags: ['LLM', 'RAG', 'Automation'],
					href: '#contact',
				},
			],
		},

		process: {
			eyebrow: 'How we work',
			title: 'A short process, no surprises, with visible progress',
			subtitle:
				'Every week you see something running. No months of silence followed by a final demo that looks nothing like what you asked for.',
			steps: [
				{
					number: '01',
					title: 'Understand the problem',
					description:
						'Before any code, we agree on what problem we are solving, for whom, and how we will know it worked.',
				},
				{
					number: '02',
					title: 'Design and prototype',
					description:
						'A clickable prototype you can touch and show around. Changing your mind here is far cheaper than mid-build.',
				},
				{
					number: '03',
					title: 'Build in slices',
					description:
						'Short sprints with weekly releases to a real environment. You prioritise, we execute — and we flag problems early.',
				},
				{
					number: '04',
					title: 'Launch and evolve',
					description:
						'Store submissions, monitoring and metrics from day one. A product does not end the day it ships.',
				},
			],
		},

		about: {
			eyebrow: 'About',
			title: 'A small, senior team — not an hours factory',
			body: [
				'Craune started from a simple observation: most digital projects fail not for lack of technology, but because nobody owns the product end to end.',
				'We work in small teams where the person designing talks to the person coding and to the person who will actually use the app. No layers of management translating what you meant.',
				'We build our own apps too, so we know what it costs to keep something alive after launch. That is the perspective we bring to every client project.',
			],
			values: [
				{ title: 'No middlemen', description: 'You talk directly to the people building your product.' },
				{ title: 'Code that lasts', description: 'We hand over something another team can pick up.' },
				{ title: 'Honest timelines', description: 'We would rather say no than promise what we cannot deliver.' },
				{ title: 'Full ownership', description: 'The code, the accounts and the data are yours from day one.' },
			],
		},

		testimonials: {
			eyebrow: 'Trust',
			title: 'What the people who worked with us say',
			items: [
				{
					quote:
						'They picked up a half-finished project and had it in production within two months. What we valued most was the clarity — we always knew exactly where we stood.',
					author: 'First Last',
					role: 'CEO, Client Company',
				},
				{
					quote:
						'They pushed us to cut the scope of the first release so we could ship sooner. They were right: we validated the idea with real users months ahead of plan.',
					author: 'First Last',
					role: 'Head of Product, Client Company',
				},
				{
					quote:
						'Our in-house team picked up their code without friction. Documented, tested, and no hidden surprises.',
					author: 'First Last',
					role: 'CTO, Client Company',
				},
			],
		},

		contact: {
			eyebrow: 'Contact',
			title: 'Tell us what you have in mind',
			subtitle:
				'Send us a couple of lines about your project. We reply within one business day and tell you honestly whether we can help.',
			emailLabel: 'Email us at',
			email: 'contact@craune.com',
			responseNote: 'Reply within one business day',
			form: {
				name: 'Name',
				namePlaceholder: 'Your name',
				email: 'Email',
				emailPlaceholder: 'you@company.com',
				company: 'Company',
				companyPlaceholder: 'Optional',
				budget: 'Approximate budget',
				budgetOptions: ['Not sure yet', 'Under €10,000', '€10,000 – €30,000', '€30,000 – €75,000', 'Over €75,000'],
				message: 'Your project',
				messagePlaceholder: 'What you want to build, who it is for, and when you would like it live.',
				submit: 'Send message',
				submitting: 'Sending…',
				successTitle: 'Message sent!',
				successBody: 'Thanks for reaching out. We will get back to you within one business day.',
				errorGeneric: 'We could not send your message. Please try again or email us at contact@craune.com.',
				errorRequired: 'Please fill in your name, email and message so we can reply.',
				errorEmail: 'That email address looks incomplete — could you check it?',
				privacy: 'We only use your details to reply. No mailing lists.',
			},
		},

		thanks: {
			metaTitle: 'Message sent — Craune',
			title: 'Message sent',
			body: 'Thanks for reaching out. We have received your message and will get back to you within one business day.',
			back: 'Back to home',
		},

		construction: {
			metaTitle: 'Craune — Coming soon',
			metaDescription: 'We are finishing our site. Check back soon, or write to us in the meantime.',
			eyebrow: 'Coming soon',
			title: 'We are building our own',
			body: 'We spend our days shipping digital products for other people, so the Craune site had to be worth the wait. We are on it.',
			emailLabel: 'In the meantime, write to us at',
		},

		footer: {
			tagline: 'Digital product studio. We design and build applications end to end.',
			navTitle: 'Navigation',
			contactTitle: 'Contact',
			socialTitle: 'Social',
			rights: 'All rights reserved.',
			legal: 'Legal notice',
			privacy: 'Privacy',
			builtWith: 'Built with Astro, deployed on Cloudflare.',
		},
	},
};

export type Lang = keyof typeof ui;

/**
 * El español es la fuente de la verdad: su forma define el tipo `Translation`.
 * La comprobación de abajo hace que el build falle si añades una clave en `es`
 * y te olvidas de traducirla en `en`, en vez de dejar un hueco en la web.
 */
export type Translation = (typeof ui)['es'];

// Falla en `astro check` / `astro build` si a `en` le falta alguna clave de `es`.
ui.en satisfies Translation;
