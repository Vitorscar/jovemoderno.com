/**
 * Dashboard.js — Renderização do Dashboard
 */
function renderDashboard() {
  const container = document.getElementById('dashboard-content');
  if (!container) return;

  const pets = Storage.getPets();
  const agendamentos = Storage.getAgendamentos();
  const proximasVacinas = Storage.getProximasVacinas(60);
  const proximosAgendamentos = Storage.getProximosAgendamentos(60);

  const totalPets = pets.length;
  const vacinasPendentes = pets.reduce((acc, pet) => acc + (pet.vacinas || []).filter(v => !v.realizada).length, 0);
  const agendamentosPendentes = agendamentos.filter(a => a.status === 'pendente').length;

  container.innerHTML = `
    <div class="dashboard-cards">
      <div class="card dash-card">
        <span class="dash-icon">🐾</span>
        <div class="dash-value">${totalPets}</div>
        <div class="dash-label">Pets cadastrados</div>
        <div class="dash-accent dash-accent-pink"></div>
      </div>
      <div class="card dash-card">
        <span class="dash-icon">💉</span>
        <div class="dash-value">${vacinasPendentes}</div>
        <div class="dash-label">Vacinas pendentes</div>
        <div class="dash-accent dash-accent-lilas"></div>
      </div>
      <div class="card dash-card">
        <span class="dash-icon">📅</span>
        <div class="dash-value">${agendamentosPendentes}</div>
        <div class="dash-label">Agendamentos pendentes</div>
        <div class="dash-accent dash-accent-rose"></div>
      </div>
      <div class="card dash-card">
        <span class="dash-icon">🏥</span>
        <div class="dash-value">${proximosAgendamentos.length}</div>
        <div class="dash-label">Próx. 60 dias</div>
        <div class="dash-accent dash-accent-pink"></div>
      </div>
    </div>

    <div class="dashboard-section">
      <h2>💉 Próximas Vacinas</h2>
      <div class="proximos-list">
        ${proximasVacinas.length === 0
          ? '<p style="color: var(--text-light);">Nenhuma vacina nos próximos 60 dias.</p>'
          : proximasVacinas.slice(0, 5).map(v => `
            <div class="proximo-item">
              <span class="proximo-icon">💉</span>
              <div class="proximo-info">
                <strong>${v.petNome} — ${v.vacina}</strong>
                <span>Vacina</span>
              </div>
              <div class="proximo-data">${UI.formatDate(v.data)}</div>
            </div>
          `).join('')
        }
      </div>
    </div>

    <div class="dashboard-section">
      <h2>📅 Próximos Agendamentos</h2>
      <div class="proximos-list">
        ${proximosAgendamentos.length === 0
          ? '<p style="color: var(--text-light);">Nenhum agendamento próximo.</p>'
          : proximosAgendamentos.slice(0, 5).map(a => `
            <div class="proximo-item">
              <span class="proximo-icon">📅</span>
              <div class="proximo-info">
                <strong>${a.petNome} — ${a.tipo}</strong>
                <span>${a.descricao || 'Sem descrição'}</span>
              </div>
              <div class="proximo-data">${UI.formatDate(a.data)} ${a.hora || ''}</div>
            </div>
          `).join('')
        }
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', renderDashboard);