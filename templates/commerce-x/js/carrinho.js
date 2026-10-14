/* ============================================================
   COMMERCE X — CARRINHO (carrinho.html)
   ============================================================ */

function initCarrinhoPage() {
    const nichoId = getNichoId();
    if (nichoId && window.NICHOS?.[nichoId]) applyNicheTheme(nichoId);

    window.renderCarrinhoPage = function() {
        const cart = getCart();
        const empty = document.getElementById('carrinhoEmpty');
        const grid = document.getElementById('carrinhoGrid');
        const itensContainer = document.getElementById('carrinhoItens');

        if (cart.length === 0) {
            if (empty) empty.style.display = 'block';
            if (grid) grid.style.display = 'none';
        } else {
            if (empty) empty.style.display = 'none';
            if (grid) grid.style.display = 'grid';
            if (itensContainer) {
                itensContainer.innerHTML = cart.map(item => `
                    <div class="carrinho-item reveal">
                        <img src="${item.imagem}" alt="${item.nome}" onerror="this.src='https://picsum.photos/seed/${item.id}/150/150'">
                        <div class="carrinho-item-info">
                            <h3>${item.nome}</h3>
                            <span class="carrinho-item-price">${formatPrice((item.desconto || item.preco) * item.qty)}</span>
                            <div class="carrinho-item-qty">
                                <button onclick="updateQty('${item.id}', -1)">−</button>
                                <span>${item.qty}</span>
                                <button onclick="updateQty('${item.id}', 1)">+</button>
                            </div>
                        </div>
                        <button class="carrinho-item-remove" onclick="removeFromCart('${item.id}')" title="Remover">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                `).join('');
            }
            // Atualiza resumo
            const subtotal = getCartTotal();
            const resSubtotal = document.getElementById('resSubtotal');
            const resTotal = document.getElementById('resTotal');
            if (resSubtotal) resSubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
            if (resTotal) resTotal.textContent = `R$ ${subtotal.toFixed(2)}`;
        }
        initScrollReveal();
    };

    window.renderCarrinhoPage();
    updateCartUI();

    // Frete simulado
    const calcFreteBtn = document.getElementById('calcFrete');
    const cepInput = document.getElementById('cepInput');
    const freteResult = document.getElementById('freteResult');
    const resFrete = document.getElementById('resFrete');

    if (calcFreteBtn) {
        calcFreteBtn.addEventListener('click', () => {
            const cep = cepInput?.value?.replace(/\D/g, '');
            if (!cep || cep.length < 8) {
                if (freteResult) freteResult.textContent = 'Digite um CEP válido';
                return;
            }
            const valorFrete = Math.random() > 0.5 ? 0 : (Math.random() * 25 + 5);
            const freteTexto = valorFrete === 0 ? 'Grátis 🎉' : `R$ ${valorFrete.toFixed(2)}`;
            if (freteResult) freteResult.textContent = `Frete: ${freteTexto}`;
            if (resFrete) resFrete.textContent = freteTexto;
            const resTotal = document.getElementById('resTotal');
            if (resTotal) resTotal.textContent = `R$ ${(getCartTotal() + valorFrete).toFixed(2)}`;
        });
    }
    if (cepInput) {
        cepInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            if (val.length > 5) val = val.slice(0, 5) + '-' + val.slice(5, 8);
            e.target.value = val.slice(0, 9);
        });
    }

    // Finalizar WhatsApp
    document.getElementById('btnFinalizarWhatsapp')?.addEventListener('click', abrirWhatsApp);

    initScrollReveal();
    setTimeout(() => {
        document.querySelectorAll('.carrinho-item').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 80);
        });
    }, 300);
}

// Inicializa na página correta
if (document.body.classList.contains('page-carrinho')) {
    document.addEventListener('DOMContentLoaded', initCarrinhoPage);
}