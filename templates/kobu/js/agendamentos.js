/**
 * Agendamentos.js — Gestão de agendamentos e calendário simples
 */

let calendarioMesAtual = new Date().getMonth();
let calendarioAnoAtual = new Date().getFullYear();

function renderizarCalendario() {
  const container = document.getElementById('calendario-container');
  if (!container) return;

  const hoje = new Date();
  const primeiroDia = new Date(calendarioAnoAtual, calendarioMesAtual, 1);
  const ultimoDia = new Date(calendarioAnoAtual, calendarioMesAtual + 1, 0);
  const diasNoMes = ultimoDia.getDate();
  const diaInicioSemana = primeiroDia.getDay();

  const agendamentos = Storage.getAgendamentos();
  const diasComAgendamento = new Set(agendamentos.map(a => a.data));

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  let html = `
    <div class="calendario-header">
      <button class="btn-secondary btn-sm" id="cal-prev">←</button>
      <h3>${UI.getMonthName(calendarioMesAtual)} ${calendarioAnoAtual}</h3>
      <button class="btn-secondary btn-sm" id="cal-next">→</button>
    </div>
    <div class="calendario-dias">
      ${diasSemana.map(d => `<div class="calendario-dia-nome">${d}</div>`).join('')}
  `;

  // Dias vazios antes do primeiro dia
  for (let i = 0; i < diaInicioSemana; i++) {
    html += `<div class="calendario-dia outro-mes"></div>`;
  }

  for (let dia = 1; dia <= diasNoMes; dia++) {
    const dataStr = `${calendarioAnoAtual}-${String(calendarioMesAtual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    const isHoje = dia === hoje.getDate() && calendarioMesAtual === hoje.getMonth() && calendarioAnoAtual === hoje.getFullYear();
    const temAgendamento = diasComAgendamento.has(dataStr);
    html += `
      <div class="calendario-dia ${isHoje ? 'hoje' : ''} ${temAgendamento ? 'tem-agendamento' : ''}"
           onclick="filtrarPorData('${dataStr}')" title="${temAgendamento ? 'Agendamentos neste dia' : ''}">
        ${dia}
      </div>
    `;
  }

  html += `</div>`;
  container.innerHTML = html;

  document.getElementById('cal-prev').addEventListener('click', () => {
    calendarioMesAtual--;
    if (calendarioMesAtual < 0) { calendarioMesAtual = 11; calendarioAnoAtual--; }
    renderizarCalendario();
  });
  document.getElementById('cal-next').addEventListener('click', () => {
    calendarioMesAtual++;
    if (calendarioMesAtual > 11) { calendarioMesAtual = 0; calendarioAnoAtual++; }
    renderizarCalendario();
  });
}

let filtroDataAtual = '';

function filtrarPorData(dataStr) {
  filtroDataAtual = dataStr;
  renderizarListaAgendamentos(dataStr);
}

function renderizarListaAgendamentos(filtroData = '') {
  const container = document.getElementById('agendamentos-lista');
  if (!container) return;

  let agendamentos = Storage.getAgendamentos();
  if (filtroData) {
    agendamentos = agendamentos.filter(a => a.data === filtroData);
  }
  agendamentos.sort((a, b) => new Date(a.data) - new Date(b.data) || (a.hora || '').localeCompare(b.hora || ''));

  if (agendamentos.length === 0) {
    container.innerHTML = UI.renderEmptyState(
      '📅',
      filtroData ? 'Nenhum agendamento nesta data' : 'Nenhum agendamento',
      'Crie seu primeiro agendamento!',
      '<button class="btn-primary" id="btn-add-empty-ag">+ Novo Agendamento</button>'
    );
    document.getElementById('btn-add-empty-ag')?.addEventListener('click', abrirModalAgendamento);
    return;
  }

  container.innerHTML = agendamentos.map(a => `
    <div class="card agendamento-item">
      <div class="agendamento-data">
        <div class="dia">${a.data ? a.data.split('-')[2] : '?'}</div>
        <div class="mes">${UI.getMonthName(parseInt(a.data?.split('-')[1] || 1) - 1)}</div>
      </div>
      <div class="agendamento-info">
        <h4>${a.petNome} — ${a.tipo}</h4>
        <p>${a.descricao || ''} ${a.hora ? 'às ' + a.hora : ''}</p>
      </div>
      <span class="status-badge status-${a.status}">${a.status}</span>
      <button class="btn-secondary btn-sm" onclick="abrirModalAgendamento('${a.id}')">✏️</button>
      <button class="btn-danger btn-sm" onclick="excluirAgendamento('${a.id}')">🗑</button>
    </div>
  `).join('');
}

function abrirModalAgendamento(id = null) {
  const ag = id ? Storage.getAgendamentos().find(a => a.id === id) : null;
  const pets = Storage.getPets();
  const titulo = ag ? 'Editar Agendamento' : 'Novo Agendamento';

  const contentHTML = `
    <div class="form-group">
      <label for="ag-pet">Pet *</label>
      <select id="ag-pet" class="input-select">
        <option value="">Selecione um pet</option>
        ${pets.map(p => `<option value="${p.id}" ${ag?.petId === p.id ? 'selected' : ''}>${p.nome}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label for="ag-tipo">Tipo *</label>
      <select id="ag-tipo" class="input-select">
        ${['Consulta', 'Vacina', 'Banho', 'Tosa', 'Exame', 'Cirurgia', 'Outro'].map(t =>
          `<option value="${t}" ${ag?.tipo === t ? 'selected' : ''}>${t}</option>`
        ).join('')}
      </select>
    </div>
    <div class="form-group">
      <label for="ag-data">Data *</label>
      <input type="date" id="ag-data" class="input-text" value="${ag?.data || ''}">
    </div>
    <div class="form-group">
      <label for="ag-hora">Hora</label>
      <input type="time" id="ag-hora" class="input-text" value="${ag?.hora || ''}">
    </div>
    <div class="form-group">
      <label for="ag-desc">Descrição</label>
      <input type="text" id="ag-desc" class="input-text" value="${ag?.descricao || ''}" placeholder="Detalhes do agendamento">
    </div>
    <div class="form-group">
      <label for="ag-status">Status</label>
      <select id="ag-status" class="input-select">
        ${['pendente', 'concluido', 'cancelado'].map(s =>
          `<option value="${s}" ${ag?.status === s ? 'selected' : ''}>${s}</option>`
        ).join('')}
      </select>
    </div>
  `;

  UI.showModal(titulo, contentHTML, () => {
    const petId = document.getElementById('ag-pet').value;
    if (!petId) { UI.showToast('Selecione um pet.', 'error'); return; }
    const data = document.getElementById('ag-data').value;
    if (!data) { UI.showToast('Informe a data.', 'error'); return; }
    const pet = Storage.getPetById(petId);
    const dados = {
      petId,
      petNome: pet?.nome || 'Pet',
      tipo: document.getElementById('ag-tipo').value,
      data,
      hora: document.getElementById('ag-hora').value,
      descricao: document.getElementById('ag-desc').value,
      status: document.getElementById('ag-status').value
    };

    if (ag) {
      Storage.updateAgendamento(ag.id, dados);
      UI.showToast('Agendamento atualizado!', 'success');
    } else {
      Storage.addAgendamento(dados);
      UI.showToast('Agendamento criado!', 'success');
    }
    renderizarCalendario();
    renderizarListaAgendamentos(filtroDataAtual);
  });
}

function excluirAgendamento(id) {
  UI.showConfirm('Deseja excluir este agendamento?', () => {
    Storage.deleteAgendamento(id);
    UI.showToast('Agendamento excluído.', 'warning');
    renderizarCalendario();
    renderizarListaAgendamentos(filtroDataAtual);
  });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('calendario-container')) {
    renderizarCalendario();
    renderizarListaAgendamentos();
    document.getElementById('btn-add-agendamento')?.addEventListener('click', () => abrirModalAgendamento());
  }
});