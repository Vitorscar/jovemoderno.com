/* ============================================================
   COMMERCE X — NICHO (nicho.html)
   ============================================================ */

function initNichoPage() {
    const nichoId = getNichoId();
    const nicho = window.NICHOS?.[nichoId];
    if (!nicho) { window.location.href = 'index.html'; return; }

    applyNicheTheme(nichoId);
    document.title = `Commerce X — ${nicho.nome}`;

    // Hero
    document.getElementById('heroBadge').textContent = nicho.icone + ' ' + nicho.nome;
    document.getElementById('heroHeading').textContent = nicho.hero.titulo;
    document.getElementById('heroDesc').textContent = nicho.hero.subtitulo;
    document.getElementById('heroNicho').style.background = nicho.cores.heroGradient;

    // Categorias
    const catGrid = document.getElementById('categoriasGrid');
    catGrid.innerHTML = nicho.categorias.map(c => `
        <span class="categoria-tag" data-cat="${c.nome}" onclick="filterByCategory('${c.nome}', this)">
            ${c.icone} ${c.nome}
        </span>
    `).join('');

    // Filtros
    const filterTags = document.getElementById('filterTags');
    const allCats = ['Todos', ...nicho.categorias.map(c => c.nome)];
    filterTags.innerHTML = allCats.map((cat, i) => `
        <span class="filter-tag ${i === 0 ? 'active' : ''}" data-cat="${cat}" onclick="filterProdutos('${cat}', this)">
            ${cat}
        </span>
    `).join('');

    // Produtos
    window.currentFilter = 'Todos';
    window.renderProdutos = function(filter = 'Todos', searchTerm = '') {
        const grid = document.getElementById('produtosGrid');
        let produtos = nicho.produtos;
        if (filter !== 'Todos') produtos = produtos.filter(p => p.categoria === filter);
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            produtos = produtos.filter(p => p.nome.toLowerCase().includes(term) || p.categoria.toLowerCase().includes(term));
        }
        const noResults = document.getElementById('noResults');
        const searchTermDisplay = document.getElementById('searchTermDisplay');

        if (produtos.length === 0) {
            grid.innerHTML = '';
            noResults.style.display = 'block';
            if (searchTermDisplay) searchTermDisplay.textContent = searchTerm;
        } else {
            noResults.style.display = 'none';
            grid.innerHTML = produtos.map(p => `
                <div class="produto-card reveal" onclick="irParaProduto('${p.id}')">
                    <img class="produto-card-img" src="${p.imagem}" alt="${p.nome}" loading="lazy" onerror="this.src='https://picsum.photos/seed/${p.id}/400/400'">
                    <div class="produto-card-body">
                        <span class="produto-card-cat">${p.categoria}</span>
                        <h3>${p.nome}</h3>
                        <div class="produto-card-rating">${starsHtml(p.avaliacao)} ${p.avaliacao}</div>
                        ${p.desconto ? `<span class="produto-card-old-price">${formatPrice(p.preco)}</span> ` : ''}
                        <span class="produto-card-price">${formatPrice(p.desconto || p.preco)}</span>
                        <small style="color:var(--text-muted);display:block;">${formatParcelas(p.desconto || p.preco, p.parcelas)}</small>
                    </div>
                    <div class="produto-card-actions" onclick="event.stopPropagation()">
                        <button class="btn-premium" onclick="addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')}, 1); event.stopPropagation();">
                            <i class="fas fa-shopping-bag"></i> Adicionar
                        </button>
                        <button class="btn-icon" onclick="irParaProduto('${p.id}'); event.stopPropagation();" title="Ver detalhes">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            `).join('');
            setTimeout(initScrollReveal, 100);
        }
    };

    window.filterProdutos = function(cat, el) {
        document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
        el.classList.add('active');
        window.currentFilter = cat;
        const searchVal = document.getElementById('searchInput')?.value || '';
        window.renderProdutos(cat, searchVal);
    };

    window.filterByCategory = function(cat, el) {
        document.querySelectorAll('.categoria-tag').forEach(t => t.classList.remove('active'));
        el.classList.add('active');
        document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
        const match = document.querySelector(`.filter-tag[data-cat="${cat}"]`);
        if (match) match.classList.add('active');
        window.currentFilter = cat;
        window.renderProdutos(cat, document.getElementById('searchInput')?.value || '');
    };

    window.renderProdutos('Todos');

    // Busca
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const val = searchInput.value;
            searchClear.style.display = val ? 'flex' : 'none';
            window.renderProdutos(window.currentFilter, val);
        });
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchClear.style.display = 'none';
            window.renderProdutos(window.currentFilter, '');
        });
    }

    // Banner secundário
    document.getElementById('bannerSecTitulo').textContent = nicho.bannerSec.titulo;
    document.getElementById('bannerSecDesc').textContent = nicho.bannerSec.desc;

    initScrollReveal();
    initCartSidebar();
    updateCartUI();

    // WhatsApp no carrinho
    document.getElementById('cartWhatsapp')?.addEventListener('click', abrirWhatsApp);
}

// Inicialização do carrinho lateral (compartilhada)
function initCartSidebar() {
    const triggers = document.querySelectorAll('.cart-trigger');
    const sidebar = document.getElementById('cartSidebar') || document.getElementById('cartSidebarProd');
    const overlay = document.getElementById('cartOverlay') || document.getElementById('cartOverlayProd');
    const closeBtn = document.getElementById('closeCart') || document.getElementById('closeCartProd');

    function openCart() {
        if (sidebar) sidebar.classList.add('open');
        if (overlay) overlay.classList.add('open');
        renderCartSidebarItems();
    }
    function closeCart() {
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
    }

    triggers.forEach(t => t.addEventListener('click', openCart));
    if (closeBtn) closeBtn.addEventListener('click', closeCart);
    if (overlay) overlay.addEventListener('click', closeCart);
}

// Inicializa na página correta
if (document.body.classList.contains('page-nicho')) {
    document.addEventListener('DOMContentLoaded', initNichoPage);
}