/**
 * UI.js — Componentes de interface reutilizáveis
 * Sidebar, Toast, Modal, Loading, Empty State
 */
const UI = {
  // --- SIDEBAR ---
  renderSidebar(activePage) {
    const container = document.getElementById('sidebar-container');
    if (!container) return;
    const pages = [
      { name: 'Dashboard', icon: '📊', href: 'dashboard.html' },
      { name: 'Meus Pets', icon: '🐾', href: 'pets.html' },
      { name: 'Agendamentos', icon: '📅', href: 'agendamentos.html' },
      { name: 'Configurações', icon: '⚙️', href: 'configuracoes.html' }
    ];
    container.innerHTML = `
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-logo"><span>🐾</span> Kobu</div>
        <nav class="sidebar-nav">
          ${pages.map(p => `
            <a href="${p.href}" class="${activePage === p.name ? 'active' : ''}">
              <span class="nav-icon">${p.icon}</span> ${p.name}
            </a>
          `).join('')}
        </nav>
        <div class="sidebar-footer">v1.0 MVP — Seus dados seguros</div>
      </aside>
    `;

    // Configurar toggle da sidebar
    setTimeout(() => this._setupSidebarToggle(), 100);
  },

  _setupSidebarToggle() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    if (!toggleBtn || !sidebar) return;

    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    // Fechar sidebar ao clicar fora (mobile)
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 &&
          sidebar.classList.contains('open') &&
          !sidebar.contains(e.target) &&
          e.target !== toggleBtn) {
        sidebar.classList.remove('open');
      }
    });
  },

  // --- TOAST ---
  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icons = { success: '✅', error: '❌', warning: '⚠️' };
    toast.innerHTML = `${icons[type] || ''} ${message}`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  // --- MODAL ---
  showModal(title, contentHTML, onSave) {
    const container = document.getElementById('modal-container');
    if (!container) return;
    container.innerHTML = `
      <div class="modal-overlay" id="modal-overlay">
        <div class="modal">
          <h2>${title}</h2>
          <div class="modal-body">${contentHTML}</div>
          <div class="modal-actions">
            <button class="btn-secondary" id="modal-cancel">Cancelar</button>
            <button class="btn-primary" id="modal-save">Salvar</button>
          </div>
        </div>
      </div>
    `;
    document.getElementById('modal-cancel').addEventListener('click', () => this.closeModal());
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
      if (e.target.id === 'modal-overlay') this.closeModal();
    });
    document.getElementById('modal-save').addEventListener('click', () => {
      if (onSave) onSave();
      this.closeModal();
    });
  },

  closeModal() {
    const container = document.getElementById('modal-container');
    if (container) container.innerHTML = '';
  },

  // --- CONFIRMAÇÃO ---
  showConfirm(message, onConfirm) {
    const container = document.getElementById('modal-container');
    if (!container) return;
    container.innerHTML = `
      <div class="modal-overlay" id="modal-overlay">
        <div class="modal" style="max-width: 400px; text-align: center;">
          <h2>Confirmação</h2>
          <p>${message}</p>
          <div class="modal-actions" style="justify-content: center;">
            <button class="btn-secondary" id="modal-cancel">Cancelar</button>
            <button class="btn-danger" id="modal-confirm">Confirmar</button>
          </div>
        </div>
      </div>
    `;
    document.getElementById('modal-cancel').addEventListener('click', () => this.closeModal());
    document.getElementById('modal-confirm').addEventListener('click', () => {
      this.closeModal();
      if (onConfirm) onConfirm();
    });
  },

  // --- EMPTY STATE ---
  renderEmptyState(icon, title, message, actionHTML = '') {
    return `
      <div class="empty-state">
        <span class="empty-icon">${icon}</span>
        <h3>${title}</h3>
        <p>${message}</p>
        ${actionHTML}
      </div>
    `;
  },

  // --- FORMATAÇÃO DE DATA ---
  formatDate(dateStr) {
    if (!dateStr) return '';
    const [ano, mes, dia] = dateStr.split('-');
    return `${dia}/${mes}/${ano}`;
  },

  formatDateLong(dateStr) {
    if (!dateStr) return '';
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const [ano, mes, dia] = dateStr.split('-');
    return `${parseInt(dia)} de ${meses[parseInt(mes) - 1]} de ${ano}`;
  },

  getMonthName(mes) {
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return meses[mes];
  }
};