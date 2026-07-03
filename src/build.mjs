// Local build: turns the readable Design source (ZeltmannHome.dc.html) into
// self-contained, per-language pages for Vercel.
//
//   node src/build.mjs
//
// Output: index.html (ES, canonical) + <lang>/index.html for every language
// that has a dictionary in src/i18n/<lang>.json. React, ReactDOM, Leaflet and
// the dc-runtime are inlined, so the only runtime external requests are Google
// Fonts and the map tiles. A <base href="/"> keeps asset paths working from the
// language sub-folders.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(join(here, p), 'utf8');

const SITE = 'https://zeltmannhome-nerja.vercel.app'; // change if a custom domain is set
const LANGS = ['es', 'en', 'de', 'fr', 'it', 'ru'];   // display order in the switcher
const LABELS = { es: 'ES', en: 'EN', de: 'DE', fr: 'FR', it: 'IT', ru: 'RU' };

// Per-language <title>/<meta description>. Fallback to ES.
const META = {
  es: { title: 'ZeltmannHome · Casa Florence & Casa Isolde — Apartamentos boutique en Nerja',
        desc: 'Dos apartamentos boutique en Nerja (Costa del Sol): Casa Florence y Casa Isolde. Reserva directa sin comisiones. Playa a 12 min a pie, guía local de la familia Zeltmann.' },
  en: { title: 'ZeltmannHome · Casa Florence & Casa Isolde — Boutique apartments in Nerja',
        desc: 'Two boutique apartments in Nerja (Costa del Sol): Casa Florence and Casa Isolde. Book direct, no fees. Beach 12 min on foot, local guide by the Zeltmann family.' },
  de: { title: 'ZeltmannHome · Casa Florence & Casa Isolde — Boutique-Apartments in Nerja',
        desc: 'Zwei Boutique-Apartments in Nerja (Costa del Sol): Casa Florence und Casa Isolde. Direkt buchen, ohne Gebühren. Strand in 12 Min. zu Fuß, lokaler Guide der Familie Zeltmann.' },
  fr: { title: 'ZeltmannHome · Casa Florence & Casa Isolde — Appartements boutique à Nerja',
        desc: 'Deux appartements boutique à Nerja (Costa del Sol) : Casa Florence et Casa Isolde. Réservation directe, sans commission. Plage à 12 min à pied, guide local de la famille Zeltmann.' },
  it: { title: 'ZeltmannHome · Casa Florence & Casa Isolde — Appartamenti boutique a Nerja',
        desc: 'Due appartamenti boutique a Nerja (Costa del Sol): Casa Florence e Casa Isolde. Prenotazione diretta, senza commissioni. Spiaggia a 12 min a piedi, guida locale della famiglia Zeltmann.' },
  ru: { title: 'ZeltmannHome · Casa Florence и Casa Isolde — бутик-апартаменты в Нерхе',
        desc: 'Два бутик-апартамента в Нерхе (Коста-дель-Соль): Casa Florence и Casa Isolde. Прямое бронирование без комиссий. Пляж в 12 минутах пешком, гид от семьи Зельтманн.' }
};

const source = read('ZeltmannHome.dc.html');
const react = read('vendor/react.production.min.js');
const reactDom = read('vendor/react-dom.production.min.js');
const leafletJs = read('vendor/leaflet.js');
const leafletCss = read('vendor/leaflet.css');
// The dc-runtime hot-reloads by re-fetching location.href and re-parsing the
// <x-dc> template. In a self-contained page the inlined runtime source itself
// contains "<x-dc>"/"</x-dc>" literals, so that re-parse grabs the runtime code
// as the template and renders it as text. Disable the self-refetch — pointless
// for a static build. (Only fires over HTTP, e.g. on Vercel.)
let support = read('support.js');
{
  const needle = 'fetch(location.href).then((res) => res.ok ? res.text() : "")';
  if (!support.includes(needle)) throw new Error('build: could not find runtime self-refetch to disable');
  support = support.split(needle).join('Promise.resolve("")');
}

for (const [name, code] of Object.entries({ react, reactDom, leafletJs, support })) {
  if (/<\/script/i.test(code)) throw new Error(`vendor ${name} contains </script> — cannot inline safely`);
}

const INLINE_VENDORS =
  `<style>\n${leafletCss}\n</style>\n` +
  `<script>${react}</script>\n` +
  `<script>${reactDom}</script>\n` +
  `<script>${leafletJs}</script>\n` +
  `<script>${support}</script>`;

// Which languages actually have a dictionary?
const dicts = {};
for (const l of LANGS) {
  if (l === 'es') continue;
  const p = join(here, 'i18n', `${l}.json`);
  if (existsSync(p)) dicts[l] = JSON.parse(readFileSync(p, 'utf8'));
}
const built = LANGS.filter((l) => l === 'es' || dicts[l]);

const langPath = (l) => (l === 'es' ? '/' : `/${l}/`);

function switcher(current, variant) {
  const items = built.map((l) => {
    if (l === current) {
      const col = variant === 'mobile' ? '#F7F5F2' : '{{ navInk }}';
      return `<span style="color:${col};opacity:1;text-decoration:underline;text-underline-offset:3px">${LABELS[l]}</span>`;
    }
    const col = variant === 'mobile' ? 'rgba(247,245,242,.6)' : '{{ navInk }}';
    const op = variant === 'mobile' ? '1' : '.5';
    return `<a href="${langPath(l)}" hreflang="${l}" style="color:${col};opacity:${op};text-decoration:none">${LABELS[l]}</a>`;
  }).join(variant === 'mobile' ? '' : '');
  if (variant === 'mobile') {
    return `<div style="display:flex;flex-wrap:wrap;gap:18px;margin:24px 0 8px;font-size:15px;font-weight:600;letter-spacing:.05em">${items}</div>`;
  }
  return `<span style="display:inline-flex;align-items:center;gap:9px;margin:0 4px 0 10px;font-size:11.5px;font-weight:600;letter-spacing:.06em">${items}</span>`;
}

function hreflangs() {
  const alts = built.map((l) => `  <link rel="alternate" hreflang="${l}" href="${SITE}${langPath(l)}">`);
  alts.push(`  <link rel="alternate" hreflang="x-default" href="${SITE}/">`);
  return alts.join('\n');
}

// Apply the dictionary. `esc` escapes apostrophes in the replacement value so
// it is safe inside single-quoted JS string literals (the data script region).
function applyDict(text, dict, esc) {
  const keys = Object.keys(dict).filter((k) => k[0] !== '@').sort((a, b) => b.length - a.length);
  for (const k of keys) {
    const v = esc ? dict[k].replace(/\\/g, '\\\\').replace(/'/g, "\\'") : dict[k];
    text = text.split(k).join(v);
  }
  return text;
}

function buildLang(lang) {
  const dict = dicts[lang];
  const meta = META[lang] || META.es;
  let html = source;

  // 1) translate content. Split at the data-script boundary: in the JS region
  //    apostrophes in values must be escaped (single-quoted string literals);
  //    in the HTML template region they are plain text.
  if (dict) {
    for (const k of Object.keys(dict)) {
      if (k[0] !== '@' && !source.includes(k)) console.warn(`  [warn] ${lang}: key not found: ${JSON.stringify(k.slice(0, 46))}`);
    }
    // Everything up to </x-dc> is the HTML template; after it lives the
    // data <script> (single-quoted JS literals that need apostrophe escaping).
    const cut = source.indexOf('</x-dc>');
    if (cut < 0) throw new Error('could not find </x-dc> boundary');
    const tpl = applyDict(source.slice(0, cut), dict, false);
    const scr = applyDict(source.slice(cut), dict, true);
    html = tpl + scr;
  }

  // 2) language switcher
  html = html.split('<!--LANG-SWITCHER-->').join(switcher(lang, 'desktop'));
  html = html.split('<!--LANG-SWITCHER-MOBILE-->').join(switcher(lang, 'mobile'));

  // 3) <html lang>
  html = html.replace('<html>', () => `<html lang="${lang}">`);

  // 4) head: base, SEO, hreflang
  const SEO = `
  <base href="/">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.desc.replace(/"/g, '&quot;')}">
  <meta property="og:title" content="ZeltmannHome · Nerja">
  <meta property="og:description" content="${meta.desc.replace(/"/g, '&quot;')}">
  <meta property="og:type" content="website">
  <meta name="theme-color" content="#0B2A44">
  <link rel="canonical" href="${SITE}${langPath(lang)}">
${hreflangs()}`;
  html = html.replace('<meta charset="utf-8">', () => '<meta charset="utf-8">' + SEO);

  // 5) inline vendors
  if (!html.includes('<script src="./support.js"></script>')) throw new Error('support.js tag not found');
  html = html.replace('<script src="./support.js"></script>', () => INLINE_VENDORS);

  // 6) drop unpkg leaflet from the helmet (inlined now)
  html = html
    .replace('<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">\n', '')
    .replace('<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>\n', '');

  const outDir = lang === 'es' ? join(here, '..') : join(here, '..', lang);
  if (lang !== 'es') mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
  console.log(`  ${lang} -> ${lang === 'es' ? 'index.html' : lang + '/index.html'} (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB)`);
}

console.log('Building languages:', built.join(', '));
for (const l of built) buildLang(l);
console.log('Done.');
