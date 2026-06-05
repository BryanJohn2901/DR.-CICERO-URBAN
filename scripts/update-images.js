const fs = require('fs');
const path = require('path');

const IMG = '/assets/images';

const replacements = [
  // Hero slides (home)
  ['https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80', `${IMG}/hero-slide-1-mastectomia.jpg`],
  ['https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1920&q=80', `${IMG}/hero-slide-2-oncoplastica.jpg`],
  ['https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1920&q=80', `${IMG}/hero-slide-3-dr-cicero.jpg`],
  // Cards / sections — 1200px
  ['https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80', `${IMG}/cancer-de-mama.jpg`],
  ['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80', `${IMG}/nodulo-na-mama.jpg`],
  ['https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80', `${IMG}/mama-densa.jpg`],
  ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80', `${IMG}/brca1-brca2.jpg`],
  ['https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1920&q=80', `${IMG}/procedimentos-mastectomia.jpg`],
  ['https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1200&q=80', `${IMG}/reconstrucao-mamaria.jpg`],
  ['https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1200&q=80', `${IMG}/procedimentos-mastectomia.jpg`],
  ['https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80', `${IMG}/presenca-cientifica.jpg`],
  // Cards — 800px
  ['https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80', `${IMG}/cancer-de-mama.jpg`],
  ['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80', `${IMG}/nodulo-na-mama.jpg`],
  ['https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80', `${IMG}/ver-todas-areas.jpg`],
  ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', `${IMG}/brca1-brca2.jpg`],
  ['https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80', `${IMG}/reconstrucao-mamaria.jpg`],
  ['https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=800&q=80', `${IMG}/hero-slide-2-oncoplastica.jpg`],
  // Contato hero
  ['https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1920&q=80', `${IMG}/consulta-contato.jpg`],
];

const fileSpecific = {
  'index.html': [
    // Home cards — ordem específica do PDF
    ['alt="Cirurgia oncoplástica" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">', `src="${IMG}/hero-slide-2-oncoplastica.jpg" alt="Cirurgia oncoplástica" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">`],
    ['alt="Reconstrução mamária" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">', `src="${IMG}/reconstrucao-mamaria.jpg" alt="Reconstrução mamária" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">`],
    ['alt="Mastectomia" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">', `src="${IMG}/hero-slide-1-mastectomia.jpg" alt="Mastectomia" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">`],
    ['alt="Diagnóstico e rastreamento" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">', `src="${IMG}/ver-todas-areas.jpg" alt="Ver todas as áreas" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">`],
  ],
  'areas-de-atuacao/doencas-e-condicoes/index.html': [
    ['alt="Tumores benignos" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">', `src="${IMG}/tumores-benignos.jpg" alt="Tumores benignos" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">`],
    ['alt="Mama densa" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">', `src="${IMG}/mama-densa.jpg" alt="Mama densa" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">`],
    ['alt="Microcalcificações" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">', `src="${IMG}/microcalcificacoes.jpg" alt="Microcalcificações" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">`],
  ],
  'areas-de-atuacao/procedimentos-e-cirurgias/index.html': [
    ['class="page-hero__bg" width="1920" height="1080" loading="eager">', `src="${IMG}/procedimentos-mastectomia.jpg" alt="" class="page-hero__bg" width="1920" height="1080" loading="eager">`],
    ['alt="Cirurgia oncoplástica" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">', `src="${IMG}/reconstrucao-mamaria.jpg" alt="Cirurgia oncoplástica" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">`],
    ['alt="Reconstrução mamária" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">', `src="${IMG}/hero-slide-2-oncoplastica.jpg" alt="Reconstrução mamária" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">`],
    ['alt="Mastectomia" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">', `src="${IMG}/procedimentos-mastectomia.jpg" alt="Mastectomia" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">`],
    ['alt="Mastectomia poupadora de mamilo" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">', `src="${IMG}/mastectomia-poupadora.jpg" alt="Mastectomia poupadora de mamilo" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">`],
    ['alt="Cirurgia conservadora" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">', `src="${IMG}/cirurgia-conservadora.jpg" alt="Cirurgia conservadora" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">`],
    ['alt="Cirurgia oncoplástica" class="w-full h-72 lg:h-80 object-cover">', `src="${IMG}/reconstrucao-mamaria.jpg" alt="Cirurgia oncoplástica" class="w-full h-72 lg:h-80 object-cover">`],
    ['alt="Planejamento cirúrgico" class="w-full h-72 lg:h-80 object-cover">', `src="${IMG}/procedimentos-mastectomia.jpg" alt="Planejamento cirúrgico" class="w-full h-72 lg:h-80 object-cover">`],
  ],
  'dr-cicero-urban/index.html': [
    ['alt="Consulta médica" class="w-full h-96 object-cover">', `src="${IMG}/consulta-contato.jpg" alt="Consulta médica" class="w-full h-96 object-cover">`],
  ],
};

const files = [
  'index.html',
  'dr-cicero-urban/index.html',
  'areas-de-atuacao/doencas-e-condicoes/index.html',
  'areas-de-atuacao/procedimentos-e-cirurgias/index.html',
  'contato/index.html',
];

function applyReplacements(content, reps) {
  let out = content;
  for (const [from, to] of reps) {
    if (from.includes('src=')) {
      out = out.split(from).join(to);
    } else {
      // patch img tags missing correct src by matching alt + class fragment
      const re = new RegExp(`src="[^"]*"\\s+${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
      out = out.replace(re, to);
    }
  }
  return out;
}

files.forEach((file) => {
  const full = path.join(process.cwd(), file);
  let content = fs.readFileSync(full, 'utf8');

  // generic unsplash → local
  for (const [from, to] of replacements) {
    content = content.split(from).join(to);
  }

  // fix page hero tags that lost src after partial replace
  content = content.replace(
    /<img src="[^"]*hero-slide-3[^"]*" alt="" class="page-hero__bg"/g,
    `<img src="${IMG}/hero-slide-3-dr-cicero.jpg" alt="" class="page-hero__bg"`
  );
  content = content.replace(
    /<img src="[^"]*cancer-de-mama[^"]*" alt="" class="page-hero__bg"/g,
    `<img src="${IMG}/cancer-de-mama.jpg" alt="" class="page-hero__bg"`
  );

  if (fileSpecific[file]) {
    content = applyReplacements(content, fileSpecific[file]);
  }

  // remove unsplash preconnect when no unsplash left
  if (!content.includes('unsplash.com')) {
    content = content.replace(/\s*<link rel="preconnect" href="https:\/\/images\.unsplash\.com" crossorigin>\n?/g, '\n');
  }

  fs.writeFileSync(full, content);
  console.log('Updated', file);
});

// CSS CTA background
const cssPath = path.join(process.cwd(), 'assets/css/site.css');
let css = fs.readFileSync(cssPath, 'utf8');
css = css.replace(
  /url\('https:\/\/images\.unsplash\.com\/[^']+'\)/,
  `url('${IMG}/consulta-contato.jpg')`
);
fs.writeFileSync(cssPath, css);
console.log('Updated assets/css/site.css');
