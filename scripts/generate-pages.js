#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { pageShell, renderCta, renderTopicSection, renderList, SITE } = require('./includes');

const ROOT = path.dirname(__dirname);
const IMG = '/assets/images';

function write(rel, content) {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
  console.log('→', rel);
}

function heroPage({ eyebrow, title, subtitle, image, pills }) {
  const pillHtml = pills
    ? `<nav class="flex flex-wrap justify-center gap-3 mt-12" data-aos="fade-up" data-aos-delay="100">${pills
        .map((p) => `<a href="#${p.id}" class="px-4 py-2 rounded-full text-sm font-semibold bg-white/90 border border-brand-teal/30 text-brand-teal hover:bg-gradient-saude hover:text-white transition-all">${p.label}</a>`)
        .join('')}</nav>`
    : '';
  return `<section class="page-hero page-hero--image">
            <img src="${image}" alt="" class="page-hero__bg" width="1920" height="1080" loading="eager">
            <div class="page-hero__overlay"></div>
            <div class="container mx-auto px-6 relative z-10">
                <div class="max-w-3xl mx-auto text-center" data-aos="fade-up">
                    <p class="page-hero__eyebrow">${eyebrow}</p>
                    <h1 class="page-hero__title">${title}</h1>
                    <p class="page-hero__subtitle">${subtitle}</p>
                </div>${pillHtml}
            </div>
        </section>`;
}

function cardGrid(cards) {
  return `<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">${cards
    .map(
      (c, i) => `<a href="#${c.id}" class="group relative h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500" data-aos="fade-up" data-aos-delay="${(i % 3) * 100}">
            <img loading="lazy" decoding="async" src="${c.image}" alt="${c.title}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-transparent opacity-90"></div>
            <div class="absolute inset-0 p-6 flex flex-col justify-end">
                <div class="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-3"><i class="${c.icon}"></i></div>
                <h3 class="text-lg font-bold text-white">${c.title}</h3>
            </div>
        </a>`
    )
    .join('')}</div>`;
}

// ─── Doenças e Condições ─────────────────────────────────────────────────────
const DOENCAS_TOPICS = [
  {
    id: 'cancer-de-mama',
    label: 'Câncer de mama',
    title: 'Câncer de mama',
    blocks: [
      {
        type: 'text',
        paragraphs: [
          'O câncer de mama acontece quando células da mama crescem de forma descontrolada, formando um tumor. Esse crescimento pode ter origem nos ductos ou nos lóbulos. Na maioria dos casos, o tumor permanece localizado por um período antes de se disseminar — e é nessa janela que o diagnóstico precoce muda o prognóstico de forma decisiva.',
          'Quando diagnosticado nos estágios iniciais, a taxa de sobrevida em cinco anos supera 90%. Esse número cai progressivamente conforme a doença avança, o que torna o rastreamento regular central para qualquer estratégia de saúde da mama.'
        ]
      },
      {
        type: 'text',
        heading: 'Tipos mais comuns',
        list: [
          '<strong>Carcinoma ductal invasivo</strong> — O mais frequente (70–80%). Origina-se nos ductos e pode se disseminar.',
          '<strong>Carcinoma lobular invasivo</strong> — Começa nos lóbulos; pode ser menos visível na mamografia.',
          '<strong>Carcinoma ductal in situ (CDIS)</strong> — Estágio pré-invasivo, com excelente prognóstico.',
          '<strong>Carcinoma inflamatório</strong> — Tipo raro e agressivo, com sinais inflamatórios na pele.'
        ]
      },
      {
        type: 'split',
        heading: 'Sinais que merecem atenção',
        paragraphs: [
          'Nos estágios iniciais, o câncer de mama frequentemente não causa sintomas perceptíveis. A ausência de dor não descarta o diagnóstico.'
        ],
        list: [
          'Nódulo ou espessamento na mama ou axila, mesmo que indolor',
          'Retração ou inversão do mamilo',
          'Secreção pelo mamilo, especialmente espontânea',
          'Alterações na pele da mama (vermelhidão, aspecto de casca de laranja)',
          'Dor localizada persistente'
        ],
        image: `${IMG}/cancer-de-mama.webp`,
        imageAlt: 'Consulta de mastologia'
      },
      {
        type: 'text',
        heading: 'Rastreamento e diagnóstico',
        paragraphs: [
          'A mamografia anual a partir dos 40 anos é a recomendação geral para mulheres sem fatores de risco adicionais. Mulheres com histórico familiar relevante ou mutações genéticas podem precisar iniciar o rastreamento mais cedo, com exames complementares como ressonância magnética.',
          'Mamografia digital, ultrassonografia, ressonância magnética e biópsia guiada por imagem são os principais recursos diagnósticos. O diagnóstico preciso costuma ser uma combinação deles, não um exame isolado.'
        ]
      }
    ],
    ctaTitle: 'Tem dúvidas sobre um achado ou diagnóstico recente?',
    ctaText: 'Uma consulta com o Dr. Cícero Urban começa com escuta. Seja para uma segunda opinião, para entender melhor um resultado de exame ou para planejar um tratamento, o caminho começa com uma conversa.'
  },
  {
    id: 'nodulo-na-mama',
    label: 'Nódulo na mama',
    title: 'Nódulo na mama',
    blocks: [
      {
        type: 'text',
        paragraphs: [
          'Um nódulo na mama é qualquer massa ou espessamento que se distingue do tecido ao redor. A descoberta costuma gerar ansiedade imediata, mas é importante saber que a grande maioria dos nódulos mamários é benigna — entre 80 e 85% das biópsias resultam em diagnóstico benigno.'
        ]
      },
      {
        type: 'text',
        heading: 'Tipos mais comuns',
        list: [
          '<strong>Fibroadenoma</strong> — Nódulo benigno mais comum em mulheres jovens; geralmente apenas acompanhamento.',
          '<strong>Cisto mamário</strong> — Cavidade preenchida por líquido, frequente entre 35 e 50 anos.',
          '<strong>Nódulo maligno</strong> — Minoria dos achados, mas justifica a investigação de todo nódulo novo.'
        ]
      },
      {
        type: 'split',
        heading: 'Como o nódulo é investigado',
        paragraphs: [
          'Todo nódulo novo merece avaliação. A ultrassonografia é frequentemente o primeiro passo; a mamografia complementa em mulheres acima de 35–40 anos. Quando há dúvida, a biópsia por agulha define o diagnóstico com precisão.',
          'Os laudos utilizam a classificação BI-RADS (0 a 6). Categorias 4 e 5 indicam necessidade de biópsia — motivo para conversa com especialista sem demora.'
        ],
        list: [
          'Massa palpável com qualquer consistência',
          'Achado em exame de imagem sem sintoma clínico',
          'Espessamento localizado diferente do restante do tecido'
        ],
        image: `${IMG}/nodulo-na-mama.webp`,
        imageAlt: 'Exame clínico da mama'
      }
    ],
    ctaTitle: 'Encontrou um nódulo ou recebeu um laudo com dúvidas?',
    ctaText: 'A investigação correta começa com uma avaliação especializada. O Dr. Cícero Urban atende casos de todos os graus de complexidade.'
  },
  {
    id: 'tumores-benignos',
    label: 'Tumores benignos',
    title: 'Tumores benignos da mama',
    blocks: [
      {
        type: 'text',
        paragraphs: [
          'Tumor benigno não é sinônimo de câncer. Na mama, os tumores benignos são muito mais frequentes que os malignos. Mesmo assim, precisam de avaliação: nem sempre é possível distinguir benigno de maligno apenas pelo exame físico, e alguns tipos aumentam o risco ao longo do tempo.'
        ]
      },
      {
        type: 'text',
        heading: 'Tipos mais comuns',
        list: [
          '<strong>Fibroadenoma</strong> — Firme, bem delimitado e móvel; acompanhamento ou retirada em casos selecionados.',
          '<strong>Cisto mamário</strong> — Mais frequente no pré-menopausa; punção quando necessário.',
          '<strong>Papiloma intraductal</strong> — Causa comum de secreção pelo mamilo.',
          '<strong>Adenose esclerosante</strong> — Pode simular câncer nos exames; diagnóstico histológico.',
          '<strong>Lipoma mamário</strong> — Tecido gorduroso benigno, raramente requer cirurgia.'
        ]
      },
      {
        type: 'text',
        heading: 'Diagnóstico e acompanhamento',
        paragraphs: [
          'O diagnóstico começa pelo exame clínico e imagem. Quando há dúvida, a biópsia por agulha — minimamente invasiva e sob anestesia local — define o diagnóstico. Confirmar benignidade não encerra o acompanhamento: a periodicidade depende do tipo de lesão e do perfil de risco.'
        ]
      }
    ],
    ctaTitle: 'Recebeu um diagnóstico de tumor benigno?',
    ctaText: 'Benigno não significa ignorar. Significa acompanhar com o especialista certo, na frequência adequada para o seu caso.'
  },
  {
    id: 'mama-densa',
    label: 'Mama densa',
    title: 'Mama densa',
    blocks: [
      {
        type: 'text',
        paragraphs: [
          'Mama densa não é uma doença. É uma característica do tecido mamário descrita no laudo da mamografia que muda a forma como o rastreamento precisa ser conduzido.'
        ]
      },
      {
        type: 'text',
        heading: 'Categorias de densidade — classificação ACR',
        list: [
          '<strong>Categoria A</strong> — Predominantemente gordurosa; alta sensibilidade da mamografia.',
          '<strong>Categoria B</strong> — Densidades fibroglandulares esparsas.',
          '<strong>Categoria C</strong> — Heterogeneamente densa; exames complementares podem ser indicados.',
          '<strong>Categoria D</strong> — Extremamente densa; ultrassom ou ressonância frequentemente recomendados.'
        ]
      },
      {
        type: 'split',
        heading: 'Por que a densidade importa',
        paragraphs: [
          'A mama densa não provoca sintomas. O achado aparece exclusivamente no laudo. Há duas implicações: limitação diagnóstica (efeito mascaramento) e risco discretamente aumentado de câncer em comparação com mamas predominantemente gordurosas.',
          'Receber laudo com categorias C ou D é sinal de que a mamografia isolada pode não ser suficiente. A conduta é individual — depende do grau de densidade, idade, histórico familiar e avaliação clínica.'
        ],
        image: `${IMG}/mama-densa.webp`,
        imageAlt: 'Mamografia e rastreamento'
      }
    ],
    ctaTitle: 'Seu laudo indicou mama densa?',
    ctaText: 'Esse é exatamente o tipo de conversa que uma consulta com o Dr. Cícero Urban resolve — entender o que o laudo significa para o seu caso específico.'
  },
  {
    id: 'microcalcificacoes',
    label: 'Microcalcificações',
    title: 'Microcalcificações na mama',
    blocks: [
      {
        type: 'text',
        paragraphs: [
          'Microcalcificações são pequenos depósitos de cálcio visíveis na mamografia. A grande maioria é benigna. Algumas configurações específicas podem indicar alterações celulares que merecem investigação.'
        ]
      },
      {
        type: 'text',
        heading: 'Tipos — benignas vs. suspeitas',
        list: [
          '<strong>Benignas típicas</strong> — Morfologia regular; geralmente sem investigação adicional.',
          '<strong>Provavelmente benignas (BI-RADS 3)</strong> — Controle a curto prazo, geralmente em seis meses.',
          '<strong>Suspeitas (BI-RADS 4 ou 5)</strong> — Indicam necessidade de biópsia.'
        ]
      },
      {
        type: 'text',
        heading: 'Como a investigação é conduzida',
        paragraphs: [
          'Microcalcificações não causam sintomas — o achado é exclusivamente radiológico. Quando há dúvida, a biópsia estereotáxica, guiada por mamografia em tempo real, fornece diagnóstico preciso. Ter mamografias anteriores para comparação é clinicamente valioso.'
        ]
      }
    ],
    ctaTitle: 'Seu laudo descreveu microcalcificações?',
    ctaText: 'A leitura correta depende de contexto clínico, comparação com exames anteriores e experiência especializada.'
  },
  {
    id: 'mutacoes-brca',
    label: 'BRCA1 e BRCA2',
    title: 'Mutações genéticas — BRCA1 e BRCA2',
    blocks: [
      {
        type: 'text',
        paragraphs: [
          'Os genes BRCA1 e BRCA2 ajudam a reparar danos no DNA. Mutações hereditárias comprometem essa função protetora e aumentam significativamente o risco de câncer de mama e ovário ao longo da vida.',
          'Na população geral, o risco acumulado de câncer de mama é cerca de 12%. Em portadoras de BRCA1, pode chegar a 70%; em BRCA2, entre 45 e 65%.'
        ]
      },
      {
        type: 'text',
        heading: 'Quem deve investigar',
        list: [
          'Câncer de mama antes dos 50 anos em familiar de primeiro grau',
          'Dois ou mais casos de câncer de mama na mesma família',
          'Câncer de mama e ovário na mesma paciente ou família',
          'Câncer de mama em homem na família',
          'Diagnóstico de câncer de mama bilateral'
        ]
      },
      {
        type: 'split',
        heading: 'Teste genético e conduta',
        paragraphs: [
          'O teste é realizado a partir de sangue ou saliva, com acompanhamento de aconselhamento genético. Um resultado positivo não significa que o câncer vai acontecer — significa que a estratégia de rastreamento e prevenção precisa ser adaptada.',
          'Opções incluem vigilância intensificada, quimioprofilaxia em casos selecionados e, para algumas pacientes, cirurgia redutora de risco. Cada decisão é profundamente pessoal.'
        ],
        image: `${IMG}/brca1-brca2.webp`,
        imageAlt: 'Aconselhamento genético'
      }
    ],
    ctaTitle: 'Histórico familiar de câncer de mama?',
    ctaText: 'Essa conversa merece tempo e atenção especializada. O Dr. Cícero Urban avalia o histórico, orienta sobre o teste e coordena encaminhamentos quando necessário.'
  }
];

const DOENCAS_CARDS = DOENCAS_TOPICS.map((t, i) => ({
  id: t.id,
  title: t.label,
  icon: ['fa-solid fa-ribbon', 'fa-solid fa-circle-dot', 'fa-solid fa-shield-heart', 'fa-solid fa-microscope', 'fa-solid fa-magnifying-glass', 'fa-solid fa-dna'][i],
  image: [
    `${IMG}/cancer-de-mama.webp`,
    `${IMG}/nodulo-na-mama.webp`,
    `${IMG}/tumores-benignos.webp`,
    `${IMG}/mama-densa.webp`,
    `${IMG}/microcalcificacoes.webp`,
    `${IMG}/brca1-brca2.webp`
  ][i]
}));

// ─── Procedimentos e Cirurgias ───────────────────────────────────────────────
const PROCEDIMENTOS_TOPICS = [
  {
    id: 'cirurgia-oncoplastica',
    label: 'Cirurgia oncoplástica',
    title: 'Cirurgia oncoplástica da mama',
    blocks: [
      {
        type: 'text',
        paragraphs: [
          'A cirurgia oncoplástica combina os princípios da cirurgia oncológica com técnicas da cirurgia plástica reconstrutiva, permitindo remodelar a mama durante o mesmo procedimento. O resultado une segurança oncológica e preservação estética.',
          'Antes da oncoplastia, tumores maiores quase sempre resultavam em deformidades significativas. Hoje, é possível retirar tumores maiores com margens adequadas e reconstruir o tecido remanescente de forma satisfatória.'
        ]
      },
      {
        type: 'text',
        heading: 'Níveis de procedimentos oncoplásticos',
        list: [
          '<strong>Nível I — Remodelação local</strong> — Até 20% do volume; recuperação mais rápida.',
          '<strong>Nível II — Redistribuição de volume</strong> — 20–50% do volume; frequentemente inclui simetrização contralateral.'
        ]
      },
      {
        type: 'split',
        heading: 'Referência científica do Dr. Cícero Urban',
        paragraphs: [
          'Sua classificação para procedimentos oncoplásticos é adotada internacionalmente. Ele participou dos consensos do Oncoplastic Breast Consortium que definiram protocolos vigentes para mastectomia poupadora de mamilo e reconstrução pós-radioterapia.',
          'Para a paciente, isso se traduz em planejamento mais preciso, opções mais amplas e resultados que unem segurança oncológica e qualidade de vida.'
        ],
        list: [
          'Tumores de maior volume em relação ao tamanho da mama',
          'Tumores centrais ou próximos ao mamilo',
          'Pacientes com mamas de volume generoso',
          'Casos com assimetria relevante após ressecção conservadora'
        ],
        image: `${IMG}/reconstrucao-mamaria.webp`,
        imageAlt: 'Cirurgia oncoplástica'
      }
    ],
    ctaTitle: 'A cirurgia oncoplástica é opção para o seu caso?',
    ctaText: 'O planejamento cirúrgico começa com uma conversa detalhada. Cada caso é avaliado individualmente, com clareza sobre o que cada opção envolve.'
  },
  {
    id: 'reconstrucao-mamaria',
    label: 'Reconstrução mamária',
    title: 'Reconstrução mamária',
    blocks: [
      {
        type: 'text',
        paragraphs: [
          'A reconstrução mamária restaura forma, volume e aparência após mastectomia. Vai além da estética — para muitas pacientes, recuperar a silhueta faz parte do processo emocional após o tratamento.',
          'No Brasil, a reconstrução imediata é direito garantido por lei desde 1999, realizado no mesmo ato cirúrgico da mastectomia quando indicado.'
        ]
      },
      {
        type: 'text',
        heading: 'Principais técnicas',
        list: [
          '<strong>Reconstrução com implante</strong> — Próteses de silicone; pode usar expansores temporários.',
          '<strong>Reconstrução pré-peitoral</strong> — Prótese sobre o músculo; linha de pesquisa ativa do Dr. Cícero Urban.',
          '<strong>Retalhos autólogos</strong> — Tecido da própria paciente; resultados duradouros, especialmente com radioterapia.',
          '<strong>Complexo aréolo-mamilar</strong> — Etapa final; reconstrói mamilo e aréola.'
        ]
      },
      {
        type: 'text',
        heading: 'Radioterapia e reconstrução',
        paragraphs: [
          'A radioterapia afeta a escolha da técnica reconstrutiva. Tecido irradiado tem menor capacidade de integração com implantes. Em pacientes que receberão radioterapia, retalho autólogo frequentemente oferece resultados mais estáveis — decisão que exige experiência combinada em oncologia e cirurgia reconstrutiva.'
        ]
      }
    ],
    ctaTitle: 'Opções de reconstrução após mastectomia?',
    ctaText: 'Cada caso tem uma resposta diferente. O planejamento integra segurança oncológica e resultado estético desde o início.'
  },
  {
    id: 'mastectomia',
    label: 'Mastectomia',
    title: 'Mastectomia',
    blocks: [
      {
        type: 'text',
        paragraphs: [
          'A mastectomia é a retirada total ou parcial da mama. O cenário mudou nas últimas décadas: técnicas bem estabelecidas, resultados previsíveis e, na maioria dos casos, possibilidade real de reconstrução imediata na mesma cirurgia.'
        ]
      },
      {
        type: 'text',
        heading: 'Tipos de mastectomia',
        list: [
          '<strong>Total simples</strong> — Remoção da mama; indicada em casos selecionados ou profilática.',
          '<strong>Radical modificada</strong> — Com linfonodos axilares; mais utilizada no câncer invasivo.',
          '<strong>Poupadora de pele</strong> — Preserva envelope cutâneo; melhora reconstrução imediata.',
          '<strong>Poupadora de mamilo</strong> — Preserva complexo aréolo-mamilar em casos selecionados.',
          '<strong>Bilateral profilática</strong> — Em portadoras de BRCA1/BRCA2 com risco muito elevado.'
        ]
      },
      {
        type: 'split',
        heading: 'Planejamento e reconstrução',
        paragraphs: [
          'Quando a mastectomia é indicada, a discussão sobre reconstrução começa desde o início. Simulação 3D pré-operatória permite visualizar o resultado esperado e qualifica o consentimento informado.',
          'A mastectomia não é a única opção — em muitos casos, cirurgia conservadora com oncoplastia oferece segurança equivalente com menor impacto sobre o corpo.'
        ],
        image: `${IMG}/procedimentos-mastectomia.webp`,
        imageAlt: 'Planejamento cirúrgico'
      }
    ],
    ctaTitle: 'Indicação de mastectomia?',
    ctaText: 'Decisão que merece tempo, informação e um especialista que apresente todas as possibilidades com clareza — incluindo reconstrução desde a primeira consulta.'
  },
  {
    id: 'mastectomia-poupadora-mamilo',
    label: 'Mastectomia poupadora de mamilo',
    title: 'Mastectomia poupadora de mamilo',
    blocks: [
      {
        type: 'text',
        paragraphs: [
          'Remove todo o tecido mamário, mas preserva pele e complexo aréolo-mamilar. O resultado estético é muito mais próximo da mama natural, sem reconstruir o mamilo artificialmente em segundo tempo.',
          'Consensos internacionais — incluindo os que o Dr. Cícero Urban participou — confirmam segurança equivalente às técnicas tradicionais em casos adequadamente selecionados.'
        ]
      },
      {
        type: 'text',
        heading: 'Critérios de seleção',
        list: [
          'Distância adequada entre tumor e mamilo (geralmente ≥ 2 cm)',
          'Ausência de envolvimento do ducto retroareolar',
          'Tumor sem invasão da pele ou mamilo',
          'Análise intraoperatória do ducto retroareolar em tempo real'
        ]
      },
      {
        type: 'text',
        heading: 'Sensibilidade do mamilo',
        paragraphs: [
          'A cirurgia pode resultar em redução parcial ou total da sensibilidade no pós-operatório. Em alguns casos, parte se recupera ao longo dos meses. Essa informação faz parte do consentimento informado.'
        ]
      }
    ],
    ctaTitle: 'Candidata à mastectomia poupadora de mamilo?',
    ctaText: 'A resposta depende de avaliação clínica detalhada — exames, perfil oncológico e características individuais.'
  },
  {
    id: 'cirurgia-conservadora',
    label: 'Cirurgia conservadora',
    title: 'Cirurgia conservadora da mama',
    blocks: [
      {
        type: 'text',
        paragraphs: [
          'Remove o tumor com margens de segurança, preservando o restante da mama. Tratamento de escolha para a maioria das pacientes em estágios iniciais — taxas de controle local e sobrevida equivalentes à mastectomia quando bem indicada.',
          'Preservar a mama não é concessão oncológica. Para a maior parte das elegíveis, é a melhor opção disponível.'
        ]
      },
      {
        type: 'text',
        heading: 'Procedimentos conservadores',
        list: [
          '<strong>Tumorectomia</strong> — Tumores pequenos e bem delimitados.',
          '<strong>Setorectomia</strong> — Ressecção mais ampla de um setor.',
          '<strong>Quadrantectomia</strong> — Um quadrante inteiro; frequentemente com oncoplastia.',
          '<strong>Conservadora com oncoplastia</strong> — Amplia limites da cirurgia conservadora.'
        ]
      },
      {
        type: 'text',
        heading: 'Radioterapia adjuvante',
        paragraphs: [
          'A radioterapia é parte integrante do tratamento conservador na maioria dos casos — reduz recidiva local e torna a cirurgia oncologicamente equivalente à mastectomia. O planejamento entre equipe cirúrgica e radioterapia deve ser integrado.'
        ]
      }
    ],
    ctaTitle: 'Tratar preservando a mama?',
    ctaText: 'O Dr. Cícero Urban analisa cada caso com o objetivo de oferecer a opção mais conservadora que seja oncologicamente segura.'
  }
];

const PROC_CARDS = PROCEDIMENTOS_TOPICS.map((t, i) => ({
  id: t.id,
  title: t.label,
  icon: ['fa-solid fa-hand-holding-medical', 'fa-solid fa-heart-pulse', 'fa-solid fa-user-doctor', 'fa-solid fa-circle-half-stroke', 'fa-solid fa-scissors'][i],
  image: [
    `${IMG}/hero-slide-2-oncoplastica.webp`,
    `${IMG}/reconstrucao-mamaria.webp`,
    `${IMG}/procedimentos-mastectomia.webp`,
    `${IMG}/mastectomia-poupadora.webp`,
    `${IMG}/cirurgia-conservadora.webp`
  ][i]
}));

function areasPage({ pageId, path, title, description, hero, intro, cards, topics }) {
  const main = `
        ${heroPage(hero)}
        <section class="section-page bg-white">
            <div class="container mx-auto px-6">
                <div class="max-w-3xl mx-auto text-center mb-14" data-aos="fade-up">
                    <p class="text-gray-600 text-lg leading-relaxed">${intro}</p>
                </div>
                ${cardGrid(cards)}
            </div>
        </section>
        ${topics.map((t, i) => renderTopicSection(t, i)).join('')}
        ${renderCta({
          title: 'Quando você estiver pronta, estaremos aqui.',
          text: 'Uma consulta com o Dr. Cícero começa com escuta. O caminho começa com uma conversa.'
        })}`;

  write(
    path,
    pageShell({
      title,
      description,
      canonical: `${SITE}/${path.replace(/index\.html$/, '')}`,
      pageId,
      main,
      scriptsExtra: `
    <script>
    document.addEventListener('DOMContentLoaded', function () {
        const header = document.getElementById('header');
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const id = link.getAttribute('href').slice(1);
                if (!id) return;
                const target = document.getElementById(id);
                if (!target) return;
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
                window.scrollTo({ top, behavior: 'smooth' });
                if (window.CiceroDrawer) window.CiceroDrawer.close();
            });
        });
    });
    </script>`
    })
  );
}

// ─── Dr. Cícero Urban ────────────────────────────────────────────────────────
function generateDrPage() {
  const main = `
        ${heroPage({
          eyebrow: 'Dr. Cícero Urban',
          title: 'Dr. Cícero Urban, MD PhD',
          subtitle: 'Mastologista — décadas dedicadas ao cuidado da mama em todas as suas dimensões.',
          image: `${IMG}/hero-slide-3-dr-cicero.webp`
        })}
        <section class="section-page bg-white">
            <div class="container mx-auto px-6">
                <div class="max-w-3xl mx-auto" data-aos="fade-up">
                    <p class="text-gray-600 text-lg leading-relaxed mb-6">Há décadas, o Dr. Cícero Urban se dedica a uma das áreas mais delicadas da medicina: o cuidado da mama em todas as suas dimensões. Da consulta de rastreamento à cirurgia reconstrutiva mais complexa, sua trajetória é marcada por uma convicção que não muda com o tempo: ciência e cuidado humano não são opostos — são inseparáveis.</p>
                </div>
            </div>
        </section>
        <section class="section-page section-page--alt">
            <div class="container mx-auto px-6">
                <div class="grid lg:grid-cols-2 gap-14 items-center">
                    <div data-aos="fade-right">
                        <p class="text-brand-teal font-bold text-sm uppercase tracking-widest mb-3">Filosofia de atendimento</p>
                        <h2 class="text-3xl font-bold text-brand-dark mb-6">O que orienta a prática clínica</h2>
                        <blockquote class="testimonial-card mb-8">
                            <p class="testimonial-card__text">Ciência de fronteira, com olhar humano — cada paciente merece o mesmo rigor técnico e a mesma presença no momento mais delicado de sua vida.</p>
                        </blockquote>
                        <p class="text-gray-600 leading-relaxed">Para o Dr. Cícero, a consulta começa antes do diagnóstico e vai além do pós-operatório. Cada paciente chega com uma história, um medo e uma expectativa que merecem ser ouvidos com a mesma atenção dedicada ao exame clínico.</p>
                    </div>
                    <div class="relative rounded-3xl overflow-hidden shadow-2xl" data-aos="fade-left">
                        <img loading="lazy" src="${IMG}/consulta-contato".webp" alt="Consulta médica" class="w-full h-96 object-cover">
                    </div>
                </div>
            </div>
        </section>
        <section class="section-page bg-white">
            <div class="container mx-auto px-6 max-w-4xl">
                <div class="text-center mb-14" data-aos="fade-up">
                    <p class="text-brand-teal font-bold text-sm uppercase tracking-widest mb-3">Formação</p>
                    <h2 class="text-3xl font-bold text-brand-dark">Trajetória acadêmica e internacional</h2>
                    <p class="text-gray-600 mt-4 leading-relaxed">A formação se construiu em camadas, em países e idiomas diferentes, em contato com os centros que definem o estado da arte em cirurgia oncológica e reconstrutiva da mama.</p>
                </div>
                <div class="space-y-6" data-aos="fade-up">
                    ${[
                      ['Graduação em Medicina', 'Universidade Federal do Paraná (UFPR)'],
                      ['Especialização em Mastologia e Cirurgia Oncológica', 'Hospital Nossa Senhora das Graças, Curitiba, e Istituto Nazionale per lo Studio e la Cura dei Tumori, Milão'],
                      ['Mestrado e Doutorado em Clínica Cirúrgica', 'Universidade Federal do Paraná (UFPR)'],
                      ['Fellowship em Cirurgia Plástica e Reconstrutora da Mama', 'European Institute of Oncology, Milão'],
                      ['Pós-graduação em Bioética', 'Università Cattolica del Sacro Cuore, Roma'],
                      ['Pós-graduação em Liderança em Cirurgia', 'Universidade de Harvard, Boston']
                    ]
                      .map(
                        ([t, d]) => `<div class="flex gap-4 p-6 rounded-2xl bg-brand-light border border-palette-100">
                        <div class="w-10 h-10 shrink-0 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center"><i class="fa-solid fa-graduation-cap"></i></div>
                        <div><h3 class="font-bold text-brand-dark">${t}</h3><p class="text-gray-600 text-sm mt-1">${d}</p></div>
                    </div>`
                      )
                      .join('')}
                </div>
                <p class="text-gray-600 text-center mt-10 leading-relaxed" data-aos="fade-up">Milão, Roma, Boston, Curitiba. Cada etapa deixou uma marca na forma como o Dr. Cícero Urban opera, pesquisa e atende — uma prática que conversa com o que há de mais atual no mundo sem perder o vínculo com a realidade da paciente brasileira.</p>
            </div>
        </section>
        <section class="section-page section-page--alt">
            <div class="container mx-auto px-6">
                <div class="grid lg:grid-cols-2 gap-14">
                    <div data-aos="fade-right">
                        <p class="text-brand-teal font-bold text-sm uppercase tracking-widest mb-3">Onde atua hoje</p>
                        <h2 class="text-3xl font-bold text-brand-dark mb-8">Cargos e liderança institucional</h2>
                        ${renderList([
                          'Coordenador da Divisão de Oncoplastia — Centro de Doenças da Mama, HNSG, Curitiba',
                          'Diretor da Escola Brasileira de Mastologia',
                          'Preceptor da Especialização em Mastologia — HNSG, Curitiba',
                          'Conferencista internacional — congressos na Europa, América do Norte e Latina',
                          'Ex-editor-chefe da revista Mastology',
                          'Ex-diretor da Faculdade de Medicina — Universidade Positivo, Curitiba'
                        ])}
                    </div>
                    <div data-aos="fade-left">
                        <p class="text-brand-teal font-bold text-sm uppercase tracking-widest mb-3">Reconhecimentos</p>
                        <h2 class="text-3xl font-bold text-brand-dark mb-4">Uma carreira reconhecida além das fronteiras</h2>
                        <p class="text-gray-600 mb-8 leading-relaxed">Ao longo de décadas de atuação clínica, científica e acadêmica, reconhecimentos formais de instituições em quatro continentes.</p>
                        <div class="space-y-4">
                            <div class="p-6 rounded-2xl bg-white border border-palette-100 shadow-sm"><span class="text-xs font-bold text-brand-teal uppercase">2026 · Turquia</span><h3 class="font-bold text-brand-dark mt-2">Turkish Surgical Society</h3><p class="text-sm text-gray-600 mt-2">Convidado internacional — 24º Congresso Nacional de Cirurgia, Antalya.</p></div>
                            <div class="p-6 rounded-2xl bg-white border border-palette-100 shadow-sm"><span class="text-xs font-bold text-brand-teal uppercase">2023 · Austrália</span><h3 class="font-bold text-brand-dark mt-2">Royal Australasian College of Surgeons</h3><p class="text-sm text-gray-600 mt-2">Distinguished Visitor — Congresso Científico Anual de Adelaide.</p></div>
                            <div class="p-6 rounded-2xl bg-white border border-palette-100 shadow-sm"><span class="text-xs font-bold text-brand-teal uppercase">2023 · México</span><h3 class="font-bold text-brand-dark mt-2">50º Simposio Guerrerosantos</h3><p class="text-sm text-gray-600 mt-2">Diploma de Reconhecimento por Colaboração Científica — Guadalajara.</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        ${renderCta({ title: 'Agende uma consulta', text: 'Seja para um segundo parecer, diagnóstico recente ou cirurgia planejada — o caminho começa com uma conversa.' })}`;

  write(
    'dr-cicero-urban/index.html',
    pageShell({
      title: 'Dr. Cícero Urban | Mastologista',
      description: 'Conheça a trajetória do Dr. Cícero Urban, MD PhD — referência internacional em mastologia e cirurgia oncoplástica da mama em Curitiba.',
      canonical: `${SITE}/dr-cicero-urban/`,
      pageId: 'dr-cicero-urban',
      main
    })
  );
}

function generateContato() {
  const main = `
        ${heroPage({
          eyebrow: 'Contato',
          title: 'Agende sua consulta',
          subtitle: 'Oncoclinica — Curitiba. Atendimento das 09:30 às 18:30. Convênio Unimed.',
          image: `${IMG}/consulta-contato.webp`
        })}
        <section class="section-page bg-white">
            <div class="container mx-auto px-6">
                <div class="grid lg:grid-cols-12 gap-12">
                    <div class="lg:col-span-5 space-y-6" data-aos="fade-right">
                        <div class="flex gap-5 p-6 rounded-2xl bg-brand-light border border-palette-100">
                            <div class="w-14 h-14 shrink-0 rounded-xl bg-gradient-saude text-white flex items-center justify-center text-xl"><i class="fa-solid fa-location-dot"></i></div>
                            <div><span class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Endereço</span><span class="text-brand-dark font-semibold">Oncoclinica<br>Rua Profª. Rosa Saporski, 320<br>Mercês — CEP 80810-120<br>Curitiba, PR</span></div>
                        </div>
                        <a href="tel:+554133353300" class="flex gap-5 p-6 rounded-2xl bg-brand-light border border-palette-100 hover:border-brand-teal/30 hover:shadow-md transition-all group">
                            <div class="w-14 h-14 shrink-0 rounded-xl bg-gradient-vida text-white flex items-center justify-center text-xl"><i class="fa-solid fa-phone"></i></div>
                            <div><span class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Telefone</span><span class="text-brand-dark font-semibold group-hover:text-brand-teal transition-colors">(41) 3335-3300</span></div>
                        </a>
                        <a href="#" class="js-whatsapp contact-channel group">
                            <span class="contact-channel__icon contact-channel__icon--whatsapp"><i class="fa-brands fa-whatsapp"></i></span>
                            <div><span class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">WhatsApp</span><span class="text-brand-dark font-semibold group-hover:text-brand-teal transition-colors">(41) 98779-9722</span></div>
                        </a>
                        <div class="flex gap-5 p-6 rounded-2xl bg-brand-light border border-palette-100">
                            <div class="w-14 h-14 shrink-0 rounded-xl bg-brand-dark text-white flex items-center justify-center text-xl"><i class="fa-regular fa-clock"></i></div>
                            <div><span class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Horário</span><span class="text-brand-dark font-semibold">09:30 às 18:30</span><p class="text-sm text-gray-500 mt-2">Convênio: Unimed</p></div>
                        </div>
                    </div>
                    <div class="lg:col-span-7" data-aos="fade-left">
                        <div class="contact-whatsapp-card bg-white rounded-3xl border border-palette-100 shadow-[0_8px_40px_rgba(61,61,71,0.08)] p-8 lg:p-10">
                            <span class="inline-flex w-14 h-14 rounded-2xl bg-gradient-saude text-white items-center justify-center text-2xl mb-6 shadow-lg"><i class="fa-brands fa-whatsapp"></i></span>
                            <h2 class="text-2xl font-bold text-brand-dark mb-4">Agendar consulta pelo WhatsApp</h2>
                            <p class="text-gray-600 leading-relaxed mb-8">Ao clicar, abrimos o WhatsApp com uma mensagem pronta. Seja para rastreamento, segundo parecer ou planejamento cirúrgico — estamos à disposição.</p>
                            <a href="#" class="btn-primary js-whatsapp w-full sm:w-auto text-center">Agendar Consulta <i class="fa-brands fa-whatsapp"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>`;

  write(
    'contato/index.html',
    pageShell({
      title: 'Contato | Dr. Cícero Urban',
      description: 'Agende consulta com o Dr. Cícero Urban em Curitiba. Oncoclinica — Rua Profª. Rosa Saporski, 320. WhatsApp (41) 98779-9722.',
      canonical: `${SITE}/contato/`,
      pageId: 'contato',
      main
    })
  );
}

const NOVIDADES_POSTS = [
  {
    tag: 'Artigo',
    date: '15 mai. 2025',
    title: 'Mama densa: por que a mamografia pode não ser suficiente',
    excerpt: 'Entenda o que significa ter mama densa, como isso afeta a sensibilidade da mamografia e quais exames complementares podem ser indicados para um rastreamento mais seguro.',
    image: `${IMG}/artigo-mama-densa-mamografia-800w.webp`,
    alt: 'Médica analisando exame de imagem em caso de mama densa',
  },
  {
    tag: 'Artigo',
    date: '22 mar. 2025',
    title: 'BRCA1 e BRCA2: o que fazer após receber o resultado',
    excerpt: 'Um resultado positivo para mutação BRCA não significa que o câncer é inevitável. Conheça as opções de vigilância intensificada e cirurgia redutora de risco disponíveis hoje.',
    image: `${IMG}/artigo-brca-aconselhamento-800w.webp`,
    alt: 'Aconselhamento genético sobre mutações BRCA1 e BRCA2',
  },
  {
    tag: 'Artigo',
    date: '10 fev. 2025',
    title: 'Mastectomia poupadora de mamilo: quando é indicada?',
    excerpt: 'A NSM preserva a aparência natural da mama após a cirurgia. Saiba quais critérios oncológicos definem a elegibilidade e o que esperar da recuperação e dos resultados estéticos.',
    image: `${IMG}/artigo-mastectomia-poupadora-800w.webp`,
    alt: 'Centro cirúrgico — mastectomia poupadora de mamilo',
  },
  {
    tag: 'Congresso',
    date: '5 nov. 2024',
    title: 'BREAST 2024: resultados do estudo sobre reconstrução imediata',
    excerpt: 'No congresso internacional BREAST 2024 em San Antonio, o Dr. Cícero Urban apresentou dados de acompanhamento de longo prazo sobre reconstrução mamária imediata pós-mastectomia.',
    image: `${IMG}/congresso-breast-reconstrucao-800w.webp`,
    alt: 'Auditório de congresso médico internacional de mastologia',
  },
  {
    tag: 'Imprensa',
    date: '18 set. 2024',
    title: 'Diagnóstico precoce do câncer de mama em entrevista ao Bem Estar',
    excerpt: 'O Dr. Cícero Urban explica ao programa Bem Estar (TV Globo) a importância do rastreamento anual e como interpretar os achados da mamografia sem alarmismo.',
    image: `${IMG}/entrevista-imprensa-diagnostico-800w.webp`,
    alt: 'Estúdio de televisão — entrevista sobre diagnóstico precoce',
  },
  {
    tag: 'Artigo',
    date: '3 jul. 2024',
    title: 'Cirurgia oncoplástica: oncologia e estética não são opostos',
    excerpt: 'A cirurgia oncoplástica integra técnicas de cirurgia plástica à ressecção oncológica, permitindo margens seguras sem comprometer a forma e a simetria da mama.',
    image: `${IMG}/artigo-cirurgia-oncoplastica-800w.webp`,
    alt: 'Equipe cirúrgica em bloco operatório de cirurgia oncoplástica',
  },
];

function novidadeCard(post, i) {
  return `<article class="post-related-card" data-aos="fade-up" data-aos-delay="${(i % 3) * 80}">
                <a href="#" class="post-related-card__media" tabindex="-1" aria-hidden="true">
                    <img loading="lazy" decoding="async" src="${post.image}" alt="${post.alt}" class="post-related-card__img" width="800" height="450">
                    <span class="post-related-card__tag">${post.tag}</span>
                </a>
                <div class="post-related-card__body">
                    <p class="post-related-card__meta"><i class="fa-regular fa-calendar"></i>${post.date}</p>
                    <h2 class="post-related-card__title"><a href="#">${post.title}</a></h2>
                    <p class="post-related-card__excerpt">${post.excerpt}</p>
                    <span class="post-related-card__link">Ler artigo <i class="fa-solid fa-arrow-right text-xs"></i></span>
                </div>
            </article>`;
}

function generateNovidades() {
  const cards = NOVIDADES_POSTS.map((p, i) => novidadeCard(p, i)).join('\n            ');

  const main = `
        ${heroPage({
          eyebrow: 'Novidades',
          title: 'Ciência, imprensa e congressos',
          subtitle: 'Artigos, participações internacionais e matérias sobre mastologia e cirurgia oncoplástica.',
          image: `${IMG}/novidades-ciencia-imprensa.webp`
        })}
        <section class="section-page bg-white">
            <div class="container mx-auto px-6">
                <div class="post-related__grid">
                    ${cards}
                </div>
            </div>
        </section>`;

  write(
    'novidades/index.html',
    pageShell({
      title: 'Novidades | Dr. Cícero Urban',
      description: 'Blog, imprensa e congressos do Dr. Cícero Urban — referência em mastologia e cirurgia oncoplástica.',
      canonical: `${SITE}/novidades/`,
      pageId: 'novidades',
      main
    })
  );
}

function generatePolitica() {
  const main = `
        <section class="page-hero page-hero--light">
            <div class="container mx-auto px-6 max-w-3xl">
                <h1 class="page-hero__title">Política de Privacidade</h1>
                <p class="page-hero__subtitle">Como tratamos seus dados ao utilizar este site.</p>
            </div>
        </section>
        <section class="section-page bg-white">
            <div class="container mx-auto px-6 max-w-3xl prose prose-gray">
                <p class="text-gray-600 leading-relaxed mb-4">Este site institucional do Dr. Cícero Urban respeita a privacidade dos visitantes. Informações enviadas por WhatsApp ou telefone são utilizadas exclusivamente para agendamento e comunicação sobre consultas.</p>
                <p class="text-gray-600 leading-relaxed mb-4">Podemos utilizar cookies analíticos para entender o uso do site. Você pode desativá-los nas configurações do navegador.</p>
                <p class="text-gray-600 leading-relaxed">Para dúvidas sobre privacidade, entre em contato pelo WhatsApp disponível no site.</p>
            </div>
        </section>`;

  write(
    'politica-privacidade/index.html',
    pageShell({
      title: 'Política de Privacidade | Dr. Cícero Urban',
      description: 'Política de privacidade do site do Dr. Cícero Urban.',
      canonical: `${SITE}/politica-privacidade/`,
      pageId: 'politica-privacidade',
      main
    })
  );
}

function generate404() {
  write(
    '404.html',
    pageShell({
      title: 'Página não encontrada | Dr. Cícero Urban',
      description: 'Página não encontrada.',
      canonical: `${SITE}/404.html`,
      pageId: '404',
      main: `<section class="section-page bg-white text-center">
            <div class="container mx-auto px-6 max-w-lg" data-aos="fade-up">
                <p class="text-6xl font-bold text-brand-teal mb-4">404</p>
                <h1 class="text-2xl font-bold text-brand-dark mb-4">Página não encontrada</h1>
                <p class="text-gray-600 mb-8">O endereço que você procurou não existe ou foi movido.</p>
                <a href="/" class="btn-primary inline-flex">Voltar ao início</a>
            </div>
        </section>`
    })
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
areasPage({
  pageId: 'doencas-e-condicoes',
  path: 'areas-de-atuacao/doencas-e-condicoes/index.html',
  title: 'Doenças e Condições da Mama | Dr. Cícero Urban',
  description: 'Câncer de mama, nódulos, tumores benignos, mama densa, microcalcificações e mutações BRCA — informação clara sobre diagnóstico e tratamento.',
  hero: {
    eyebrow: 'Doenças e Condições',
    title: 'Doenças e condições da mama',
    subtitle: 'O que cada diagnóstico significa e quais os caminhos possíveis.',
    image: `${IMG}/cancer-de-mama.webp`,
    pills: DOENCAS_CARDS.map((c) => ({ id: c.id, label: c.title }))
  },
  intro: 'Um laudo, um nódulo palpado, um resultado de mamografia. Este espaço existe para organizar esse percurso: explicar o que cada achado pode significar, quando investigar com mais profundidade e quais são as opções reais de tratamento.',
  cards: DOENCAS_CARDS,
  topics: DOENCAS_TOPICS
});

areasPage({
  pageId: 'procedimentos-e-cirurgias',
  path: 'areas-de-atuacao/procedimentos-e-cirurgias/index.html',
  title: 'Procedimentos e Cirurgias | Dr. Cícero Urban',
  description: 'Cirurgia oncoplástica, reconstrução mamária, mastectomia, mastectomia poupadora de mamilo e cirurgia conservadora — explicações honestas sobre cada técnica.',
  hero: {
    eyebrow: 'Procedimentos e Cirurgias',
    title: 'Procedimentos e cirurgias',
    subtitle: 'Como cada intervenção funciona e o que ela muda para a paciente.',
    image: `${IMG}/procedimentos-mastectomia.webp`,
    pills: PROC_CARDS.map((c) => ({ id: c.id, label: c.title }))
  },
  intro: 'A decisão cirúrgica é uma das mais delicadas de todo o percurso oncológico. O que você encontra aqui são explicações honestas sobre cada técnica: o que envolve, quando é indicada e o que a evidência científica mais atual diz sobre resultados e qualidade de vida.',
  cards: PROC_CARDS,
  topics: PROCEDIMENTOS_TOPICS
});

generateDrPage();
generateContato();
generateNovidades();
generatePolitica();
generate404();

console.log('\n✓ Páginas geradas com sucesso.\n');
