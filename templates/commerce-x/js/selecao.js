/* ============================================================
   COMMERCE X — SELEÇÃO (index.html)
   ============================================================ */

function initIndexPage() {
    const grid = document.getElementById('nicheGrid');
    if (!grid) return;

    const nichos = Object.values(window.NICHOS || {});
    grid.innerHTML = nichos.map(n => `
        <div class="niche-card reveal" data-nicho="${n.id}" onclick="openPreview('${n.id}')">
            <span class="niche-card-icon">${n.icone}</span>
            <h3>${n.nome}</h3>
            <p>${n.descricao}</p>
            <img class="niche-card-img" src="https://picsum.photos/seed/${n.id}hero/600/280" alt="${n.nome}" loading="lazy" onerror="this.style.display='none'">
            <span class="niche-card-btn">Ver Demonstração <i class="fas fa-arrow-right"></i></span>
        </div>
    `).join('');

    initScrollReveal();
    initParticles(); // partículas do fundo

    // Revelar cards sequencialmente
    setTimeout(() => {
        document.querySelectorAll('.niche-card').forEach((card, i) => {
            setTimeout(() => card.classList.add('visible'), i * 80);
        });
    }, 300);

    // Preview Modal
    window.openPreview = function(nichoId) {
        const n = window.NICHOS[nichoId];
        document.getElementById('previewIcon').textContent = n.icone;
        document.getElementById('previewTitle').textContent = n.nome;
        document.getElementById('previewDesc').textContent = n.descricao;
        document.getElementById('previewColors').innerHTML = [n.cores.primary, n.cores.secondary, n.cores.accent]
            .map(c => `<span class="preview-color-dot" style="background:${c}"></span>`).join('');
        document.getElementById('previewBtn').onclick = () => selecionarNicho(nichoId);
        document.getElementById('previewModal').classList.add('open');
    };

    document.getElementById('previewClose').addEventListener('click', () => {
        document.getElementById('previewModal').classList.remove('open');
    });
    document.getElementById('previewModal').addEventListener('click', function(e) {
        if (e.target === this) this.classList.remove('open');
    });

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') document.getElementById('previewModal').classList.remove('open');
    });
}

// Inicializa na página correta
if (document.body.classList.contains('page-index')) {
    document.addEventListener('DOMContentLoaded', initIndexPage);
}