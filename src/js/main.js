/* =========================================================
   JOVEMODERNO — main.js
   ---------------------------------------------------------
   1.  Utilitários
   2.  WhatsApp
   3.  Menu mobile
   4.  Filtro do portfólio
   5.  Header scrolled
   6.  Scroll reveal
   7.  Voltar ao topo
   8.  Código digitado (hero)
   9.  Ano no rodapé
   10. Calculadora TopPrint
   11. Smooth scroll interno
   12. Catálogo — visualizar template
   13. Catálogo — quero esse site
   ========================================================= */

/* ---------- 1. Utilitários ---------- */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 2. WhatsApp ---------- */
const WHATS = '5575999120261';
const wa = (msg) =>
  `https://wa.me/${WHATS}?text=${encodeURIComponent(msg)}`;

$$('[data-wa]').forEach((a) => {
  a.href = wa(
    a.dataset.wa ||
    'Olá! Vim pelo site da JOVEMODERNO e gostaria de pedir um orçamento.'
  );
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
});

/* ---------- 3. Menu mobile ---------- */
const burger = $('.burger');
const menu   = $('#menu-principal') || $('.nav ul');

if (burger && menu) {
  const closeMenu = () => {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });

  menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
      burger.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('open')) return;
    if (!menu.contains(e.target) && !burger.contains(e.target)) closeMenu();
  });
}

/* ---------- 4. Filtro do portfólio ---------- */
const tabs       = $$('.tab');
const cards      = $$('.card[data-cat]');
const emptyState = $('.empty-state');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) =>
      t.setAttribute('aria-selected', String(t === tab))
    );

    const filter = tab.dataset.filter;
    let visible = 0;

    cards.forEach((card) => {
      const match = filter === 'todos' || card.dataset.cat === filter;
      card.hidden = !match;
      if (match) visible++;
    });

    if (emptyState) emptyState.hidden = visible > 0;
  });
});

/* ---------- 5. Header scrolled ---------- */
const header = $('header');
let headerTick = false;

const updateHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > 12);
  headerTick = false;
};

if (header) {
  updateHeader();
  window.addEventListener(
    'scroll',
    () => {
      if (!headerTick) {
        headerTick = true;
        requestAnimationFrame(updateHeader);
      }
    },
    { passive: true }
  );
}

/* ---------- 6. Scroll reveal ---------- */
const revealEls = $$('.reveal');

if (revealEls.length) {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 60}ms`;
      io.observe(el);
    });
  }
}

/* ---------- 7. Voltar ao topo ---------- */
const toTop = $('.to-top');

if (toTop) {
  let topTick = false;

  const updateTopBtn = () => {
    toTop.hidden = window.scrollY < 400;
    topTick = false;
  };

  updateTopBtn();
  window.addEventListener(
    'scroll',
    () => {
      if (!topTick) {
        topTick = true;
        requestAnimationFrame(updateTopBtn);
      }
    },
    { passive: true }
  );

  toTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  });
}

/* ---------- 8. Código digitado no hero ---------- */
const out = $('#typed');

if (out) {
  const html = `<span class="c">// sua ideia, em produção</span>
<span class="k">const</span> projeto = {
  cliente: <span class="s">"você"</span>,
  entrega: [<span class="s">"site"</span>, <span class="s">"sistema"</span>, <span class="s">"dados"</span>],
  base: <span class="s">"Brasília, DF"</span>,
  atende: <span class="s">"todo o Brasil"</span>
};

<span class="k">await</span> jovemoderno.<span class="k">desenvolver</span>(projeto);
<span class="c">// pronto para usar ✓</span>`;

  const render = (i, withCaret = true) => {
    out.innerHTML =
      html.slice(0, i) + (withCaret ? '<span class="caret"></span>' : '');
  };

  if (prefersReducedMotion()) {
    out.innerHTML = html;
  } else {
    let i = 0;

    const tick = () => {
      if (html[i] === '<') {
        const close = html.indexOf('>', i);
        if (close !== -1) i = close + 1;
        else i++;
      } else {
        i++;
      }

      render(i);

      if (i < html.length) {
        setTimeout(tick, 22);
      } else {
        render(html.length, false);
      }
    };

    tick();
  }
}

/* ---------- 9. Ano no rodapé ---------- */
$$('.year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

/* ---------- 10. Calculadora TopPrint ---------- */
const calc = $('#calc');

if (calc) {
  const preco  = { cartao: 0.35, folder: 0.9, banner: 38 };
  const select = calc.querySelector('select');
  const input  = calc.querySelector('input');
  const output = calc.querySelector('output');

  const upd = () => {
    const t = select?.value ?? 'cartao';
    const q = Math.max(1, Number(input?.value) || 1);
    const total = (preco[t] ?? 0) * q;

    if (output) {
      output.textContent = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    }
  };

  calc.addEventListener('input', upd);
  upd();
}

/* ---------- 11. Smooth scroll interno ---------- */
$$('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (id === '#' || id.length < 2) return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    });
  });
});

/* ---------- 12. Catálogo — visualizar template ---------- */
/* Usado em modelos/index.html e categorias: botões que abrem o template */
window.visualizarTemplate = (categoria, modelo) => {
  window.location.href = `../templates/${categoria}/${modelo}.html`;
};

/* ---------- 13. Catálogo — quero esse site ---------- */
/* Nova assinatura: (modelo, tier). O preço vive só na seção #precos. */
window.queroEsseSite = (modelo, tier, _legado) => {
  /* _legado: aceita o 3º argumento (preço) por compatibilidade com
     chamadas antigas. É ignorado — o preço agora está só em #precos. */

  const pacote = tier ? ` (pacote ${tier})` : '';

  const msg =
    `Olá! Tenho interesse no modelo "${modelo}"${pacote} da JOVEMODERNO.\n\n` +
    `Pode me contar como funciona a personalização e o prazo de entrega?`;

  window.open(wa(msg), '_blank', 'noopener');
};