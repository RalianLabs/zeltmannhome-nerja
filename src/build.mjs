// Local build: turns the readable Design source (ZeltmannHome.dc.html) into a
// self-contained ../index.html for Vercel.
//
//   node src/build.mjs
//
// It inlines React, ReactDOM, Leaflet (JS+CSS) and the dc-runtime (support.js)
// so the deployed page has NO runtime dependency on unpkg. The only external
// requests left at runtime are Google Fonts and the map tiles (CARTO/OSM),
// which is the intended design. Vendor files live in src/vendor/.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(join(here, p), 'utf8');

const source   = read('ZeltmannHome.dc.html');
const react    = read('vendor/react.production.min.js');
const reactDom = read('vendor/react-dom.production.min.js');
const leafletJs  = read('vendor/leaflet.js');
const leafletCss = read('vendor/leaflet.css');
const support  = read('support.js');

for (const [name, code] of Object.entries({ react, reactDom, leafletJs, support })) {
  if (/<\/script/i.test(code)) throw new Error(`vendor ${name} contains </script> — cannot inline safely`);
}

const SEO = `
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>ZeltmannHome · Casa Florence & Casa Isolde — Apartamentos boutique en Nerja</title>
  <meta name="description" content="Dos apartamentos boutique en Nerja (Costa del Sol): Casa Florence y Casa Isolde. Reserva directa sin comisiones. Playa a 12 min a pie, guía local de la familia Zeltmann.">
  <meta property="og:title" content="ZeltmannHome · Nerja">
  <meta property="og:description" content="Apartamentos boutique en Nerja. Reserva directa, sin comisiones.">
  <meta property="og:type" content="website">
  <meta name="theme-color" content="#0B2A44">`;

const INLINE_VENDORS =
  `<style>\n${leafletCss}\n</style>\n` +
  `<script>${react}</script>\n` +
  `<script>${reactDom}</script>\n` +
  `<script>${leafletJs}</script>\n` +
  `<script>${support}</script>`;

let html = source;

// 1) html lang
html = html.replace('<html>', '<html lang="es">');

// 2) inject SEO right after charset meta
//    Use function replacers everywhere so `$` sequences inside the vendor code
//    (e.g. React's minified `"$&/"`) are NOT interpreted as replacement patterns.
html = html.replace('<meta charset="utf-8">', () => '<meta charset="utf-8">' + SEO);

// 3) replace the external runtime <script src="./support.js"> with all inlined vendors
if (!html.includes('<script src="./support.js"></script>')) {
  throw new Error('could not find support.js script tag in source');
}
html = html.replace('<script src="./support.js"></script>', () => INLINE_VENDORS);

// 4) drop the unpkg Leaflet <link>/<script> from the helmet (leaflet is now inlined)
html = html
  .replace('<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">\n', '')
  .replace('<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>\n', '');

if (html.includes('unpkg.com')) {
  console.warn('WARNING: unpkg.com still referenced somewhere in the output');
}

writeFileSync(join(here, '..', 'index.html'), html);
console.log('Built ../index.html —', (Buffer.byteLength(html) / 1024).toFixed(0) + ' KB');
