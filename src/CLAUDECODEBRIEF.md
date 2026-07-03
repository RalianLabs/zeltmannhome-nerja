# ZeltmannHome · Handoff a Claude Code

Rediseño completo de la web de ZeltmannHome (dos apartamentos boutique en Nerja).
Objetivo de esta fase: **subir el nuevo diseño a Vercel** e **integrar las fotos reales
desde Google Drive**, además de rematar los pendientes.

Repo de producción: https://github.com/RalianLabs/zeltmannhome-nerja
Web actual (solo referencia de fotos de Nerja): https://zeltmannhome-nerja.vercel.app

---

## 1. Qué archivos recibes

- **`index.html`** — Web completa y **autocontenida** (un solo archivo, sin dependencias
  externas salvo Google Fonts y los tiles del mapa). Se puede desplegar tal cual en Vercel.
  Contiene: portada, ficha de Casa Florence, ficha de Casa Isolde y Guía del huésped,
  todo en una sola página con navegación por JS (no recarga).
- **`ZeltmannHome.dc.html`** — Archivo **fuente** editable. `index.html` se genera a partir
  de este. Si vas a hacer cambios grandes, edítalos aquí y vuelve a compilar; si son cambios
  puntuales (sustituir imágenes, textos), puedes tocar `index.html` directamente.
- **`support.js`** — Runtime que usa el fuente. No hace falta para el `index.html` bundleado.

### Deploy en Vercel
El sitio es estático. Basta con servir `index.html` en la raíz. Si mantienes la estructura
del repo actual, renombra/ubica el nuevo `index.html` como página principal y haz push.
No requiere build. (Opcional recomendado más abajo: migrar a build de Tailwind.)

---

## 2. Fotos desde Google Drive  ← TAREA PRINCIPAL

Las fotos de cada apartamento están en carpetas de Google Drive del cliente.
Hay **placeholders** claramente marcados en el código donde deben ir.

### Dónde van las imágenes

**a) Slideshow del hero (portada)** — carrusel automático de fotos de **Nerja**
(no de las casas). En el fuente está el array `heroSlides` (5 entradas). Sustituye cada
bloque de degradado por un `<img>` con la foto de Nerja. Buenas fotos: Balcón de Europa,
Playa Burriana, Frigiliana, Cuevas de Nerja, calas de Maro. Toma como referencia visual
las fotos de la web actual (zeltmannhome-nerja.vercel.app).
- El slideshow ya funciona (crossfade cada ~5 s, barras de navegación, respeta
  `prefers-reduced-motion`). Solo hay que meter las imágenes.

**b) Galería de cada ficha de propiedad** — 6 fotos por casa. En el fuente, cada
propiedad (`florence` / `isolde`) tiene un array `gallery` con `{label, ratio}`.
Añade la ruta de imagen a cada entrada y píntala en el `<button>` de la galería
(ahora es un degradado). El **lightbox** ya está montado: al hacer clic amplía; solo
necesita que el `<img>` real esté dentro.
  - Florence: salón, dormitorio, cocina, salón con sofás cama, baño, detalle.
  - Isolde: salón, dormitorio principal, dormitorio de 2 camas, cocina, baño, detalle.

**c) Tarjetas de las casas (portada)** y **teaser de la guía** — cada una tiene una
zona de imagen con degradado que conviene sustituir por una foto real.

### Recomendaciones técnicas al integrar las fotos
- Descarga de Drive, **optimiza** (WebP + fallback JPG, ~1600px lado largo, calidad ~78)
  y guárdalas en `/public/img/florence/`, `/public/img/isolde/`, `/public/img/nerja/`.
- Usa `<picture>` con `srcset` (una versión móvil recortada distinta para el hero).
- `loading="lazy"` en galería, `fetchpriority="high"` en la primera del hero.
- `alt` descriptivo en todas (accesibilidad + SEO).
- Mantén los `aspect-ratio` que ya trae cada slot para no romper el layout (CLS).

---

## 3. Pendientes que faltan por cerrar

1. **Reseñas reales.** Ahora hay 5 de ejemplo (array `reviews` en el fuente) con un aviso
   visible de que son de muestra. Sustituir por las verificadas reales
   (nombre, fuente: Airbnb/Booking/Google, fecha, rating, texto) y **borrar el aviso**
   (`Reseñas de ejemplo…`) y el de "por confirmar" si queda alguno.
2. **Precios / disponibilidad (Smoobu).** Ahora no se muestran precios (por decisión del
   cliente hasta conectar Smoobu). Cuando se conecte el channel manager, valorar mostrar
   "desde X €/noche" en las tarjetas y ficha, o un widget de disponibilidad. El CTA actual
   es WhatsApp directo (+34 609 549 664), que debe mantenerse siempre.
3. **Enlaces legales del footer** (Aviso legal / Privacidad / Cookies) están como `#`.
   Crear las páginas o enlazarlas.
4. **Verificar tiempos a pie** de los POIs del mapa (`pois` en el fuente): están estimados
   (~12 min a la playa desde Joaquín Herrera). Ajustar si el cliente da los reales.

---

## 4. Datos de referencia (ya reflejados en el diseño — no cambiar sin confirmar)

- **Ubicación:** Calle Joaquín Herrera, blq. 4 — **bajo A = Casa Isolde**, **bajo B = Casa
  Florence**, Nerja (Málaga). Es una **zona residencial tranquila y familiar**, NO el casco
  antiguo. Playa a ~12 min a pie, centro a pocos minutos.
- **Casa Florence** — VFT **VUT/MA/97533**. 65 m². Hasta 6 personas. 1 dormitorio (cama de
  matrimonio grande) + 2 sofás cama individuales en el salón. 1 baño. Reformada hace ~10 meses.
- **Casa Isolde** — VFT **VUT/MA/97478**. 55 m². Hasta 4 personas. 2 dormitorios
  (1 de matrimonio + 1 con dos camas individuales). 1 baño. Reformada hace ~10 meses.
- **Amenidades (ambas):** WiFi fibra, A/C + calefacción por conductos, cocina totalmente
  equipada, Smart TV 65" + TV en dormitorio, lavadora y lavavajillas, ropa de cama y toallas,
  check-in personal con el propietario (acceso autónomo si llegada de madrugada),
  detector de humo y botiquín.
- **Contacto / reserva:** WhatsApp directo **+34 609 549 664**. Reserva directa, sin comisiones.
- **Idiomas de atención:** Español, Inglés, Alemán, Francés, Italiano.
- **Mascotas:** no se admiten.
- **Guía del huésped:** ya redactada como tarjetas web (Nerja, Playas, Dónde comer,
  Desayunos, Pueblos blancos, Llegada/parking, Contacto). Todo lo que el cliente antes
  mandaba por WhatsApp está aquí en formato consultable con minutos de lectura + desplegable.

---

## 5. Sistema de diseño (mantener)

- **Colores:** navy profundo `#0B2A44`, navy medio `#103A5C`, navy oscuro (footer) `#08202F`,
  arena `#DCC8A1`, arena oscura `#C9B488`, arena texto `#B49B6A`, blanco roto `#F7F5F2`,
  crema secciones `#EFE7D6`, grises derivados del navy (`#40576B`, `#6B7F8F`, `#8A9BA8`).
- **Tipografías:** Playfair Display (titulares) + Inter (cuerpo, 16–18px).
- **Kickers** en mayúsculas con tracking amplio, números grandes en Playfair para datos.
- **Ritmo de fondos** alternos (blanco roto / crema arena / navy) para dar aire.
- Mapa Leaflet con tiles tonales (CARTO light) y marcadores de marca.
- Reveal al scroll (mejora CSS, el contenido es visible sin JS), `:focus-visible`,
  WhatsApp flotante con `aria-label`. Mobile-first.

### Opcional recomendado
Migrar de Tailwind CDN a un build real (Tailwind config + PostCSS/Vite) para purgar CSS
y mejorar LCP/CLS, manteniendo salida estática para Vercel. El diseño actual usa estilos
inline; si prefieres, extrae a clases/utilidades al portarlo al repo.
