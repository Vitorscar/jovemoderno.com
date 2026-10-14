/* ============================================================
   COMMERCE X — PRODUTO (produto.html)
   ============================================================ */

function initProdutoPage() {
    const nichoId = getNichoId();
    const nicho = window.NICHOS?.[nichoId];
    const produtoId = localStorage.getItem('commerceX_produto_id');

    if (!nicho || !produtoId) { window.location.href = 'nicho.html'; return; }
    applyNicheTheme(nichoId);

    const produto = nicho.produtos.find(p => p.id === produtoId);
    if (!produto) { window.location.href = 'nicho.html'; return; }

    document.title = `Commerce X — ${produto.nome}`;

    const main = document.getElementById('produtoMain');
    const relacionados = nicho.produtos.filter(p => p.id !== produtoId).slice(0, 4);

    main.innerHTML = `
        <div class="produto-detalhe reveal">
            <div class="produto-galeria">
                <img class="produto-galeria-main" src="${produto.imagem}" alt="${produto.nome}" id="mainImage" onclick="openZoom('${produto.imagem}')" onerror="this.src='https://picsum.photos/seed/${produto.id}/600/600'">
                <div class="produto-galeria-thumbs">
                    <img class="produto-galeria-thumb active" src="${produto.imagem}" alt="Foto 1" onclick="document.getElementById('mainImage').src='${produto.imagem}'; this.parentElement.querySelectorAll('img').forEach(i=>i.classList.remove('active')); this.classList.add('active');" onerror="this.src='https://picsum.photos/seed/${produto.id}/100/100'">
                    <img class="produto-galeria-thumb" src="https://picsum.photos/seed/${produto.id}alt1/600/600" alt="Foto 2" onclick="document.getElementById('mainImage').src=this.src; this.parentElement.querySelectorAll('img').forEach(i=>i.classList.remove('active')); this.classList.add('active');" onerror="this.style.display='none'">
                    <img class="produto-galeria-thumb" src="https://picsum.photos/seed/${produto.id}alt2/600/600" alt="Foto 3" onclick="document.getElementById('mainImage').src=this.src; this.parentElement.querySelectorAll('img').forEach(i=>i.classList.remove('active')); this.classList.add('active');" onerror="this.style.display='none'">
                </div>
            </div>
            <div class="produto-info">
                <span style="color:var(--theme-primary);font-weight:600;">${produto.categoria}</span>
                <h1>${produto.nome}</h1>
                <div class="produto-info-rating">${starsHtml(produto.avaliacao)} ${produto.avaliacao} / 5</div>
                ${produto.desconto ? `<span class="produto-info-old-price">${formatPrice(produto.preco)}</span>` : ''}
                <div class="produto-info-price">${formatPrice(produto.desconto || produto.preco)}</div>
                <small style="color:var(--text-muted);">${formatParcelas(produto.desconto || produto.preco, produto.parcelas)}</small>
                <p class="produto-info-desc">${produto.descricao}</p>
                <div class="produto-info-actions">
                    <div class="qty-selector">
                        <button onclick="changeProdQty(-1)">−</button>
                        <span id="prodQty">1</span>
                        <button onclick="changeProdQty(1)">+</button>
                    </div>
                    <button class="btn-premium" onclick="addProdutoAoCarrinho()">
                        <i class="fas fa-shopping-bag"></i> Adicionar ao Carrinho
                    </button>
                    <button class="btn-whatsapp" onclick="comprarAgoraWhatsApp()">
                        <i class="fab fa-whatsapp"></i> Comprar Agora
                    </button>
                </div>
            </div>
        </div>
        <section class="relacionados-section reveal">
            <h2>Produtos Relacionados</h2>
            <div class="relacionados-grid">
                ${relacionados.map(p => `
                    <div class="produto-card" onclick="window.location.href='produto.html'; localStorage.setItem('commerceX_produto_id','${p.id}');">
                        <img class="produto-card-img" src="${p.imagem}" alt="${p.nome}" loading="lazy" onerror="this.src='https://picsum.photos/seed/${p.id}/400/400'">
                        <div class="produto-card-body">
                            <span class="produto-card-cat">${p.categoria}</span>
                            <h3>${p.nome}</h3>
                            <span class="produto-card-price">${formatPrice(p.desconto || p.preco)}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;

    // Controle de quantidade
    window.prodQty = 1;
    window.changeProdQty = function(delta) {
        window.prodQty = Math.max(1, window.prodQty + delta);
        document.getElementById('prodQty').textContent = window.prodQty;
    };
    window.addProdutoAoCarrinho = function() {
        addToCart(produto, window.prodQty);
    };
    window.comprarAgoraWhatsApp = function() {
        addToCart(produto, window.prodQty);
        setTimeout(abrirWhatsApp, 300);
    };
    window.openZoom = function(src) {
        const overlay = document.createElement('div');
        overlay.className = 'zoom-modal';
        overlay.innerHTML = `<button class="zoom-close-btn">&times;</button><img src="${src}" alt="Zoom">`;
        document.body.appendChild(overlay);
        overlay.addEventListener('click', () => overlay.remove());
    };

    initScrollReveal();
    initCartSidebar(); // função definida em nicho.js (global)
    updateCartUI();
    setTimeout(() => document.querySelector('.produto-detalhe')?.classList.add('visible'), 200);
}

// Inicializa na página correta
if (document.body.classList.contains('page-produto')) {
    document.addEventListener('DOMContentLoaded', initProdutoPage);
}