/**
 * Clínica Médica Premium — JavaScript principal
 * Gerencia: navegação, dark mode, scroll reveal, carrossel,
 * agendamento, galeria lightbox, menu mobile
 */

(function () {
  'use strict';

  // ============ DADOS MOCKADOS ============
  const especialidades = [
    'Cardiologia', 'Pediatria', 'Ortopedia', 'Neurologia',
    'Ginecologia', 'Oftalmologia', 'Clínica Geral', 'Odontologia', 'Dermatologia'
  ];

  const medicos = [
    { id: 1, nome: 'Dr. João Silva', especialidade: 'Cardiologia', crm: 'CRM-SP 12.345', experiencia: '15 anos', foto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face' },
    { id: 2, nome: 'Dra. Maria Santos', especialidade: 'Pediatria', crm: 'CRM-SP 23.456', experiencia: '12 anos', foto: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face' },
    { id: 3, nome: 'Dr. Carlos Oliveira', especialidade: 'Ortopedia', crm: 'CRM-SP 34.567', experiencia: '18 anos', foto: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face' },
    { id: 4, nome: 'Dra. Ana Costa', especialidade: 'Neurologia', crm: 'CRM-SP 45.678', experiencia: '14 anos', foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face' },
    { id: 5, nome: 'Dra. Paula Mendes', especialidade: 'Ginecologia', crm: 'CRM-SP 56.789', experiencia: '20 anos', foto: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=400&fit=crop&crop=face' },
    { id: 6, nome: 'Dr. Roberto Lima', especialidade: 'Oftalmologia', crm: 'CRM-SP 67.890', experiencia: '16 anos', foto: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face' },
    { id: 7, nome: 'Dr. Fernando Rocha', especialidade: 'Clínica Geral', crm: 'CRM-SP 78.901', experiencia: '10 anos', foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' },
    { id: 8, nome: 'Dra. Beatriz Alves', especialidade: 'Dermatologia', crm: 'CRM-SP 89.012', experiencia: '11 anos', foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face' },
    { id: 9, nome: 'Dr. Ricardo Neves', especialidade: 'Odontologia', crm: 'CRO-SP 90.123', experiencia: '13 anos', foto: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face' },
  ];

  const horariosPadrao = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

  const convenios = [
    'Unimed', 'Amil', 'Bradesco Saúde', 'SulAmérica', 'Porto Saúde',
    'Hapvida', 'NotreDame Intermédica', 'Allianz', 'Omint'
  ];

  const galeriaImagens = [
    { src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', alt: 'Recepção da clínica', titulo: 'Recepção' },
    { src: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80', alt: 'Consultório moderno', titulo: 'Consultório' },
    { src: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&q=80', alt: 'Equipamentos médicos', titulo: 'Equipamentos' },
    { src: 'https://images.unsplash.com/photo-1582719471384-894fbb4c3a6a?w=800&q=80', alt: 'Laboratório de análises', titulo: 'Laboratório' },
    { src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80', alt: 'Estacionamento', titulo: 'Estacionamento' },
  ];

  // ============ ESTADO DO AGENDAMENTO ============
  let agendamentoState = {
    step: 1,
    especialidade: '',
    medico: null,
    data: '',
    horario: ''
  };

  let calendarioMesAtual = new Date().getMonth();
  let calendarioAnoAtual = new Date().getFullYear();

  // ============ DARK MODE ============
  function initDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    const saved = localStorage.getItem('clinica-dark-mode');
    if (saved === 'true') {
      document.body.classList.add('dark');
    }
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('clinica-dark-mode', document.body.classList.contains('dark'));
    });
  }

  // ============ HEADER SCROLL ============
  function initHeaderScroll() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ============ MENU MOBILE ============
  function initMenuMobile() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      nav.classList.toggle('open');
      const isOpen = nav.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') &&
          !nav.contains(e.target) &&
          e.target !== menuToggle &&
          !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('open');
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ============ SCROLL REVEAL ============
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, parseInt(delay));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  // ============ NAVEGAÇÃO SUAVE ============
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = document.getElementById('header').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      });
    });
  }

  // ============ NAV LINK ATIVO ============
  function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      const headerHeight = document.getElementById('header').offsetHeight + 50;
      sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  // ============ RENDERIZAR EQUIPE ============
  function renderEquipe() {
    const grid = document.getElementById('equipeGrid');
    if (!grid) return;
    grid.innerHTML = medicos.map(m => `
      <div class="equipe-card">
        <img src="${m.foto}" alt="${m.nome}" class="equipe-foto" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22260%22 height=%22280%22><rect fill=%22%23E2E8F0%22 width=%22260%22 height=%22280%22/><text x=%22130%22 y=%22150%22 text-anchor=%22middle%22 font-size=%2260%22>👨‍⚕️</text></svg>'">
        <h3>${m.nome}</h3>
        <span class="especialidade-tag">${m.especialidade}</span>
        <p class="crm">${m.crm}</p>
        <p class="experiencia">${m.experiencia} de experiência</p>
      </div>
    `).join('');
  }

  // ============ RENDERIZAR GALERIA ============
  function renderGaleria() {
    const grid = document.getElementById('galeriaGrid');
    if (!grid) return;
    grid.innerHTML = galeriaImagens.map((img, i) => `
      <div class="galeria-item" onclick="openLightbox('${img.src}')" role="button" tabindex="0" aria-label="Abrir imagem: ${img.titulo}">
        <img src="${img.src}" alt="${img.alt}" loading="lazy">
        <div class="galeria-overlay"><span>🔍</span></div>
      </div>
    `).join('');
  }

  // ============ LIGHTBOX ============
  window.openLightbox = function (src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    img.src = src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightboxClose');
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // ============ CARROSSEL DE CONVÊNIOS ============
  function renderConvenios() {
    const track = document.getElementById('carrosselTrack');
    if (!track) return;
    // Duplica para loop infinito
    const itens = [...convenios, ...convenios];
    track.innerHTML = itens.map(c => `
      <div class="convenio-logo-card">${c}</div>
    `).join('');
  }

  // ============ VER TODAS ESPECIALIDADES ============
  function initVerTodasEspecialidades() {
    const btn = document.getElementById('btnVerTodas');
    const extras = document.getElementById('especialidadesExtras');
    if (!btn || !extras) return;
    btn.addEventListener('click', () => {
      if (extras.style.display === 'none') {
        extras.style.display = 'block';
        btn.textContent = 'Mostrar menos';
        // Re-observar elementos reveal
        extras.querySelectorAll('.reveal').forEach(el => {
          el.classList.remove('visible');
          setTimeout(() => el.classList.add('visible'), 50);
        });
      } else {
        extras.style.display = 'none';
        btn.textContent = 'Ver todas as especialidades';
      }
    });
  }

  // ============ AGENDAMENTO ============
  function initAgendamento() {
    renderAgendamentoStep(1);
  }

  function renderAgendamentoStep(step) {
    agendamentoState.step = step;
    const container = document.getElementById('agendamentoContent');
    const stepsEl = document.getElementById('agendamentoSteps');
    if (!container || !stepsEl) return;

    // Atualizar steps visuais
    stepsEl.querySelectorAll('.step').forEach(s => {
      const sNum = parseInt(s.dataset.step);
      s.classList.remove('active', 'completed');
      if (sNum < step) s.classList.add('completed');
      if (sNum === step) s.classList.add('active');
    });

    let html = '';

    switch (step) {
      case 1:
        html = renderStepEspecialidade();
        break;
      case 2:
        html = renderStepMedico();
        break;
      case 3:
        html = renderStepData();
        break;
      case 4:
        html = renderStepHorario();
        break;
      case 5:
        html = renderStepConfirmacao();
        break;
    }

    container.innerHTML = html;
    bindAgendamentoEvents(step);
  }

  function renderStepEspecialidade() {
    return `
      <p style="margin-bottom:16px;color:var(--text-secondary);">Selecione a especialidade desejada:</p>
      <div class="agendamento-opcoes">
        ${especialidades.map(e => `
          <div class="agendamento-opcao${agendamentoState.especialidade === e ? ' selected' : ''}" data-value="${e}">
            ${e}
          </div>
        `).join('')}
      </div>
      <div style="margin-top:20px;text-align:right;">
        <button class="btn btn-primary" id="btnNextStep" disabled>Próximo →</button>
      </div>
    `;
  }

  function renderStepMedico() {
    const medicosFiltrados = medicos.filter(m => m.especialidade === agendamentoState.especialidade);
    return `
      <p style="margin-bottom:16px;color:var(--text-secondary);">Especialidade: <strong>${agendamentoState.especialidade}</strong></p>
      <div class="agendamento-opcoes">
        ${medicosFiltrados.map(m => `
          <div class="agendamento-opcao${agendamentoState.medico?.id === m.id ? ' selected' : ''}" data-id="${m.id}">
            ${m.nome} — ${m.crm}
          </div>
        `).join('')}
      </div>
      <div style="margin-top:20px;display:flex;justify-content:space-between;">
        <button class="btn btn-outline" id="btnPrevStep">← Voltar</button>
        <button class="btn btn-primary" id="btnNextStep" disabled>Próximo →</button>
      </div>
    `;
  }

  function renderStepData() {
    return `
      <p style="margin-bottom:16px;color:var(--text-secondary);">Médico: <strong>${agendamentoState.medico.nome}</strong></p>
      <div class="calendario-header-simples">
        <button id="calPrev">←</button>
        <span style="font-weight:600;">${getMonthName(calendarioMesAtual)} ${calendarioAnoAtual}</span>
        <button id="calNext">→</button>
      </div>
      <div class="calendario-simples" id="calendarioGrid"></div>
      <div style="margin-top:20px;display:flex;justify-content:space-between;">
        <button class="btn btn-outline" id="btnPrevStep">← Voltar</button>
        <button class="btn btn-primary" id="btnNextStep" disabled>Próximo →</button>
      </div>
    `;
  }

  function renderStepHorario() {
    const horariosDisponiveis = gerarHorariosDisponiveis(agendamentoState.data);
    return `
      <p style="margin-bottom:16px;color:var(--text-secondary);">Data: <strong>${formatDateBR(agendamentoState.data)}</strong></p>
      <p style="margin-bottom:12px;font-weight:600;">Horários disponíveis:</p>
      <div class="horarios-grid">
        ${horariosPadrao.map(h => {
          const disponivel = horariosDisponiveis.includes(h);
          return `
            <button class="horario-btn${agendamentoState.horario === h ? ' selected' : ''}${!disponivel ? ' indisponivel' : ''}"
                    data-horario="${h}" ${!disponivel ? 'disabled' : ''}>
              ${h}
            </button>
          `;
        }).join('')}
      </div>
      <div style="margin-top:20px;display:flex;justify-content:space-between;">
        <button class="btn btn-outline" id="btnPrevStep">← Voltar</button>
        <button class="btn btn-primary" id="btnNextStep" disabled>Próximo →</button>
      </div>
    `;
  }

  function renderStepConfirmacao() {
    return `
      <div class="resumo-consulta">
        <span class="check-icon">✅</span>
        <h3>Consulta Confirmada!</h3>
        <p class="resumo-detalhe">${agendamentoState.especialidade}</p>
        <p class="resumo-detalhe">${agendamentoState.medico.nome}</p>
        <p>${formatDateBR(agendamentoState.data)} às ${agendamentoState.horario}</p>
        <p style="margin-top:12px;font-size:13px;color:var(--text-secondary);">Você receberá uma confirmação em breve.</p>
      </div>
      <div style="margin-top:20px;text-align:center;">
        <button class="btn btn-primary" id="btnNovoAgendamento">Agendar Nova Consulta</button>
      </div>
    `;
  }

  function bindAgendamentoEvents(step) {
    if (step === 1) {
      document.querySelectorAll('.agendamento-opcao').forEach(op => {
        op.addEventListener('click', () => {
          agendamentoState.especialidade = op.dataset.value;
          document.querySelectorAll('.agendamento-opcao').forEach(o => o.classList.remove('selected'));
          op.classList.add('selected');
          document.getElementById('btnNextStep').disabled = false;
        });
      });
      document.getElementById('btnNextStep')?.addEventListener('click', () => {
        if (agendamentoState.especialidade) renderAgendamentoStep(2);
      });
    }

    if (step === 2) {
      document.querySelectorAll('.agendamento-opcao').forEach(op => {
        op.addEventListener('click', () => {
          const medicoId = parseInt(op.dataset.id);
          agendamentoState.medico = medicos.find(m => m.id === medicoId);
          document.querySelectorAll('.agendamento-opcao').forEach(o => o.classList.remove('selected'));
          op.classList.add('selected');
          document.getElementById('btnNextStep').disabled = false;
        });
      });
      document.getElementById('btnPrevStep')?.addEventListener('click', () => renderAgendamentoStep(1));
      document.getElementById('btnNextStep')?.addEventListener('click', () => {
        if (agendamentoState.medico) {
          calendarioMesAtual = new Date().getMonth();
          calendarioAnoAtual = new Date().getFullYear();
          agendamentoState.data = '';
          agendamentoState.horario = '';
          renderAgendamentoStep(3);
        }
      });
    }

    if (step === 3) {
      renderCalendarioGrid();
      document.getElementById('calPrev')?.addEventListener('click', () => {
        calendarioMesAtual--;
        if (calendarioMesAtual < 0) { calendarioMesAtual = 11; calendarioAnoAtual--; }
        renderCalendarioGrid();
      });
      document.getElementById('calNext')?.addEventListener('click', () => {
        calendarioMesAtual++;
        if (calendarioMesAtual > 11) { calendarioMesAtual = 0; calendarioAnoAtual++; }
        renderCalendarioGrid();
      });
      document.getElementById('btnPrevStep')?.addEventListener('click', () => renderAgendamentoStep(2));
      document.getElementById('btnNextStep')?.addEventListener('click', () => {
        if (agendamentoState.data) renderAgendamentoStep(4);
      });
    }

    if (step === 4) {
      document.querySelectorAll('.horario-btn:not(.indisponivel)').forEach(btn => {
        btn.addEventListener('click', () => {
          agendamentoState.horario = btn.dataset.horario;
          document.querySelectorAll('.horario-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          document.getElementById('btnNextStep').disabled = false;
        });
      });
      document.getElementById('btnPrevStep')?.addEventListener('click', () => renderAgendamentoStep(3));
      document.getElementById('btnNextStep')?.addEventListener('click', () => {
        if (agendamentoState.horario) renderAgendamentoStep(5);
      });
    }

    if (step === 5) {
      document.getElementById('btnNovoAgendamento')?.addEventListener('click', resetAgendamento);
    }
  }

  function renderCalendarioGrid() {
    const grid = document.getElementById('calendarioGrid');
    if (!grid) return;
    const hoje = new Date();
    const primeiroDia = new Date(calendarioAnoAtual, calendarioMesAtual, 1);
    const ultimoDia = new Date(calendarioAnoAtual, calendarioMesAtual + 1, 0);
    const diasNoMes = ultimoDia.getDate();
    const diaInicioSemana = primeiroDia.getDay();
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    let html = diasSemana.map(d => `<div class="calendario-dia-nome">${d}</div>`).join('');

    for (let i = 0; i < diaInicioSemana; i++) {
      html += '<div class="calendario-dia outro-mes"></div>';
    }

    for (let dia = 1; dia <= diasNoMes; dia++) {
      const dataStr = `${calendarioAnoAtual}-${String(calendarioMesAtual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
      const isHoje = dia === hoje.getDate() && calendarioMesAtual === hoje.getMonth() && calendarioAnoAtual === hoje.getFullYear();
      const isSelected = agendamentoState.data === dataStr;
      const isPast = new Date(dataStr) < new Date(hoje.toDateString());
      html += `
        <div class="calendario-dia ${isHoje ? 'hoje' : ''} ${isSelected ? 'selected' : ''} ${isPast ? 'outro-mes' : ''}"
             data-data="${dataStr}" ${isPast ? '' : ''}>
          ${dia}
        </div>
      `;
    }

    grid.innerHTML = html;

    grid.querySelectorAll('.calendario-dia:not(.outro-mes)').forEach(diaEl => {
      diaEl.addEventListener('click', () => {
        const dataStr = diaEl.dataset.data;
        if (new Date(dataStr + 'T00:00:00') < new Date(new Date().toDateString())) return;
        agendamentoState.data = dataStr;
        agendamentoState.horario = '';
        grid.querySelectorAll('.calendario-dia').forEach(d => d.classList.remove('selected'));
        diaEl.classList.add('selected');
        document.getElementById('btnNextStep').disabled = false;
      });
    });
  }

  function gerarHorariosDisponiveis(dataStr) {
    // Simula alguns horários ocupados aleatoriamente
    const ocupados = new Set();
    const seed = dataStr ? dataStr.split('-').join('') : '0';
    const pseudoRandom = parseInt(seed) % horariosPadrao.length;
    for (let i = 0; i < 3; i++) {
      const idx = (pseudoRandom + i * 3) % horariosPadrao.length;
      ocupados.add(horariosPadrao[idx]);
    }
    return horariosPadrao.filter(h => !ocupados.has(h));
  }

  function resetAgendamento() {
    agendamentoState = { step: 1, especialidade: '', medico: null, data: '', horario: '' };
    calendarioMesAtual = new Date().getMonth();
    calendarioAnoAtual = new Date().getFullYear();
    renderAgendamentoStep(1);
    // Scroll suave até o agendamento
    const agendamentoSection = document.getElementById('agendamento');
    if (agendamentoSection) {
      const headerHeight = document.getElementById('header').offsetHeight;
      const pos = agendamentoSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  }

  // ============ UTILITÁRIOS ============
  function getMonthName(mes) {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return meses[mes];
  }

  function formatDateBR(dateStr) {
    if (!dateStr) return '';
    const [ano, mes, dia] = dateStr.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  // ============ INICIALIZAÇÃO ============
  function init() {
    initDarkMode();
    initHeaderScroll();
    initMenuMobile();
    initScrollReveal();
    initSmoothScroll();
    initActiveNavLink();
    initLightbox();
    initVerTodasEspecialidades();
    renderEquipe();
    renderGaleria();
    renderConvenios();
    initAgendamento();

    // Re-observar reveals após carregamento
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          const delay = el.dataset.delay || 0;
          setTimeout(() => el.classList.add('visible'), parseInt(delay));
        }
      });
    }, 300);
  }

  document.addEventListener('DOMContentLoaded', init);
})();