'use strict';

const SITE = 'https://cicerourban.com.br';

const NAV = [
  { id: 'home', href: '/', label: 'Home' },
  { id: 'dr-cicero-urban', href: '/dr-cicero-urban/', label: 'Dr. Cícero Urban' },
  { id: 'doencas-e-condicoes', href: '/areas-de-atuacao/doencas-e-condicoes/', label: 'Doenças e Condições' },
  { id: 'procedimentos-e-cirurgias', href: '/areas-de-atuacao/procedimentos-e-cirurgias/', label: 'Procedimentos e Cirurgias' },
  { id: 'novidades', href: '/novidades/', label: 'Novidades' },
  { id: 'contato', href: '/contato/', label: 'Contato' }
];

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function navClass(id, current) {
  const base = 'px-5 py-2.5 rounded-full transition-all duration-300';
  return id === current ? base + ' nav-link-active' : base + ' hover:bg-brand-teal/5 hover:text-brand-teal';
}

function mobileNavClass(id, current) {
  const base = 'px-4 py-3 rounded-xl transition-colors';
  return id === current ? base + ' nav-link-active' : base + ' hover:bg-brand-teal/5 hover:text-brand-teal';
}

function renderHeader(current) {
  const desktopNav = NAV.map((item) =>
    `<a href="${item.href}" class="${navClass(item.id, current)}">${esc(item.label)}</a>`
  ).join('');

  const mobileNav = NAV.map((item) =>
    `<a href="${item.href}" class="${mobileNavClass(item.id, current)}">${esc(item.label)}</a>`
  ).join('');

  return `<header id="header" class="fixed w-full top-0 z-50 transition-all duration-500">
        <div class="bg-brand-dark text-palette-200 text-xs sm:text-sm tracking-widest uppercase hidden sm:block">
            <div class="container mx-auto px-6 py-3.5 flex justify-between items-center font-sans min-h-[44px]">
                <div class="flex items-center gap-3">
                    <span class="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse"></span>
                    <span class="text-gray-200 font-medium tracking-wider">Mastologia e Cirurgia Oncoplástica — Curitiba</span>
                </div>
                <div class="flex items-center gap-6">
                    <a href="tel:+554133353300" class="hover:text-brand-teal transition-colors flex items-center gap-2"><i class="fa-solid fa-phone"></i> (41) 3335-3300</a>
                    <div class="w-px h-3 bg-gray-700 mx-1"></div>
                    <div class="flex items-center gap-4">
                        <a href="https://www.instagram.com/cicerourban/" target="_blank" rel="noopener noreferrer" class="hover:text-brand-teal transition-colors" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/in/cicero-urban-19100893/" target="_blank" rel="noopener noreferrer" class="hover:text-brand-teal transition-colors" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                        <a href="#" class="js-whatsapp hover:text-brand-teal transition-colors" aria-label="WhatsApp" rel="noopener noreferrer" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-nav bg-white/85 backdrop-blur-xl border-b border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
            <div class="container mx-auto px-6 py-4 flex justify-between items-center gap-4">
                <a href="/" class="flex items-center gap-3 shrink-0 group transition-opacity duration-300 group-hover:opacity-90" aria-label="Dr. Cícero Urban — Home">
                    <span class="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all duration-300 shrink-0">
                        <i class="fa-solid fa-heart-pulse text-lg" aria-hidden="true"></i>
                    </span>
                    <span class="flex flex-col leading-none">
                        <span class="font-heading font-bold text-[1.2rem] text-brand-dark tracking-tight">Dr. Cícero Urban</span>
                        <span class="text-[0.6rem] font-semibold text-brand-teal tracking-[0.18em] uppercase mt-0.5">Mastologia · Oncoplástica</span>
                    </span>
                </a>
                <nav class="hidden xl:flex items-center gap-1 text-[14px] font-medium text-gray-600 font-sans">${desktopNav}</nav>
                <div class="flex items-center gap-3 lg:gap-4">
                    <a href="#" class="js-whatsapp-open btn-nav-cta hidden lg:inline-flex" aria-label="Agendar consulta"><span>Agendar Consulta</span><i class="fa-brands fa-whatsapp" aria-hidden="true"></i></a>
                    <button type="button" id="menuBtn" class="xl:hidden w-10 h-10 flex items-center justify-center text-brand-dark border border-gray-200 rounded-full hover:bg-gray-50 transition" aria-label="Menu"><i class="fa-solid fa-bars-staggered"></i></button>
                </div>
            </div>
            <nav id="mobileMenu" class="xl:hidden" aria-label="Menu mobile">
                <a href="#" class="js-whatsapp-open btn-nav-cta btn-nav-cta--mobile lg:hidden" aria-label="Agendar consulta"><span>Agendar Consulta</span><i class="fa-brands fa-whatsapp" aria-hidden="true"></i></a>${mobileNav}
            </nav>
        </div>
    </header>`;
}

function footerLink(href, label) {
  return `<li><a href="${href}" class="group flex items-center gap-2 hover:text-white transition-colors duration-300"><span class="w-1 h-1 rounded-full bg-brand-teal opacity-0 group-hover:opacity-100 transition-opacity"></span> ${esc(label)}</a></li>`;
}

function renderFooter() {
  const navLinks = NAV.map((item) => footerLink(item.href, item.label)).join('');
  return `<footer id="footer" class="bg-brand-dark text-white pt-20 pb-8 border-t border-white/10 relative overflow-hidden font-sans">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-brand-teal/40 to-transparent blur-[2px]"></div>
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                <div class="lg:col-span-4 pr-0 lg:pr-8">
                    <a href="/" class="inline-flex items-center gap-3 mb-6 group" aria-label="Dr. Cícero Urban — Home">
                        <span class="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-teal/20 text-brand-teal shrink-0">
                            <i class="fa-solid fa-heart-pulse text-lg" aria-hidden="true"></i>
                        </span>
                        <span class="flex flex-col leading-none">
                            <span class="font-heading font-bold text-[1.1rem] text-white tracking-tight">Dr. Cícero Urban</span>
                            <span class="text-[0.6rem] font-semibold text-brand-teal tracking-[0.18em] uppercase mt-0.5">Mastologia · Oncoplástica</span>
                        </span>
                    </a>
                    <p class="text-gray-400 text-sm leading-relaxed mb-4">Mastologia e cirurgia oncoplástica da mama. Referência internacional, atendimento em Curitiba.</p>
                    <p class="text-gray-500 text-xs mb-8">CRM: 15232-PR — RQE Nº: 9809 — RQE Nº: 9138</p>
                    <div class="flex gap-3">
                        <a href="https://www.instagram.com/cicerourban/" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-teal hover:border-brand-teal transition-all duration-300" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/in/cicero-urban-19100893/" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-teal hover:border-brand-teal transition-all duration-300" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                        <a href="#" class="js-whatsapp w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-teal hover:border-brand-teal transition-all duration-300" aria-label="WhatsApp" rel="noopener noreferrer" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
                    </div>
                </div>
                <div class="lg:col-span-2 lg:col-start-6">
                    <h4 class="font-bold text-lg text-white mb-6 tracking-wide">Navegação</h4>
                    <ul class="space-y-3 text-sm text-gray-400">${navLinks}</ul>
                </div>
                <div class="lg:col-span-3">
                    <h4 class="font-bold text-lg text-white mb-6 tracking-wide">Áreas de atuação</h4>
                    <ul class="space-y-3 text-sm text-gray-400">
                        <li><a href="/areas-de-atuacao/doencas-e-condicoes/" class="hover:text-white transition-colors">Doenças e Condições</a></li>
                        <li><a href="/areas-de-atuacao/procedimentos-e-cirurgias/" class="hover:text-white transition-colors">Procedimentos e Cirurgias</a></li>
                        <li class="flex items-center gap-2"><i class="fa-solid fa-check text-brand-teal/60 text-[10px]"></i> Cirurgia oncoplástica</li>
                        <li class="flex items-center gap-2"><i class="fa-solid fa-check text-brand-teal/60 text-[10px]"></i> Reconstrução mamária</li>
                        <li class="flex items-center gap-2"><i class="fa-solid fa-check text-brand-teal/60 text-[10px]"></i> Rastreamento e diagnóstico</li>
                    </ul>
                </div>
                <div class="lg:col-span-2">
                    <h4 class="font-bold text-lg text-white mb-6 tracking-wide">Contato</h4>
                    <ul class="space-y-4 text-sm text-gray-400">
                        <li class="flex gap-3 items-start"><div class="w-6 h-6 rounded bg-brand-teal/10 flex items-center justify-center shrink-0 mt-0.5 text-brand-teal"><i class="fa-solid fa-location-dot text-xs"></i></div><span class="leading-relaxed">Oncoclinica<br>Rua Profª. Rosa Saporski, 320<br>Mercês — Curitiba, PR</span></li>
                        <li><a href="tel:+554133353300" class="flex gap-3 items-center hover:text-white transition-colors group"><div class="w-6 h-6 rounded bg-brand-teal/10 flex items-center justify-center shrink-0 text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-colors"><i class="fa-solid fa-phone text-xs"></i></div>(41) 3335-3300</a></li>
                        <li><span class="flex gap-3 items-center"><div class="w-6 h-6 rounded bg-brand-teal/10 flex items-center justify-center shrink-0 text-brand-teal"><i class="fa-regular fa-clock text-xs"></i></div>09:30 às 18:30</span></li>
                        <li><span class="text-xs text-gray-500">Convênio: Unimed</span></li>
                    </ul>
                </div>
            </div>
            <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                <p class="text-xs text-gray-500 font-medium">&copy; 2026 Dr. Cícero Urban. Todos os direitos reservados.</p>
                <div class="flex items-center gap-6 text-xs text-gray-500 font-medium">
                    <a href="/politica-privacidade/" class="hover:text-brand-teal transition-colors">Política de Privacidade</a>
                    <button type="button" onclick="window.scrollTo({top:0,behavior:'smooth'})" class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-teal hover:border-brand-teal transition-all duration-300 group" aria-label="Voltar ao topo"><i class="fa-solid fa-chevron-up group-hover:-translate-y-0.5 transition-transform"></i></button>
                </div>
            </div>
        </div>
    </footer>`;
}

function renderHead({ title, description, canonical, pageId }) {
  const url = canonical || SITE + '/';
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <link rel="canonical" href="${esc(url)}">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="pt_BR">
    <meta property="og:site_name" content="Dr. Cícero Urban">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:url" content="${esc(url)}">
    <meta property="og:image" content="https://cicerourban.com.br/og-image.webp">
    <meta property="og:image:alt" content="Dr. Cícero Urban — mastologista em Curitiba">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(title)}">
    <meta name="twitter:description" content="${esc(description)}">
    <meta name="twitter:image" content="https://cicerourban.com.br/og-image.webp">
    <script src="/assets/js/config.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/site.css">
    <link rel="stylesheet" href="/assets/css/tailwind-built.css">
</head>
<body class="font-sans text-palette-500 bg-brand-light antialiased" data-page="${esc(pageId)}">`;
}

function renderScripts(extra) {
  return `<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="/assets/js/whatsapp.js"></script>
    <script src="/assets/js/analytics.js"></script>
    <script src="/assets/js/site.js"></script>${extra || ''}
</body>
</html>`;
}

function renderCta({ title, text, aos = 'zoom-in' }) {
  return `<section class="cta-band cta-band--photo">
            <div class="absolute inset-0 pointer-events-none">
                <div class="absolute bottom-0 right-0 w-96 h-96 bg-saude-light/20 blur-[120px] rounded-full"></div>
            </div>
            <div class="container mx-auto px-6 relative z-10 max-w-2xl" data-aos="${aos}">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">${title}</h2>
                <p class="text-palette-100 text-lg leading-relaxed mb-8">${text}</p>
                <a href="#" class="js-whatsapp btn-primary inline-flex items-center justify-center gap-2">Agendar Consulta <i class="fa-brands fa-whatsapp"></i></a>
            </div>
        </section>`;
}

function renderTopicCta(title, text) {
  return `<div class="mt-12 p-8 lg:p-10 rounded-3xl bg-brand-light border border-palette-100" data-aos="fade-up">
                <h3 class="text-xl font-bold text-brand-dark mb-3">${esc(title)}</h3>
                <p class="text-gray-600 leading-relaxed mb-6">${text}</p>
                <a href="#" class="js-whatsapp btn-primary inline-flex items-center gap-2">Agendar Consulta <i class="fa-brands fa-whatsapp"></i></a>
            </div>`;
}

function renderList(items) {
  return `<ul class="pillar-list space-y-3 text-gray-600">${items
    .map((i) => `<li><i class="fa-solid fa-circle-check text-brand-teal"></i><span>${i}</span></li>`)
    .join('')}</ul>`;
}

function renderTopicSection(topic, index) {
  const alt = index % 2 === 1;
  const bg = alt ? 'section-page--alt' : '';
  return `<section id="${topic.id}" class="section-page ${bg} scroll-mt-28">
            <div class="container mx-auto px-6">
                <div class="max-w-3xl mb-10" data-aos="fade-up">
                    <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-bold uppercase tracking-wider mb-4">
                        <span class="w-2 h-2 rounded-full bg-brand-teal"></span> ${esc(topic.label)}
                    </span>
                    <h2 class="text-2xl md:text-3xl font-bold text-brand-dark mb-4">${esc(topic.title)}</h2>
                </div>
                ${topic.blocks.map((block, bi) => {
                  const reverse = bi % 2 === 1;
                  const paras = (block.paragraphs || [])
                    .map((p) => `<p class="text-gray-600 leading-relaxed mb-4">${p}</p>`)
                    .join('');
                  if (block.type === 'text') {
                    return `<div class="max-w-3xl mb-10 ${bi > 0 ? 'mt-8' : ''}" data-aos="fade-up">
                        ${block.heading ? `<h3 class="text-xl font-bold text-brand-dark mb-4">${esc(block.heading)}</h3>` : ''}
                        ${paras}
                        ${block.list ? renderList(block.list) : ''}
                    </div>`;
                  }
                  if (block.type === 'split') {
                    return `<div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-10">
                        <div class="${reverse ? 'lg:order-2' : ''}" data-aos="fade-${reverse ? 'left' : 'right'}">
                            ${block.heading ? `<h3 class="text-xl font-bold text-brand-dark mb-4">${esc(block.heading)}</h3>` : ''}
                            ${paras}
                            ${block.list ? renderList(block.list) : ''}
                        </div>
                        <div class="${reverse ? 'lg:order-1' : ''} relative" data-aos="fade-${reverse ? 'right' : 'left'}">
                            <div class="absolute -inset-3 bg-gradient-saude opacity-15 rounded-3xl blur-xl"></div>
                            <div class="relative rounded-3xl overflow-hidden shadow-xl">
                                <img loading="lazy" decoding="async" src="${block.image}" alt="${esc(block.imageAlt || topic.title)}" class="w-full h-72 lg:h-80 object-cover">
                            </div>
                        </div>
                    </div>`;
                  }
                  return '';
                }).join('')}
                ${renderTopicCta(topic.ctaTitle, topic.ctaText)}
            </div>
        </section>`;
}

function pageShell({ title, description, canonical, pageId, main, scriptsExtra }) {
  return `${renderHead({ title, description, canonical, pageId })}
    ${renderHeader(pageId)}
    <main id="main">${main}</main>
    ${renderFooter()}
    ${renderScripts(scriptsExtra)}`;
}

module.exports = {
  SITE,
  NAV,
  esc,
  renderHeader,
  renderFooter,
  renderHead,
  renderScripts,
  renderCta,
  renderTopicSection,
  renderTopicCta,
  renderList,
  pageShell
};
