#!/usr/bin/env node
'use strict';

/**
 * Otimização completa de imagens (WebP, srcset, og:image, ícones).
 * Fonte: JPG/PNG em assets/images/ + downloads pontuais.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'assets', 'images');
const QUALITY = 78;
const CARD_QUALITY = 76;

/** Heroes / banners full-bleed → variantes 800 / 1200 / 1920 */
const HERO_BASES = new Set([
  'hero-slide-1-mastectomia',
  'hero-slide-2-oncoplastica',
  'hero-slide-3-dr-cicero',
  'consulta-contato',
  'presenca-cientifica',
  'procedimentos-mastectomia',
  'cancer-de-mama',
  'novidades-ciencia-imprensa',
]);

/** Cards / grids → variante 800w (e 400w) */
const CARD_BASES = new Set([
  'nodulo-na-mama',
  'reconstrucao-mamaria',
  'mama-densa',
  'microcalcificacoes',
  'tumores-benignos',
  'cirurgia-conservadora',
  'mastectomia-poupadora',
  'brca1-brca2',
  'ver-todas-areas',
  'artigo-mama-densa-mamografia',
  'artigo-brca-aconselhamento',
  'artigo-mastectomia-poupadora',
  'congresso-breast-reconstrucao',
  'entrevista-imprensa-diagnostico',
  'artigo-cirurgia-oncoplastica',
  'video-apresentacao-dr-cicero',
  'fallback-imagem-clinica',
]);

const DOWNLOADS = [
  {
    url: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=1600&q=85',
    base: 'artigo-mama-densa-mamografia',
  },
  {
    url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1600&q=85',
    base: 'artigo-brca-aconselhamento',
  },
  {
    url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1600&q=85',
    base: 'artigo-mastectomia-poupadora',
  },
  {
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=85',
    base: 'congresso-breast-reconstrucao',
  },
  {
    url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=85',
    base: 'entrevista-imprensa-diagnostico',
  },
  {
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=85',
    base: 'artigo-cirurgia-oncoplastica',
  },
  {
    url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1920&q=85',
    base: 'novidades-ciencia-imprensa',
  },
  {
    url: 'https://i.ytimg.com/vi/c9NKO3lqnG0/maxresdefault.jpg',
    base: 'video-apresentacao-dr-cicero',
  },
  {
    url: 'https://images.pexels.com/photos/8379898/pexels-photo-8379898.jpeg?auto=compress&cs=tinysrgb&w=1200&fit=crop',
    base: 'fallback-imagem-clinica',
  },
];

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(
      url,
      { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ImageOptimizer/1.0)' } },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchBuffer(res.headers.location).then(resolve, reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          res.resume();
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      }
    );
    req.on('error', reject);
  });
}

async function writeWebpVariants(srcInput, base, { hero, card }) {
  const meta = await sharp(srcInput).metadata();
  const isPortrait = (meta.height || 0) > (meta.width || 0);
  const maxW = isPortrait ? 1200 : 1920;

  const outMain = path.join(IMG_DIR, `${base}.webp`);
  await sharp(srcInput)
    .rotate()
    .resize({ width: maxW, height: maxW, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(outMain);

  const made = [path.basename(outMain)];

  if (hero && !isPortrait) {
    for (const w of [800, 1200, 1920]) {
      const out = path.join(IMG_DIR, `${base}-${w}w.webp`);
      await sharp(srcInput)
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(out);
      made.push(path.basename(out));
    }
  }

  if (card) {
    for (const w of [400, 800]) {
      const out = path.join(IMG_DIR, `${base}-${w}w.webp`);
      await sharp(srcInput)
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: CARD_QUALITY, effort: 5 })
        .toFile(out);
      made.push(path.basename(out));
    }
  }

  const outKb = (fs.statSync(outMain).size / 1024).toFixed(0);
  console.log(`✓ ${base}.webp  ${outKb}KB  [${made.length} arquivos]`);
  return made;
}

async function convertLocalFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return null;
  const base = path.basename(file, ext);
  const src = path.join(IMG_DIR, file);
  return writeWebpVariants(src, base, {
    hero: HERO_BASES.has(base),
    card: CARD_BASES.has(base) || !HERO_BASES.has(base),
  });
}

async function downloadAndConvert() {
  for (const item of DOWNLOADS) {
    const tmpJpg = path.join(IMG_DIR, `${item.base}.source.jpg`);
    try {
      console.log(`↓ ${item.base}…`);
      const buf = await fetchBuffer(item.url);
      fs.writeFileSync(tmpJpg, buf);
      await writeWebpVariants(tmpJpg, item.base, {
        hero: HERO_BASES.has(item.base),
        card: CARD_BASES.has(item.base) || !HERO_BASES.has(item.base),
      });
    } finally {
      if (fs.existsSync(tmpJpg)) fs.unlinkSync(tmpJpg);
    }
  }
}

async function createOgImage() {
  const src = path.join(IMG_DIR, 'hero-slide-3-dr-cicero.jpg');
  const webpSrc = path.join(IMG_DIR, 'hero-slide-3-dr-cicero.webp');
  const input = fs.existsSync(src) ? src : webpSrc;
  const out = path.join(ROOT, 'og-image.webp');
  await sharp(input)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .webp({ quality: 80, effort: 5 })
    .toFile(out);
  console.log(`✓ og-image.webp  ${(fs.statSync(out).size / 1024).toFixed(0)}KB (1200×630)`);
}

async function createAppleTouchIcon() {
  const logo = path.join(ROOT, 'logo.png');
  const out = path.join(ROOT, 'apple-touch-icon.png');
  await sharp(logo)
    .resize(180, 180, { fit: 'cover' })
    .png({ compressionLevel: 9, palette: true })
    .toFile(out);
  console.log(`✓ apple-touch-icon.png  ${(fs.statSync(out).size / 1024).toFixed(0)}KB (180×180)`);
}

async function compressLogo() {
  const logo = path.join(ROOT, 'logo.png');
  const bak = path.join(ROOT, 'logo.png.bak');
  const before = fs.statSync(logo).size;
  fs.copyFileSync(logo, bak);
  await sharp(logo)
    .resize(512, 512, { fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, quality: 85, effort: 10 })
    .toFile(logo + '.tmp');
  fs.renameSync(logo + '.tmp', logo);
  fs.unlinkSync(bak);
  const after = fs.statSync(logo).size;
  console.log(`✓ logo.png  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`);
}

async function main() {
  if (!fs.existsSync(IMG_DIR)) {
    console.error('Pasta assets/images não encontrada');
    process.exit(1);
  }

  console.log('\n=== 1) JPG/PNG locais → WebP ===\n');
  const locals = fs.readdirSync(IMG_DIR).filter((f) => /\.(jpe?g|png)$/i.test(f) && !f.includes('.source.'));
  for (const f of locals) {
    await convertLocalFile(f);
  }

  console.log('\n=== 2) Downloads (novidades / vídeo / fallback) ===\n');
  await downloadAndConvert();

  console.log('\n=== 3) OG + ícones + logo ===\n');
  await createOgImage();
  await createAppleTouchIcon();
  await compressLogo();

  console.log('\nConcluído.\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
