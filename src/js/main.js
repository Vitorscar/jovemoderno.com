/* =========================================================
   JOVEMODERNO — main.js
   ---------------------------------------------------------
   1.  Utilities
   2.  WhatsApp
   3.  Mobile menu
   4.  Portfolio filter
   5.  Header on scroll
   6.  Scroll reveal
   7.  Back to top
   8.  Hero typed code
   9.  Footer year
   10. TopPrint calculator
   11. Smooth internal scroll
   12. Catalog — view template
   13. Catalog — inquire about a template
   ========================================================= */

/* ---------- 1. Utilities ---------- */
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
    'Hi! I came from the JOVEMODERNO website and would like a quote.'
  );
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
});

/* ---------- 3. Mobile menu ---------- */
const burger = $('.burger');
const menu   = $('#main-menu') || $('#menu-principal') || $('.nav ul');

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

/* ---------- 4. Portfolio filter ---------- */
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

/* ---------- 5. Header on scroll ---------- */
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

/* ---------- 7. Back to top ---------- */
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

/* ---------- 8. Hero typed code ---------- */
const out = $('#typed');

if (out) {
  const html = `<span class="c">// your idea, in production</span>
<span class="k">const</span> project = {
  client: <span class="s">"you"</span>,
  deliver: [<span class="s">"site"</span>, <span class="s">"system"</span>, <span class="s">"data"</span>],
  based: <span class="s">"Brazil"</span>,
  serves: <span class="s">"worldwide"</span>
};

<span class="k">await</span> jovemoderno.<span class="k">build</span>(project);
<span class="c">// ready to use ✓</span>`;

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

/* ---------- 9. Footer year ---------- */
$$('.year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

/* ---------- 10. TopPrint calculator ---------- */
const calc = $('#calc');

if (calc) {
  /* Print pricing in USD — per unit */
  const pricing = { card: 0.35, folder: 0.9, banner: 38 };
  const select  = calc.querySelector('select');
  const input   = calc.querySelector('input');
  const output  = calc.querySelector('output');

  const update = () => {
    const type = select?.value ?? 'card';
    const qty  = Math.max(1, Number(input?.value) || 1);
    const total = (pricing[type] ?? 0) * qty;

    if (output) {
      output.textContent = total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    }
  };

  calc.addEventListener('input', update);
  update();
}

/* ---------- 11. Smooth internal scroll ---------- */
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

/* ---------- 12. Catalog — view template ---------- */
/* Used in work/index.html and category pages to open a template. */
window.viewTemplate = (category, template) => {
  window.location.href = `../templates/${category}/${template}.html`;
};

/* Backwards-compatible alias (old PT-BR name) */
window.visualizarTemplate = window.viewTemplate;

/* ---------- 13. Catalog — inquire about a template ---------- */
/* Signature: (model, tier).
   The price lives only in the #pricing section, never in the card. */
window.inquireAboutSite = (model, tier) => {
  const tierLabel = tier ? ` (${tier} package)` : '';

  const msg =
    `Hi! I'm interested in the "${model}" template${tierLabel} from JOVEMODERNO.\n\n` +
    `Could you tell me how customization works and the delivery timeline?`;

  window.open(wa(msg), '_blank', 'noopener');
};

/* Backwards-compatible alias (old PT-BR name — accepts and ignores a 3rd arg) */
window.queroEsseSite = (model, tier, _legacy) =>
  window.inquireAboutSite(model, tier);