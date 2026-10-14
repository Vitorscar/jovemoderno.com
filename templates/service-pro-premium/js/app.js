/* ============================================================
   Service Pro Premium — orquestrador
   ============================================================ */

let configAtual = null;

/* ─────────── Seleção de nicho ─────────── */
function selecionarNicho(nichoKey) {
  if (nichoKey === "outro") {
    const customJSON = localStorage.getItem("servicepro.customNicho");
    configAtual = customJSON ? JSON.parse(customJSON) : nichos.outro;
  } else {
    configAtual = nichos[nichoKey];
  }
  if (!configAtual) return;

  aplicarTema(configAtual);
  renderizarSite(configAtual);

  document.getElementById("onboarding").style.display = "none";
  document.getElementById("site-preview").style.display = "block";

  /* Barra flutuante + WhatsApp float */
  const bar = document.getElementById("preview-bar");
  const float = document.getElementById("whatsapp-float");
  const nome = document.getElementById("preview-nome");
  const wa = document.getElementById("preview-wa");
  const waNumber = whatsNumero();
  const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent('Olá! Vim pelo site e quero mais informações.')}`;

  if (bar) { bar.hidden = false; nome.textContent = configAtual.nome; }
  if (float) { float.hidden = false; float.href = waURL; }
  if (wa) { wa.href = waURL; }

  inicializarScripts();
  window.scrollTo({ top: 0, behavior: "instant" });
}

/* ─────────── Trocar de nicho ─────────── */
function trocarNicho() {
  document.getElementById("site-preview").style.display = "none";
  document.getElementById("site-preview").innerHTML = "";
  document.getElementById("onboarding").style.display = "flex";
  document.getElementById("preview-bar").hidden = true;
  document.getElementById("whatsapp-float").hidden = true;
  configAtual = null;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ─────────── Tema ─────────── */
function aplicarTema(config) {
  const r = document.documentElement;
  r.style.setProperty("--cor-primaria", config.corPrimaria);
  r.style.setProperty("--cor-secundaria", config.corSecundaria);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", config.corPrimaria);
}

/* ─────────── Render ─────────── */
function renderizarSite(config) {
  const container = document.getElementById("site-preview");
  const blocos = config.blocosAtivos || [];
  container.innerHTML = blocos
    .map(chave => (geradores[chave] ? geradores[chave](config) : ""))
    .join("");
}

/* ─────────── WhatsApp ─────────── */
function whatsNumero() {
  return (typeof WHATS_PADRAO !== "undefined") ? WHATS_PADRAO : "5561900000000";
}

/* ─────────── Scripts pós-render ─────────── */
function inicializarScripts() {
  /* FAQ accordion */
  document.querySelectorAll(".faq-pergunta").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const aberto = item.classList.toggle("ativa");
      btn.setAttribute("aria-expanded", String(aberto));
    });
  });

  /* Slider antes/depois */
  document.querySelectorAll(".slider-comparador").forEach(slider => {
    const upd = () => {
      const container = slider.closest(".comparador");
      const depois = container?.querySelector(".depois");
      if (depois) depois.style.width = `${slider.value}%`;
    };
    slider.addEventListener("input", upd);
    upd();
  });

  /* Filtro de portfólio */
  document.querySelectorAll(".filtro-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.cat;
      document.querySelectorAll(".filtro-btn").forEach(b => b.classList.remove("ativo"));
      btn.classList.add("ativo");
      document.querySelectorAll(".item-portfolio").forEach(item => {
        item.style.display = (cat === "Todos" || item.dataset.cat === cat) ? "" : "none";
      });
    });
  });

  /* Smooth scroll para âncoras internas */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* Formulário de agendamento */
  const form = document.getElementById("form-agendamento");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const nome = (data.get("nome") || "").toString().trim();
      const fone = (data.get("fone") || "").toString().replace(/\D/g, "");
      const servico = (data.get("servico") || "").toString().trim();

      if (nome.length < 2) { alert("Informe seu nome."); return; }
      if (fone.length < 10) { alert("Informe o WhatsApp com DDD."); return; }

      const msg =
        `Olá! Vim pelo site${configAtual?.nome ? ` da ${configAtual.nome}` : ""}.\n` +
        `• Nome: ${nome}\n` +
        `• WhatsApp: ${fone}\n` +
        (servico ? `• Interesse: ${servico}\n` : "") +
        `\nAguardo retorno, obrigado!`;

      const url = `https://wa.me/${whatsNumero()}?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank", "noopener");
    });

    /* Máscara simples no telefone */
    const foneInput = form.querySelector('input[name="fone"]');
    if (foneInput) {
      foneInput.addEventListener("input", (e) => {
        let v = e.target.value.replace(/\D/g, "").slice(0, 11);
        if (v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
        else if (v.length > 6) v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
        else if (v.length > 0) v = v.replace(/^(\d{0,2}).*/, "($1");
        e.target.value = v;
      });
    }
  }
}