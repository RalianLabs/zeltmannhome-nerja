// Generates the standalone legal pages (../aviso-legal.html, ../privacidad.html,
// ../cookies.html) with brand-consistent styling.  Run: node src/legal.mjs
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const here = dirname(fileURLToPath(import.meta.url));

// Fields the owner still needs to confirm are wrapped so they are easy to find.
const TODO = (t) => `<mark style="background:#F3E1C0;color:#0B2A44;padding:0 4px">${t}</mark>`;

const TITULAR = TODO('[Titular: nombre y apellidos o razón social]');
const NIF = TODO('[NIF/DNI]');
const EMAIL = TODO('[correo de contacto]');
const DIRECCION = 'Calle Joaquín Herrera, blq. 4, 29780 Nerja (Málaga)';
const WA = '+34 609 549 664';

const page = (title, bodyHtml) => `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} · ZeltmannHome</title>
<meta name="robots" content="index,follow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{--navy:#0B2A44;--navy2:#103A5C;--sand:#DCC8A1;--sanddark:#C9B488;--bg:#F7F5F2;--ink:#40576B}
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:Inter,system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--navy);line-height:1.7}
  header{position:sticky;top:0;background:rgba(247,245,242,.86);backdrop-filter:blur(8px);border-bottom:1px solid rgba(11,42,68,.1)}
  .bar{max-width:900px;margin:0 auto;padding:16px 22px;display:flex;align-items:center;justify-content:space-between}
  .brand{font-family:'Playfair Display',serif;font-weight:600;font-size:20px;color:var(--navy);text-decoration:none}
  .back{font-size:14px;color:var(--navy2);text-decoration:none;font-weight:500}
  main{max-width:900px;margin:0 auto;padding:clamp(40px,7vw,80px) 22px 60px}
  .kicker{font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#B49B6A;margin-bottom:14px}
  h1{font-family:'Playfair Display',serif;font-weight:700;font-size:clamp(32px,5vw,46px);line-height:1.1;color:var(--navy);margin-bottom:10px}
  .updated{font-size:13.5px;color:#6B7F8F;margin-bottom:36px}
  h2{font-family:'Playfair Display',serif;font-weight:600;font-size:22px;color:var(--navy);margin:34px 0 10px}
  p,li{font-size:16px;color:var(--ink);margin-bottom:12px}
  ul{padding-left:20px;margin-bottom:12px}
  a{color:var(--navy2)}
  table{border-collapse:collapse;width:100%;margin:12px 0;font-size:14.5px}
  th,td{border:1px solid rgba(11,42,68,.15);padding:8px 10px;text-align:left;vertical-align:top}
  th{background:rgba(220,200,161,.25)}
  footer{border-top:1px solid rgba(11,42,68,.1);margin-top:50px}
  .foot{max-width:900px;margin:0 auto;padding:26px 22px;font-size:13px;color:#6B7F8F;display:flex;flex-wrap:wrap;gap:16px;justify-content:space-between}
  .foot a{color:#6B7F8F;text-decoration:none;margin-right:16px}
</style>
</head>
<body>
<header><div class="bar">
  <a class="brand" href="index.html">ZeltmannHome</a>
  <a class="back" href="index.html">← Volver a la web</a>
</div></header>
<main>
${bodyHtml}
</main>
<footer><div class="foot">
  <span>© 2026 ZeltmannHome · Nerja, Costa del Sol</span>
  <span>
    <a href="aviso-legal.html">Aviso legal</a>
    <a href="privacidad.html">Privacidad</a>
    <a href="cookies.html">Cookies</a>
  </span>
</div></footer>
</body>
</html>`;

const avisoLegal = page('Aviso legal', `
  <div class="kicker">Información legal</div>
  <h1>Aviso legal</h1>
  <p class="updated">Última actualización: julio de 2026</p>

  <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se ponen a disposición de los usuarios los siguientes datos de información general de este sitio web.</p>

  <h2>1. Titular del sitio web</h2>
  <ul>
    <li><strong>Titular:</strong> ${TITULAR}</li>
    <li><strong>NIF/DNI:</strong> ${NIF}</li>
    <li><strong>Domicilio:</strong> ${DIRECCION}</li>
    <li><strong>Contacto:</strong> WhatsApp ${WA} · ${EMAIL}</li>
    <li><strong>Actividad:</strong> alquiler de viviendas de uso turístico en Nerja (Málaga).</li>
  </ul>
  <p>Las viviendas se encuentran inscritas en el Registro de Turismo de Andalucía con los siguientes números de registro:</p>
  <ul>
    <li><strong>Casa Florence</strong> — VFT: VUT/MA/97533</li>
    <li><strong>Casa Isolde</strong> — VFT: VUT/MA/97478</li>
  </ul>

  <h2>2. Condiciones de uso</h2>
  <p>El acceso y la navegación por este sitio web atribuyen la condición de usuario e implican la aceptación de las condiciones recogidas en este Aviso legal. El usuario se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para incurrir en actividades ilícitas o contrarias a la buena fe.</p>

  <h2>3. Propiedad intelectual e industrial</h2>
  <p>Los contenidos de este sitio web —textos, fotografías, diseño gráfico, código y marcas— son titularidad del titular del sitio o de terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución o transformación sin autorización expresa.</p>

  <h2>4. Responsabilidad</h2>
  <p>El titular no se responsabiliza de los daños que pudieran derivarse del uso de la información contenida en este sitio, ni del contenido de páginas de terceros a las que se pueda acceder mediante enlaces (por ejemplo, WhatsApp, Airbnb, Booking o los mapas). El titular procura mantener la información actualizada, pero no garantiza la ausencia de errores.</p>

  <h2>5. Legislación aplicable</h2>
  <p>Este Aviso legal se rige por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a derecho.</p>
`);

const privacidad = page('Política de privacidad', `
  <div class="kicker">Protección de datos</div>
  <h1>Política de privacidad</h1>
  <p class="updated">Última actualización: julio de 2026</p>

  <p>De acuerdo con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), se informa sobre el tratamiento de los datos personales que los usuarios puedan facilitar.</p>

  <h2>1. Responsable del tratamiento</h2>
  <ul>
    <li><strong>Responsable:</strong> ${TITULAR}</li>
    <li><strong>NIF/DNI:</strong> ${NIF}</li>
    <li><strong>Domicilio:</strong> ${DIRECCION}</li>
    <li><strong>Contacto:</strong> WhatsApp ${WA} · ${EMAIL}</li>
  </ul>

  <h2>2. Datos que tratamos y finalidad</h2>
  <p>Este sitio web es meramente informativo y <strong>no dispone de formularios ni recoge datos de forma automática</strong>. El contacto y las reservas se gestionan a través de WhatsApp. Si el usuario decide escribirnos por WhatsApp, trataremos los datos que nos facilite (nombre, número de teléfono y el contenido de su mensaje) con la finalidad de atender su consulta y, en su caso, gestionar la reserva de alojamiento.</p>

  <h2>3. Legitimación</h2>
  <p>La base jurídica del tratamiento es la aplicación de medidas precontractuales y la ejecución del contrato de alojamiento a petición del interesado (art. 6.1.b RGPD), así como el consentimiento del usuario al iniciar el contacto (art. 6.1.a RGPD).</p>

  <h2>4. Conservación</h2>
  <p>Los datos se conservarán durante el tiempo necesario para atender la consulta o gestionar la reserva y, posteriormente, durante los plazos legalmente exigibles (por ejemplo, obligaciones fiscales y de registro turístico).</p>

  <h2>5. Destinatarios</h2>
  <p>Las comunicaciones se realizan a través de WhatsApp (Meta Platforms Ireland Ltd.), que actúa como proveedor del canal de mensajería conforme a su propia política de privacidad. No se ceden datos a otros terceros salvo obligación legal. Los datos de registro de viajeros que exija la normativa se comunicarán a las autoridades competentes cuando proceda.</p>

  <h2>6. Derechos</h2>
  <p>El usuario puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad dirigiéndose a ${EMAIL} o al WhatsApp ${WA}. Asimismo, puede presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener">www.aepd.es</a>).</p>

  <h2>7. Servicios de terceros</h2>
  <p>Este sitio carga tipografías desde Google Fonts y muestra un mapa con cartografía de OpenStreetMap/CARTO. Estos proveedores pueden registrar la dirección IP por motivos técnicos de entrega del contenido. Consulta también nuestra <a href="cookies.html">Política de cookies</a>.</p>
`);

const cookies = page('Política de cookies', `
  <div class="kicker">Cookies</div>
  <h1>Política de cookies</h1>
  <p class="updated">Última actualización: julio de 2026</p>

  <h2>1. ¿Qué son las cookies?</h2>
  <p>Una cookie es un pequeño archivo que un sitio web guarda en el navegador del usuario para almacenar o recuperar información. Se utilizan, entre otros fines, para recordar preferencias o medir el uso del sitio.</p>

  <h2>2. Cookies utilizadas en este sitio</h2>
  <p>Este sitio web <strong>no instala cookies propias</strong> de análisis, publicidad ni seguimiento. No utilizamos Google Analytics ni herramientas de perfilado.</p>
  <p>Sí se cargan recursos de terceros necesarios para mostrar la página, que pueden tratar datos técnicos (como la dirección IP) por sí mismos:</p>
  <table>
    <tr><th>Proveedor</th><th>Finalidad</th><th>Más información</th></tr>
    <tr><td>Google Fonts</td><td>Entrega de las tipografías del sitio</td><td><a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Política de Google</a></td></tr>
    <tr><td>OpenStreetMap / CARTO</td><td>Mapa de ubicación</td><td><a href="https://openstreetmap.org/copyright" target="_blank" rel="noopener">OSM</a> · <a href="https://carto.com/privacy/" target="_blank" rel="noopener">CARTO</a></td></tr>
    <tr><td>WhatsApp (Meta)</td><td>Botón de contacto/reserva (solo al pulsarlo)</td><td><a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener">Política de WhatsApp</a></td></tr>
  </table>

  <h2>3. Cómo gestionar las cookies</h2>
  <p>El usuario puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de su navegador. Consulta la ayuda de tu navegador (Chrome, Firefox, Safari o Edge) para más detalles.</p>

  <h2>4. Actualizaciones</h2>
  <p>Esta política puede actualizarse en función de novedades normativas o de los servicios utilizados. Te recomendamos revisarla periódicamente.</p>
`);

writeFileSync(join(here, '..', 'aviso-legal.html'), avisoLegal);
writeFileSync(join(here, '..', 'privacidad.html'), privacidad);
writeFileSync(join(here, '..', 'cookies.html'), cookies);
console.log('Generated aviso-legal.html, privacidad.html, cookies.html');
