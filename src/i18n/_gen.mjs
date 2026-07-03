// Generates src/i18n/<lang>.json (keyed by the Spanish source strings that the
// build replaces) from compact English->translation maps in src/i18n/_maps/.
// Run: node src/i18n/_gen.mjs   (then rebuild with node src/build.mjs)
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const en = JSON.parse(readFileSync(join(here, 'en.json'), 'utf8'));

// English value -> Spanish source key (the key the build searches for).
const esByEn = {};
for (const [k, v] of Object.entries(en)) if (k[0] !== '@') esByEn[v] = k;

for (const f of readdirSync(join(here, '_maps'))) {
  if (!f.endsWith('.json')) continue;
  const lang = f.replace('.json', '');
  const map = JSON.parse(readFileSync(join(here, '_maps', f), 'utf8'));
  const out = {};
  const missing = [];
  for (const [enVal, esKey] of Object.entries(esByEn)) {
    if (map[enVal] === undefined) { missing.push(enVal); continue; }
    out[esKey] = map[enVal];
  }
  writeFileSync(join(here, lang + '.json'), JSON.stringify(out, null, 2) + '\n');
  console.log(`${lang}: ${Object.keys(out).length} entries, ${missing.length} missing`);
  for (const m of missing) console.log('   MISSING:', JSON.stringify(m.slice(0, 60)));
}
