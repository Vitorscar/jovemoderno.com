/* ============================================================
   COMMERCE X — UTILS (Storage, Carrinho, Tema, Helpers)
   ============================================================ */

// ---------- STORAGE HELPERS ----------
function getCart() {
    try { return JSON.parse(localStorage.getItem('commerceX_cart')) || []; }
    catch { return []; }
}
function saveCart(cart) { localStorage.setItem('commerceX_cart', JSON.stringify(cart)); }
function getNichoId() { return localStorage.getItem('commerceX_nicho') || 'autopecas'; }
function saveNichoId(id) { localStorage.setItem('commerceX_nicho', id); }
function getDarkMode() { return localStorage.getItem('commerceX_dark') === 'true'; }
function saveDarkMode(v) { localStorage.setItem('commerceX_dark', v); }

// ---------- CART LOGIC ----------
function addToCart(produto, qty = 1) {
    const cart = getCart();
    const existing = cart.find(item => item.id === produto.id);
    if (existing) { existing.qty += qty; }
    else { cart.push({ ...produto, qty }); }
    saveCart(cart);
    updateCartUI();
    showToast(`🛒 "${produto.nome}" adicionado ao carrinho!`);
}
function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    updateCartUI();
    if (typeof renderCarrinhoPage === 'function') renderCarrinhoPage();
}
function updateQty(id, delta) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) { return removeFromCart(id); }
    saveCart(cart);
    updateCartUI();
    if (typeof renderCarrinhoPage === 'function') renderCarrinhoPage();
}
function getCartCount() { return getCart().reduce((sum, i) => sum + i.qty, 0); }
function getCartTotal() { return getCart().reduce((sum, i) => sum + (i.desconto || i.preco) * i.qty, 0); }

function updateCartUI() {
    const count = getCartCount();
    document.querySelectorAll('.cart-badge').forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    });
    renderCartSidebarItems();
}

function renderCartSidebarItems() {
    const containers = document.querySelectorAll('.cart-items');
    const footers = document.querySelectorAll('.cart-footer');
    const cart = getCart();
    const html = cart.length === 0
        ? '<p class="cart-empty">Seu carrinho está vazio.</p>'
        : cart.map(item => `
            <div class="cart-item-mini">
                <img src="${item.imagem}" alt="${item.nome}" onerror="this.src='https://picsum.photos/seed/fallback${item.id}/100/100'">
                <div class="cart-item-mini-info">
                    <h4>${item.nome}</h4>
                    <span>R$ ${((item.desconto || item.preco) * item.qty).toFixed(2)}</span>
                    <div class="cart-item-mini-qty">
                        <button onclick="updateQty('${item.id}', -1)">−</button>
                        <span>${item.qty}</span>
                        <button onclick="updateQty('${item.id}', 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-mini-remove" onclick="removeFromCart('${item.id}')" title="Remover">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>`).join('');
    containers.forEach(c => c.innerHTML = html);
    const total = getCartTotal();
    footers.forEach(f => {
        f.style.display = cart.length > 0 ? 'block' : 'none';
        const subtotalEl = f.querySelector('#cartSubtotal');
        const totalEl = f.querySelector('#cartTotal, #cartTotalProd');
        if (subtotalEl) subtotalEl.textContent = `R$ ${total.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `R$ ${total.toFixed(2)}`;
    });
}

// ---------- TOAST ----------
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ---------- DARK MODE ----------
function applyDarkMode() {
    const dark = getDarkMode();
    document.body.classList.toggle('dark', dark);
    document.querySelectorAll('.theme-toggle i').forEach(icon => {
        icon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
    });
}
function toggleDarkMode() {
    const dark = !getDarkMode();
    saveDarkMode(dark);
    applyDarkMode();
}
document.addEventListener('click', (e) => {
    if (e.target.closest('.theme-toggle')) toggleDarkMode();
});

// ---------- FORMAT HELPERS ----------
function formatPrice(v) { return v ? `R$ ${v.toFixed(2)}` : ''; }
function formatParcelas(preco, n) { return n > 1 ? `ou ${n}x de R$ ${(preco / n).toFixed(2)}` : ''; }
function starsHtml(rating) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '⯪' : '') + '☆'.repeat(empty);
}

// ---------- WHATSAPP ----------
function gerarMensagemWhatsApp() {
    const cart = getCart();
    if (cart.length === 0) return '';
    let msg = 'Olá!\n\nTenho interesse nos seguintes produtos:\n\n';
    cart.forEach(item => {
        msg += `- ${item.nome} (${item.qty}x) — R$ ${((item.desconto || item.preco) * item.qty).toFixed(2)}\n`;
    });
    msg += `\nValor Total: R$ ${getCartTotal().toFixed(2)}\n\nGostaria de finalizar meu pedido.`;
    return encodeURIComponent(msg);
}
function abrirWhatsApp() {
    const msg = gerarMensagemWhatsApp();
    if (!msg) { showToast('Carrinho vazio!'); return; }
    window.open(`https://wa.me/5511999999999?text=${msg}`, '_blank');
}

// ---------- APPLY NICHE THEME ----------
function applyNicheTheme(nichoId) {
    const nicho = window.NICHOS?.[nichoId];
    if (!nicho) return;
    const c = nicho.cores;
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', c.primary);
    root.style.setProperty('--theme-secondary', c.secondary);
    root.style.setProperty('--theme-accent', c.accent);
    root.style.setProperty('--theme-gradient', c.heroGradient || `linear-gradient(135deg, ${c.primary} 0%, ${c.secondary} 100%)`);
    root.style.setProperty('--theme-hero-overlay', c.primary + 'cc');
    if (c.bg) root.style.setProperty('--bg-primary', c.bg);
}

// Inicializa modo escuro e carrinho ao carregar qualquer página
document.addEventListener('DOMContentLoaded', () => {
    applyDarkMode();
    updateCartUI();
});