# Prompt para Claude Design — Rediseño visual completo de ZeltmannHome

> Copia todo lo que hay debajo de la línea y pégalo en Claude Design.

---

## Rol y objetivo

Eres un director de arte y front-end senior especializado en webs de **alquiler vacacional boutique** (nivel Airbnb Luxe / design hotel mediterráneo). Tu misión es **rediseñar visualmente desde cero toda la web de ZeltmannHome** y dejarla moderna, elegante y con carácter. La web actual funciona pero parece una plantilla genérica generada por IA: sin jerarquía, sin alma, con los estilos por defecto de Tailwind. Quiero lo contrario: un sitio donde se note que alguien cuidó cada espacio en blanco, cada tipografía y cada foto.

**No partas de una estética random.** Evoluciona la identidad que ya existe (paleta, tipografías, componentes) hacia una versión mucho más refinada. Reutiliza componentes, no reinventes la marca.

## Sobre el negocio

ZeltmannHome son **dos apartamentos boutique en Nerja** (Costa del Sol): **Casa Florence** y **Casa Isolde**. Los gestiona una familia (Mike y los Zeltmann) que lleva **32 años viviendo en Nerja**. El modelo es **reserva directa por WhatsApp** (número `34609549664`), sin comisiones de intermediarios. Público: parejas y familias europeas que buscan tranquilidad, playa y autenticidad andaluza. Tono: cálido, familiar, mediterráneo, cuidado.

## Identidad actual — CONSÉRVALA y refínala

- **Colores base:** arena `#DCC8A1`, navy profundo `#0B2A44`, blanco roto `#F7F5F2`.
- **Amplía el sistema de color** con: navy medio `#103A5C`, arena oscura `#C9B488`, un verde/oliva mediterráneo sutil como acento opcional, y una **escala de grises derivada del navy** (nada de los grises neutros por defecto de Tailwind, que es lo que abarata el look actual).
- **Tipografías:** Playfair Display (titulares, elegante) + Inter (cuerpo). Cuerpo a **16–18px** (ahora está a 14px y se lee barato). Define una escala tipográfica amplia y con contraste real entre titular y cuerpo. Usa **kickers/eyebrows** en mayúsculas con tracking amplio (ej. `ESTANCIA · NERJA`, `GUÍA DEL HUÉSPED`).
- **Stack:** HTML estático + Tailwind, desplegado en Vercel. Reserva vía WhatsApp. Mapa con Leaflet/OpenStreetMap.

## Dirección visual que busco (el "look")

- **Editorial y con aire:** mucho espacio en blanco, secciones de ancho completo, una idea por pantalla, scroll narrativo (llegada → el espacio → el entorno → reserva). Nada apretado.
- **Ritmo por secciones:** alterna fondos (blanco roto / arena suave / navy oscuro con texto claro) para dar respiración y guiar la lectura. La web actual es una única columna monótona; quiero cadencia.
- **Fotografía protagonista:** imágenes grandes, cálidas, a sangre, con luz natural. Trátalas como el activo principal (es alquiler vacacional: la gente compra con los ojos). Diseña galería por propiedad con lightbox.
- **Detalles boutique:** filetes finos color arena, kickers en mayúsculas, números grandes en Playfair para datos clave (capacidad, camas, baños), microinteracciones **sutiles** (fade/parallax suave, reveal al hacer scroll) — evita el "card lift" genérico de Tailwind.
- **Mapa tonal** en escala arena/gris (estilo suave), no el OSM crudo que se ve técnico. Marcadores de marca y POIs (playas, Balcón de Europa).
- Referencias mentales: Airbnb Plus/Luxe, agencias boutique de Mallorca/Costa del Sol, hoteles de diseño mediterráneos, estética "slow/editorial".

## Componentes que YA existen (reutiliza y mejora, no rehagas de cero)

- **Nav sticky con `backdrop-blur`** → añade logo/isotipo, CTA "Reservar" siempre visible, estado activo y menú móvil (hamburguesa).
- **Hero con imagen + gradiente** → pásalo a `<picture>` + `srcset` (encuadre distinto en móvil), gradiente más marcado para legibilidad, kicker + titular Playfair + un **único** CTA primario.
- **Botón arena (primario) y botón outline (secundario)** → estandariza tamaños/paddings y añade `:focus-visible`.
- **Tarjeta de propiedad** (`rounded-2xl`, sombra suave) → añade precio/rango ("desde X €/noche"), rating, nº de fotos, badge; iguala el contenido entre las dos casas.
- **Pills de amenidades** → con iconos finos, color de marca (no el borde gris genérico).
- **Botón WhatsApp flotante** → burbuja con icono SVG + `aria-label`, texto corto, que no tape otros CTAs.
- **Mapa Leaflet** → coordenadas reales, tiles tonales de marca, POIs como marcadores.
- **Fade-in con IntersectionObserver** → con fallback (contenido visible aunque falle el JS) y respetando `prefers-reduced-motion`.
- **Página `guia.html` (Guía del huésped)** ya rediseñada con tarjetas de **minutos de lectura + resumen desplegable + texto completo expandible**. Úsala como **referencia del nuevo lenguaje visual** y aplica ese mismo nivel de cuidado al resto del sitio. Intégrala coherentemente.

## Problemas concretos a resolver (de una auditoría UX previa)

1. **Sensación de plantilla:** usa los defaults reconocibles de Tailwind (`rounded-2xl`, `shadow-sm`, `hover:-translate-y-1`, gradiente tenue) sin decisiones propias. Dale identidad.
2. **Todo en español:** elimina textos en inglés ("Check Availability" → "Consultar disponibilidad"). Un solo CTA primario por bloque.
3. **Imágenes pobres:** hoy solo hay 1 foto por casa y una está en baja resolución (720×480, JPEG renombrado a `.webp`). Diseña pensando en varias fotos por propiedad y deja **placeholders claros** para cuando lleguen fotos reales en alta resolución.
4. **Casa Isolde casi vacía:** medio catálogo dice "consultar ficha en Airbnb". Diseña estructura para datos reales (capacidad, camas, baños, amenidades) y un estado elegante "próximamente" si falta info.
5. **Conversión:** falta precio/rango, prueba social real (carrusel de reseñas con rating, fecha y fuente), bloque **"Conoce a tus anfitriones"** (la familia, 32 años en Nerja) y un **footer completo** con contacto, **nº de registro turístico VFT** (obligatorio en Andalucía) y enlaces legales.
6. **Confianza:** la FAQ actual remite a Airbnb; reescríbela con respuestas propias. No mandes tráfico a Airbnb desde tu propia web de reserva directa.
7. **Sin voz de marca:** añade historia (quiénes son, por qué Nerja) y microcopys cálidos y creíbles (nada de "Mejor Precio" sin respaldo → "Reserva directa, sin comisiones").

## Accesibilidad y rendimiento (no negociable)

- Contraste **AA** en todo (ojo con arena sobre blanco o sobre foto clara).
- `:focus-visible` visible en todos los interactivos; `aria-label` en el WhatsApp flotante.
- El contenido nunca debe depender del JS para ser visible; respeta `prefers-reduced-motion`.
- Mobile-first y totalmente responsive (nav con hamburguesa, hero art-directed).
- Idealmente **migra de Tailwind CDN a un build** (Tailwind config + PostCSS/Vite) para purgar CSS y mejorar LCP/CLS, manteniendo salida estática para Vercel.

## Entregable

Un sitio estático coherente, moderno y responsive:

1. **Portada rediseñada:** hero editorial → propuesta de valor → propiedades → ubicación/mapa → reseñas → anfitriones → FAQ → footer completo.
2. **Página por propiedad** (Florence e Isolde) con galería + specs + amenidades + CTA de reserva.
3. **Integración de la guía del huésped** (`guia.html`) con su sistema de tarjetas de minutos de lectura.
4. **Sistema de diseño documentado:** tokens de color, escala tipográfica, y componentes reutilizables (botones, tarjetas, pills, kickers, secciones alternas). Que todo se sienta parte de un mismo sistema.

Mantén el alma cálida, familiar y mediterránea. El listón: que al abrir la web se sienta un alojamiento boutique real y cuidado, no una demo.
