/**
 * App.js — Inicialização comum a todas as páginas
 * Detecta a página ativa e inicializa sidebar.
 */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    // Determinar página ativa baseado no caminho
    const path = window.location.pathname;
    let activePage = 'Dashboard';
    if (path.includes('pets')) activePage = 'Meus Pets';
    else if (path.includes('agendamentos')) activePage = 'Agendamentos';
    else if (path.includes('configuracoes')) activePage = 'Configurações';
    else if (path.includes('perfil-pet')) activePage = 'Meus Pets';

    // Renderizar sidebar
    UI.renderSidebar(activePage);

    // Atualizar saudação
    const greetingEl = document.getElementById('greeting');
    if (greetingEl) {
      const usuario = Storage.getUsuario();
      const nome = usuario.nome || 'Tutor';
      greetingEl.textContent = `Olá, ${nome}!`;
    }

    // Destacar link ativo
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
      if (link.textContent.trim().includes(activePage)) {
        link.classList.add('active');
      }
    });
  });
})();