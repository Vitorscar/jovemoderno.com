/**
 * Pets.js — Gestão de pets (CRUD, busca, filtro, perfil)
 */

// --- LISTAGEM DE PETS ---
function renderizarListaPets() {
  const grid = document.getElementById('pets-grid');
  if (!grid) return;

  const searchTerm = document.getElementById('search-pets')?.value?.toLowerCase() || '';
  const filterSpecies = document.getElementById('filter-species')?.value || '';

  let pets = Storage.getPets();
  if (searchTerm) {
    pets = pets.filter(p => p.nome.toLowerCase().includes(searchTerm) || p.raca.toLowerCase().includes(searchTerm));
  }
  if (filterSpecies) {
    pets = pets.filter(p => p.especie === filterSpecies);
  }

  if (pets.length === 0) {
    grid.innerHTML = UI.renderEmptyState(
      '🐾',
      'Nenhum pet encontrado',
      searchTerm || filterSpecies ? 'Tente ajustar os filtros.' : 'Cadastre seu primeiro pet!',
      '<button class="btn-primary" id="btn-add-empty">+ Adicionar Pet</button>'
    );
    document.getElementById('btn-add-empty')?.addEventListener('click', abrirModalPet);
    return;
  }

  grid.innerHTML = pets.map(pet => `
    <div class="card pet-card" onclick="window.location.href='perfil-pet.html?id=${pet.id}'">
      <div class="pet-card-image">
        ${pet.foto ? `<img src="${pet.foto}" alt="${pet.nome}" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` : '🐾'}
      </div>
      <div class="pet-card-info">
        <h3>${pet.nome}</h3>
        <p>${pet.especie} • ${pet.raca || 'Sem raça'}</p>
        <p>${pet.idade} • ${pet.peso || 'Peso não informado'}</p>
      </div>
      <div class="pet-card-actions" onclick="event.stopPropagation();">
        <button class="btn-secondary btn-sm" onclick="abrirModalPet('${pet.id}')">✏️ Editar</button>
        <button class="btn-danger btn-sm" onclick="excluirPet('${pet.id}')">🗑 Excluir</button>
      </div>
    </div>
  `).join('');
}

// --- MODAL DE PET ---
function abrirModalPet(id = null) {
  const pet = id ? Storage.getPetById(id) : null;
  const titulo = pet ? 'Editar Pet' : 'Novo Pet';

  const contentHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div class="foto-upload-area" id="foto-upload" style="margin: 0 auto;">
        ${pet?.foto ? `<img src="${pet.foto}" alt="Foto">` : '📷'}
        <input type="file" id="input-foto" accept="image/*">
      </div>
      <small style="color: var(--text-light);">Clique para adicionar foto</small>
    </div>
    <div class="form-group">
      <label for="pet-nome">Nome *</label>
      <input type="text" id="pet-nome" class="input-text" value="${pet?.nome || ''}" placeholder="Nome do pet" required>
    </div>
    <div class="form-group">
      <label for="pet-especie">Espécie *</label>
      <select id="pet-especie" class="input-select">
        ${['Cão', 'Gato', 'Ave', 'Peixe', 'Roedor', 'Réptil', 'Outro'].map(e =>
          `<option value="${e}" ${pet?.especie === e ? 'selected' : ''}>${e}</option>`
        ).join('')}
      </select>
    </div>
    <div class="form-group">
      <label for="pet-raca">Raça</label>
      <input type="text" id="pet-raca" class="input-text" value="${pet?.raca || ''}" placeholder="Raça">
    </div>
    <div class="form-group">
      <label for="pet-idade">Idade</label>
      <input type="text" id="pet-idade" class="input-text" value="${pet?.idade || ''}" placeholder="Ex: 3 anos, 6 meses">
    </div>
    <div class="form-group">
      <label for="pet-peso">Peso</label>
      <input type="text" id="pet-peso" class="input-text" value="${pet?.peso || ''}" placeholder="Ex: 12 kg">
    </div>
    <div class="form-group">
      <label for="pet-obs">Observações</label>
      <textarea id="pet-obs" class="input-text" rows="3" placeholder="Observações sobre o pet">${pet?.observacoes || ''}</textarea>
    </div>
  `;

  let fotoBase64 = pet?.foto || '';

  UI.showModal(titulo, contentHTML, () => {
    const nome = document.getElementById('pet-nome').value.trim();
    if (!nome) {
      UI.showToast('Nome do pet é obrigatório.', 'error');
      return;
    }
    const dados = {
      nome,
      especie: document.getElementById('pet-especie').value,
      raca: document.getElementById('pet-raca').value,
      idade: document.getElementById('pet-idade').value,
      peso: document.getElementById('pet-peso').value,
      observacoes: document.getElementById('pet-obs').value,
      foto: fotoBase64
    };

    if (pet) {
      Storage.updatePet(pet.id, dados);
      UI.showToast('Pet atualizado!', 'success');
    } else {
      Storage.addPet(dados);
      UI.showToast('Pet cadastrado com sucesso! 🎉', 'success');
    }
    renderizarListaPets();
  });

  // Configurar upload de foto após renderização do modal
  setTimeout(() => {
    const inputFoto = document.getElementById('input-foto');
    const fotoUpload = document.getElementById('foto-upload');
    if (inputFoto && fotoUpload) {
      inputFoto.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.size < 2 * 1024 * 1024) { // limite 2MB
          const reader = new FileReader();
          reader.onload = (ev) => {
            fotoBase64 = ev.target.result;
            fotoUpload.innerHTML = `<img src="${fotoBase64}" alt="Foto">`;
          };
          reader.readAsDataURL(file);
        } else if (file) {
          UI.showToast('Imagem muito grande. Use até 2MB.', 'warning');
        }
      });
    }
  }, 100);
}

// --- EXCLUIR PET ---
function excluirPet(id) {
  const pet = Storage.getPetById(id);
  UI.showConfirm(`Deseja excluir "${pet?.nome || 'este pet'}"? Todos os dados e agendamentos serão removidos.`, () => {
    Storage.deletePet(id);
    UI.showToast('Pet excluído.', 'warning');
    renderizarListaPets();
  });
}

// --- PERFIL DO PET ---
function renderizarPerfilPet(id) {
  const container = document.getElementById('perfil-content');
  if (!container) return;
  const pet = Storage.getPetById(id);
  if (!pet) {
    container.innerHTML = UI.renderEmptyState('🔍', 'Pet não encontrado', '', '<a href="pets.html" class="btn-secondary">Voltar</a>');
    return;
  }

  const agendamentosPet = Storage.getAgendamentos().filter(a => a.petId === id);

  container.innerHTML = `
    <div class="card">
      <div class="perfil-header">
        <div class="perfil-foto">
          ${pet.foto ? `<img src="${pet.foto}" alt="${pet.nome}" style="width:100%;height:100%;object-fit:cover;border-radius:24px;">` : '🐾'}
        </div>
        <div class="perfil-dados">
          <h2>${pet.nome}</h2>
          <div class="info-row">
            <span class="info-item"><strong>Espécie:</strong> ${pet.especie}</span>
            <span class="info-item"><strong>Raça:</strong> ${pet.raca || '—'}</span>
            <span class="info-item"><strong>Idade:</strong> ${pet.idade || '—'}</span>
            <span class="info-item"><strong>Peso:</strong> ${pet.peso || '—'}</span>
          </div>
          ${pet.observacoes ? `<p style="margin-top:12px;"><strong>Observações:</strong> ${pet.observacoes}</p>` : ''}
          <div style="margin-top:16px;">
            <button class="btn-primary btn-sm" onclick="window.location.href='pets.html'; abrirModalPet('${pet.id}');">✏️ Editar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="historico-section card" style="margin-top: 20px;">
      <h3>💉 Histórico de Vacinas</h3>
      ${(pet.vacinas || []).length === 0
        ? '<p style="color: var(--text-light);">Nenhuma vacina registrada.</p>'
        : `<div class="historico-lista">
            ${pet.vacinas.map(v => `
              <div class="historico-item">
                <strong>${v.nome}</strong> — ${UI.formatDate(v.data)}
                ${v.realizada ? '✅' : '⏳ Pendente'}
              </div>
            `).join('')}
          </div>`
      }
    </div>

    <div class="historico-section card" style="margin-top: 20px;">
      <h3>🏥 Histórico de Consultas</h3>
      ${(pet.consultas || []).length === 0
        ? '<p style="color: var(--text-light);">Nenhuma consulta registrada.</p>'
        : `<div class="historico-lista">
            ${pet.consultas.map(c => `
              <div class="historico-item">
                <strong>${c.motivo}</strong> — ${UI.formatDate(c.data)} — Dr(a). ${c.veterinario || '—'}
              </div>
            `).join('')}
          </div>`
      }
    </div>

    <div class="historico-section card" style="margin-top: 20px;">
      <h3>📅 Agendamentos</h3>
      ${agendamentosPet.length === 0
        ? '<p style="color: var(--text-light);">Nenhum agendamento.</p>'
        : `<div class="historico-lista">
            ${agendamentosPet.map(a => `
              <div class="historico-item">
                <strong>${a.tipo}</strong> — ${UI.formatDate(a.data)} ${a.hora || ''}
                <span class="status-badge status-${a.status}">${a.status}</span>
                <p>${a.descricao || ''}</p>
              </div>
            `).join('')}
          </div>`
      }
    </div>
  `;
}

// --- INICIALIZAÇÃO DA PÁGINA DE PETS ---
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('pets-grid')) {
    renderizarListaPets();
    document.getElementById('btn-add-pet')?.addEventListener('click', () => abrirModalPet());
    document.getElementById('search-pets')?.addEventListener('input', renderizarListaPets);
    document.getElementById('filter-species')?.addEventListener('change', renderizarListaPets);
  }
});