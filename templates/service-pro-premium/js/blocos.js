/* ============================================================
   Service Pro Premium — geradores de bloco
   Cada função recebe a config do nicho e devolve HTML.
   ============================================================ */

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({
  "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
}[c]));

function gerarHero(config) {
  const h = config.hero || {};
  const wa = h.cta2?.link || `https://wa.me/${WHATS_PADRAO}`;
  return `
    <section class="hero" id="inicio" style="--hero-cor:${esc(config.corPrimaria)}">
      <div class="hero-bg" aria-hidden="true"></div>
      <div class="hero-content">
        <h1>${esc(h.headline)}</h1>
        <p>${esc(h.subheadline)}</p>
        <div class="hero-botoes">
          <a href="${esc(h.cta1?.link || '#agendamento')}" class="btn-primario">${esc(h.cta1?.texto || 'Fale conosco')}</a>
          <a href="${esc(wa)}" target="_blank" rel="noopener" class="btn-secundario">${esc(h.cta2?.texto || 'WhatsApp')}</a>
        </div>
      </div>
    </section>`;
}

function gerarDiferencial(config) {
  if (!config.diferenciais?.length) return "";
  const itens = config.diferenciais.map(d => `
    <div class="card-diferencial">
      <span class="icone" aria-hidden="true">${esc(d.icone)}</span>
      <h3>${esc(d.titulo)}</h3>
      <p>${esc(d.desc)}</p>
    </div>`).join("");
  return `<section class="diferencial" id="diferencial"><h2>Por que nos escolher?</h2><div class="grid-diferencial">${itens}</div></section>`;
}

function gerarServicos(config) {
  if (!config.servicos?.length) return "";
  const cards = config.servicos.map(s => `
    <div class="card-servico">
      <span class="icone" aria-hidden="true">${esc(s.icone)}</span>
      <h3>${esc(s.titulo)}</h3>
      <p>${esc(s.desc)}</p>
    </div>`).join("");
  return `<section class="servicos" id="servicos"><h2>Nossos serviços</h2><div class="grid-servicos">${cards}</div></section>`;
}

function gerarProcesso(config) {
  if (!config.processo?.length) return "";
  const passos = config.processo.map((p, i) => `
    <div class="passo">
      <div class="passo-numero">${i + 1}</div>
      <h3>${esc(p.titulo)}</h3>
      <p>${esc(p.desc)}</p>
    </div>`).join("");
  return `<section class="processo" id="processo"><h2>Como funciona?</h2><div class="grid-processo">${passos}</div></section>`;
}

function gerarPortfolio(config) {
  const p = config.portfolio;
  if (!p) return "";
  const cats = p.categorias || [];
  const imgs = p.imagens || [];

  if (!imgs.length) {
    return `<section class="portfolio" id="portfolio">
      <h2>Portfólio</h2>
      <p class="portfolio-empty">Adicione imagens em <code>config.portfolio.imagens</code> para exibir aqui.</p>
    </section>`;
  }

  let html = `<section class="portfolio" id="portfolio"><h2>Portfólio</h2>`;
  html += `<div class="filtros-portfolio">`;
  html += `<button class="filtro-btn ativo" data-cat="Todos">Todos</button>`;
  cats.forEach(cat => { html += `<button class="filtro-btn" data-cat="${esc(cat)}">${esc(cat)}</button>`; });
  html += `</div><div class="grid-portfolio">`;
  imgs.forEach(img => {
    html += `<div class="item-portfolio" data-cat="${esc(img.cat)}"><img src="${esc(img.src)}" alt="" loading="lazy"></div>`;
  });
  html += `</div></section>`;
  return html;
}

function gerarAntesDepois(config) {
  const ad = config.antesDepois;
  if (!ad || !ad.imagens?.length) return "";
  const slides = ad.imagens.map(img => `
    <div class="comparador">
      <img src="${esc(img.antes)}" alt="Antes" class="antes" loading="lazy">
      <div class="depois"><img src="${esc(img.depois)}" alt="Depois" loading="lazy"></div>
      <input type="range" min="0" max="100" value="50" class="slider-comparador" aria-label="Comparar antes e depois">
    </div>`).join("");
  return `<section class="antes-depois" id="antesDepois"><h2>${esc(ad.titulo)}</h2><div class="slider-container">${slides}</div></section>`;
}

function gerarEquipe(config) {
  if (!config.equipe?.length) return "";
  const membros = config.equipe.map(m => `
    <div class="card-equipe">
      ${m.foto
        ? `<img src="${esc(m.foto)}" alt="${esc(m.nome)}" class="foto-equipe" loading="lazy">`
        : `<div class="foto-equipe foto-placeholder" aria-hidden="true">${esc(m.nome.split(' ').map(w=>w[0]).slice(0,2).join(''))}</div>`}
      <h3>${esc(m.nome)}</h3>
      <p>${esc(m.funcao)}</p>
    </div>`).join("");
  return `<section class="equipe" id="equipe"><h2>Nossa equipe</h2><div class="grid-equipe">${membros}</div></section>`;
}

function gerarPlanos(config) {
  if (!config.planos?.length) return "";
  const planosHTML = config.planos.map(p => `
    <div class="card-plano">
      <h3>${esc(p.nome)}</h3>
      <div class="preco">${esc(p.preco)}<span>/mês</span></div>
      <ul>${p.beneficios.map(b => `<li>✓ ${esc(b)}</li>`).join("")}</ul>
      <a href="#agendamento" class="btn-primario">Assinar</a>
    </div>`).join("");
  return `<section class="planos" id="planos"><h2>Nossos planos</h2><div class="grid-planos">${planosHTML}</div></section>`;
}

function gerarAgendamento(config) {
  const a = config.agendamento || {};
  if (a.tipo === "embed" && a.src) {
    return `<section id="agendamento" class="agendamento">
      <h2>Agende agora</h2>
      <div class="embed-agenda"><iframe src="${esc(a.src)}" width="100%" height="600" loading="lazy" title="Agendamento"></iframe></div>
    </section>`;
  }
  return `
    <section id="agendamento" class="agendamento">
      <h2>Agende agora</h2>
      <p class="agendamento-sub">Preencha seus dados e continue no WhatsApp para confirmar.</p>
      <form class="form-agendamento" id="form-agendamento">
        <input type="text" name="nome" placeholder="Seu nome" required autocomplete="name" maxlength="80">
        <input type="tel" name="fone" placeholder="WhatsApp com DDD" required inputmode="numeric" autocomplete="tel" maxlength="16">
        <select name="servico" aria-label="Serviço desejado">
          <option value="">Serviço de interesse (opcional)</option>
          ${(config.servicos || []).map(s => `<option>${esc(s.titulo)}</option>`).join("")}
        </select>
        <button type="submit" class="btn-primario">Enviar pelo WhatsApp</button>
      </form>
    </section>`;
}

function gerarAvaliacoes(config) {
  if (!config.avaliacoes?.length) return "";
  const depoimentos = config.avaliacoes.map(d => `
    <div class="card-avaliacao">
      <div class="estrelas" aria-label="${d.nota} de 5 estrelas">${"★".repeat(d.nota)}${"☆".repeat(5-d.nota)}</div>
      <p>"${esc(d.texto)}"</p>
      <strong>— ${esc(d.nome)}</strong>
    </div>`).join("");
  return `<section class="avaliacoes" id="avaliacoes"><h2>O que dizem nossos clientes</h2><div class="carrossel-avaliacoes">${depoimentos}</div></section>`;
}

function gerarFAQ(config) {
  if (!config.faq?.length) return "";
  const itens = config.faq.map((f, i) => `
    <div class="faq-item">
      <button class="faq-pergunta" type="button" aria-expanded="false" aria-controls="faq-${i}">
        <span>${esc(f.pergunta)}</span>
        <span class="faq-seta" aria-hidden="true">▼</span>
      </button>
      <div class="faq-resposta" id="faq-${i}">${esc(f.resposta)}</div>
    </div>`).join("");
  return `<section class="faq" id="faq"><h2>Perguntas frequentes</h2>${itens}</section>`;
}

function gerarLocalizacao(config) {
  const loc = config.localizacao;
  if (!loc) return "";
  return `
    <section class="localizacao" id="localizacao">
      <h2>Onde estamos</h2>
      ${loc.mapa
        ? `<div class="mapa-container"><iframe src="${esc(loc.mapa)}" width="100%" height="300" loading="lazy" title="Localização"></iframe></div>`
        : `<div class="mapa-container mapa-placeholder" aria-hidden="true">Localização no mapa</div>`}
      <p class="endereco">📍 ${esc(loc.endereco)}</p>
    </section>`;
}

function gerarCTAFinal(config) {
  const ct = config.ctaFinal;
  if (!ct) return "";
  return `
    <section class="cta-final" id="ctaFinal">
      <h2>${esc(ct.texto)}</h2>
      <a href="${esc(ct.link || '#agendamento')}" class="btn-primario">${esc(ct.cta)}</a>
    </section>`;
}

const geradores = {
  hero: gerarHero,
  diferencial: gerarDiferencial,
  servicos: gerarServicos,
  processo: gerarProcesso,
  portfolio: gerarPortfolio,
  antesDepois: gerarAntesDepois,
  equipe: gerarEquipe,
  planos: gerarPlanos,
  agendamento: gerarAgendamento,
  avaliacoes: gerarAvaliacoes,
  faq: gerarFAQ,
  localizacao: gerarLocalizacao,
  ctaFinal: gerarCTAFinal
};