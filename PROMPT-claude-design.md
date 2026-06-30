# Prompt para Claude Design — Rediseño de ZeltmannHome

> Copia y pega todo lo que hay debajo de la línea en Claude Design.

---

Eres un diseñador de producto y front-end senior especializado en webs de alquiler vacacional **boutique** (estilo Airbnb Plus / design hotel mediterráneo). Vas a rediseñar desde cero la web de **ZeltmannHome**, dos apartamentos en Nerja (Casa Florence y Casa Isolde) con reserva directa por WhatsApp. El objetivo es pasar de una web que parece "plantilla genérica de IA" a un sitio con alma, intención de diseño y aire boutique, **reutilizando los componentes y la identidad que ya existen** (esto es importante: no reinventes la marca, evoluciónala).

## Identidad ya existente (CONSÉRVALA y AMPLÍALA)
- **Paleta:** arena `#DCC8A1`, navy `#0B2A44`, fondo blanco roto `#F7F5F2`. Amplía con: navy medio `#103A5C`, arena oscura `#C9B488`, y una escala de grises **derivada del navy** (no los grises por defecto de Tailwind).
- **Tipografías:** Playfair Display (titulares) + Inter (cuerpo). Cuerpo a 16–18px, no 14px. Define una escala tipográfica clara con kickers/eyebrows en mayúsculas con tracking amplio (ej. `ESTANCIA · NERJA`).
- **Stack actual:** HTML estático + Tailwind. WhatsApp como canal de reserva (número `34609549664`). Mapa Leaflet/OpenStreetMap. Desplegado en Vercel.

## Componentes que YA tenemos (reutiliza/mejora, no los rehagas de cero)
- Nav sticky con `backdrop-blur` → añadir CTA "Reservar", estado activo y menú móvil (hamburguesa).
- Hero con imagen + gradiente → mejorar a `<picture>` + srcset, gradiente más marcado, kicker + un solo CTA primario.
- Botón arena (CTA primario) y botón outline (secundario) → estandarizar tamaños y añadir `:focus-visible`.
- Tarjeta de propiedad (`rounded-2xl`, sombra suave, hover lift) → añadir precio/rating/nº de fotos, igualar contenido entre las dos.
- Pills de amenidades → añadir iconos.
- Botón WhatsApp flotante → convertir en burbuja con icono SVG + `aria-label`, sin tapar otros CTAs.
- Mapa Leaflet → coordenadas reales, tiles tonales de marca, POIs como marcadores.
- Fade-in con IntersectionObserver → con fallback (contenido visible sin JS) y respetando `prefers-reduced-motion`.
- **Página nueva `guia.html`** (Guía del huésped) con tarjetas de minutos de lectura + resumen desplegable + texto completo expandible: ya tiene el estilo objetivo. **Úsala como referencia del nuevo lenguaje visual** y aplica ese mismo nivel de cuidado al resto del sitio.

## Problemas a resolver (de una auditoría UX previa)
1. **Sensación de plantilla:** usa los defaults reconocibles de Tailwind sin decisiones propias. Quiero ritmo visual: alternar fondos (arena suave / blanco / navy), secciones de ancho completo, mucho espacio en blanco, una idea por pantalla, scroll narrativo (llegada → el espacio → el entorno → reserva).
2. **Mezcla de idiomas:** todo en español. "Check Availability" → "Consultar disponibilidad". Un solo CTA primario por bloque.
3. **Imágenes pobres:** solo 1 foto por propiedad y una en baja resolución (720×480), además son JPEG renombrados a `.webp`. Diseña pensando en **galería por propiedad** (grid + lightbox) y placeholders claros para cuando lleguen fotos reales en alta resolución.
4. **Casa Isolde vacía:** medio catálogo dice "consultar ficha en Airbnb". Diseña la estructura para datos reales (capacidad, camas, baños, amenidades) y un estado elegante para "próximamente" si faltan datos.
5. **Conversión:** falta precio/rango ("desde X €/noche"), prueba social real (carrusel de reseñas con rating, fecha y fuente), bloque "Conoce a tus anfitriones" (Mike y familia, 32 años en Nerja), y un footer con contacto + **nº de registro turístico VFT** (obligatorio en Andalucía) + enlaces legales.
6. **Confianza:** la FAQ remite a Airbnb; reescríbela con respuestas propias. No envíes tráfico a Airbnb desde tu propia web de reserva directa.
7. **Accesibilidad:** `:focus-visible` visible, contraste AA (ojo con arena sobre blanco/foto), `aria-label` en WhatsApp, semántica de amenidades, y que el contenido nunca dependa del JS para ser visible.

## Referencias de estilo (el look que busco)
- Airbnb Plus/Luxe boutique: fotografía editorial a sangre, serif en titulares, rating siempre visible, mucho aire.
- Agencia boutique mediterránea (Mallorca/Costa del Sol): tierra/arena/blanco roto con acento navy, filetes finos, kickers en mayúsculas con tracking.
- Design hotel: secciones split 50/50 imagen-texto, números grandes en Playfair para datos clave, microinteracciones sutiles (no el "card lift" genérico).
- Mapa tonal (estilo arena/gris), no el OSM crudo que se ve "técnico".

## Entregable
Un sitio estático coherente y responsive (mobile-first) con:
- Portada rediseñada (hero, propuesta de valor, propiedades, ubicación/mapa, reseñas, anfitriones, FAQ, footer completo).
- Las dos páginas de propiedad (Florence e Isolde) con galería y specs.
- Integración con la guía del huésped existente (`guia.html`) manteniendo su sistema de tarjetas con minutos de lectura.
- Sistema de diseño documentado: tokens de color, escala tipográfica, componentes (botones, tarjetas, pills, kickers).
- Idealmente migrar de Tailwind CDN a un build (Tailwind config + PostCSS/Vite) para purgar CSS y mejorar rendimiento (LCP/CLS), manteniendo la salida estática para Vercel.

Mantén el tono cálido, familiar y mediterráneo. Que se note la mano de alguien que cuidó cada espacio en blanco.
