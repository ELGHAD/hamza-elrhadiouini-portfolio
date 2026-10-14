// Renders the Open Graph images (1200×630, FR + EN) and the PNG/ICO icons into public/
// with headless Chrome, driven over the DevTools protocol (no extra dependency).
// Run: npm run generate:images   (set CHROME_PATH if Chrome is not found automatically)
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const publicDir = join(root, 'public');

const OG_COPY = {
  fr: {
    badge: 'Disponible immédiatement',
    title: 'Ingénieur logiciel Full-Stack & IA',
    line: 'Backends Java/Spring Boot · applications Angular/React · copilotes IA (RAG)',
    flow: ['Documents', 'Chunks', 'Embeddings', 'pgvector', 'LLM', 'Réponse'],
  },
  en: {
    badge: 'Available immediately',
    title: 'Full-Stack & AI Software Engineer',
    line: 'Java/Spring Boot backends · Angular/React apps · RAG-based AI copilots',
    flow: ['Documents', 'Chunks', 'Embeddings', 'pgvector', 'LLM', 'Answer'],
  },
};
const STACK = ['Java', 'Spring Boot', 'Angular', 'React', 'FastAPI', 'Docker'];
/** Pixel size of assets-src/hamza-hero.jpg (update if the picture changes). */
const HERO_SOURCE_SIZE = { width: 1444, height: 736 };

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean);
  const found = candidates.find((path) => existsSync(path));
  if (!found) throw new Error('Chrome not found. Set CHROME_PATH to a Chrome/Chromium binary.');
  return found;
}

async function fontFace(family, file) {
  const data = await readFile(join(root, 'node_modules', file));
  return `@font-face{font-family:'${family}';font-weight:100 900;src:url(data:font/woff2;base64,${data.toString('base64')}) format('woff2');}`;
}

function ogHtml(locale, fonts) {
  const copy = OG_COPY[locale];
  const nodes = copy.flow
    .map(
      (label, index) => `
      <g transform="translate(0 ${index * 78})">
        <rect x="0" y="0" width="210" height="46" rx="10" fill="#121815" stroke="#25302A"/>
        <circle cx="22" cy="23" r="5" fill="#10B981" opacity="${0.45 + index * 0.1}"/>
        <text x="40" y="29" font-family="JetBrains Mono" font-size="17" fill="#9BAAA2">${label}</text>
        ${index < copy.flow.length - 1 ? '<path d="M105 46 V78" stroke="#10B981" stroke-width="2" stroke-dasharray="4 5" opacity="0.6"/>' : ''}
      </g>`,
    )
    .join('');
  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><style>
    ${fonts}
    *{box-sizing:border-box;margin:0}
    body{width:1200px;height:630px;overflow:hidden;background:#0B0F0D;color:#E8F0EC;font-family:'Inter';position:relative}
    .grid{position:absolute;inset:0;background-image:linear-gradient(#25302A55 1px,transparent 1px),linear-gradient(90deg,#25302A55 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(circle at 30% 40%,#000 0,transparent 75%)}
    .glow{position:absolute;width:640px;height:640px;left:-160px;top:-220px;background:radial-gradient(circle,rgba(16,185,129,.16),transparent 65%)}
    .content{position:absolute;left:80px;top:78px;width:700px}
    .badge{display:inline-flex;align-items:center;gap:12px;padding:10px 16px;border:1px solid #25302A;border-radius:999px;background:#121815;font-family:'JetBrains Mono';font-size:20px;color:#34D399}
    .badge i{width:10px;height:10px;border-radius:50%;background:#34D399;box-shadow:0 0 12px #10B981}
    h1{margin-top:34px;font-size:74px;line-height:1.02;font-weight:750;letter-spacing:-.02em}
    h2{margin-top:18px;font-size:34px;font-weight:600;color:#34D399}
    p{margin-top:18px;font-size:23px;line-height:1.45;color:#9BAAA2}
    .chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:30px}
    .chips span{padding:8px 12px;border:1px solid #25302A;border-radius:8px;font-family:'JetBrains Mono';font-size:17px;color:#E8F0EC;background:#121815}
    .url{position:absolute;left:80px;bottom:44px;font-family:'JetBrains Mono';font-size:18px;color:#9BAAA2}
    .flow{position:absolute;right:86px;top:84px}
  </style></head><body>
    <div class="grid"></div><div class="glow"></div>
    <div class="content">
      <span class="badge"><i></i>${copy.badge}</span>
      <h1>Hamza<br>El Rhadiouini</h1>
      <h2>${copy.title}</h2>
      <p>${copy.line}</p>
      <div class="chips">${STACK.map((tech) => `<span>${tech}</span>`).join('')}</div>
    </div>
    <svg class="flow" width="210" height="436" viewBox="0 0 210 436" aria-hidden="true">${nodes}</svg>
    <div class="url">elghad.github.io/hamza-elrhadiouini-portfolio</div>
  </body></html>`;
}

/** Full-bleed square (no rounded corners): safe for iOS and for maskable icons. */
/** App icons and favicon.ico: the ELGHAD globe, same drawing as public/favicon.svg. */
function iconHtml(size, svg) {
  return `<!doctype html><html><head><style>*{margin:0}body{width:${size}px;height:${size}px;background:#0B0F0D}svg{display:block;width:${size}px;height:${size}px}</style></head><body>${svg}</body></html>`;
}

/** ICO container holding PNG images (supported by every current browser). */
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = 6 + 16 * pngs.length;
  const entries = pngs.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...pngs.map(({ data }) => data)]);
}

async function connect(chrome, profileDir) {
  const portFile = join(profileDir, 'DevToolsActivePort');
  for (let attempt = 0; attempt < 100; attempt++) {
    if (existsSync(portFile)) {
      const [port, path] = (await readFile(portFile, 'utf8')).split('\n');
      if (port && path) {
        const socket = new WebSocket(`ws://127.0.0.1:${port}${path.trim()}`);
        await new Promise((ok, fail) => {
          socket.onopen = ok;
          socket.onerror = fail;
        });
        return socket;
      }
    }
    if (chrome.exitCode !== null) throw new Error('Chrome exited before DevTools was ready.');
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error('Timed out waiting for Chrome DevTools.');
}

async function main() {
  const profileDir = await mkdtemp(join(tmpdir(), 'portfolio-images-'));
  const chrome = spawn(
    findChrome(),
    ['--headless=new', '--remote-debugging-port=0', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', `--user-data-dir=${profileDir}`, 'about:blank'],
    { stdio: 'ignore' },
  );

  try {
    const browser = await connect(chrome, profileDir);
    let nextId = 0;
    const pending = new Map();
    browser.onmessage = ({ data }) => {
      const message = JSON.parse(data);
      if (message.id && pending.has(message.id)) {
        const { ok, fail } = pending.get(message.id);
        pending.delete(message.id);
        message.error ? fail(new Error(message.error.message)) : ok(message.result);
      }
    };
    const send = (method, params = {}, sessionId) =>
      new Promise((ok, fail) => {
        const id = ++nextId;
        pending.set(id, { ok, fail });
        browser.send(JSON.stringify({ id, method, params, sessionId }));
      });

    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
    await send('Page.enable', {}, sessionId);

    const render = async (html, width, height, format = 'png', quality) => {
      const file = join(profileDir, `render-${Date.now()}.html`);
      await writeFile(file, html, 'utf8');
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false }, sessionId);
      await send('Page.navigate', { url: pathToFileURL(file).href }, sessionId);
      await send('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => new Promise(r => setTimeout(r, 150)))', awaitPromise: true }, sessionId);
      const { data } = await send('Page.captureScreenshot', { format, quality, clip: { x: 0, y: 0, width, height, scale: 1 } }, sessionId);
      return Buffer.from(data, 'base64');
    };

    const fonts =
      (await fontFace('Inter', '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')) +
      (await fontFace('JetBrains Mono', '@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2'));

    await mkdir(join(publicDir, 'og'), { recursive: true });
    await mkdir(join(publicDir, 'icons'), { recursive: true });

    for (const locale of ['fr', 'en']) {
      await writeFile(join(publicDir, 'og', `og-${locale}.png`), await render(ogHtml(locale, fonts), 1200, 630));
    }

    // Hero visual: the source JPEG (assets-src/, not deployed) resized to WebP in two widths.
    const heroSource = join(root, 'assets-src', 'hamza-hero.jpg');
    if (existsSync(heroSource)) {
      const heroData = (await readFile(heroSource)).toString('base64');
      const ratio = HERO_SOURCE_SIZE.height / HERO_SOURCE_SIZE.width;
      await mkdir(join(publicDir, 'images'), { recursive: true });
      for (const width of [720, 1440]) {
        const height = Math.round(width * ratio);
        const html = `<!doctype html><html><head><style>*{margin:0}img{display:block;width:${width}px;height:${height}px}</style></head><body><img src="data:image/jpeg;base64,${heroData}"></body></html>`;
        await writeFile(join(publicDir, 'images', `hamza-hero-${width}.webp`), await render(html, width, height, 'webp', 82));
      }
    }

    const globe = await readFile(join(publicDir, 'favicon.svg'), 'utf8');
    const icons = { 'icons/icon-192.png': 192, 'icons/icon-512.png': 512, 'apple-touch-icon.png': 180 };
    for (const [path, size] of Object.entries(icons)) {
      await writeFile(join(publicDir, path), await render(iconHtml(size, globe), size, size));
    }

    const icoImages = [];
    for (const size of [16, 32, 48]) {
      icoImages.push({ size, data: await render(iconHtml(size, globe), size, size) });
    }
    await writeFile(join(publicDir, 'favicon.ico'), buildIco(icoImages));

    browser.close();
    console.log('Generated public/og/og-{fr,en}.png, public/icons/*, apple-touch-icon.png, favicon.ico');
  } finally {
    chrome.kill();
    await new Promise((r) => setTimeout(r, 300));
    await rm(profileDir, { recursive: true, force: true }).catch(() => {});
  }
}

await main();
