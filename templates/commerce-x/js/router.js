/* ============================================================
   COMMERCE X — ROUTER (Navegação entre páginas)
   ============================================================ */

function selecionarNicho(nichoId) {
    saveNichoId(nichoId);
    applyNicheTheme(nichoId);
    fadeOutAndRedirect('nicho.html');
}

function irParaProduto(produtoId) {
    localStorage.setItem('commerceX_produto_id', produtoId);
    window.location.href = 'produto.html';
}

// Se estiver na página de produto e não houver ID salvo, redireciona
function verificarProdutoId() {
    const produtoId = localStorage.getItem('commerceX_produto_id');
    if (!produtoId && document.body.classList.contains('page-produto')) {
        window.location.href = 'nicho.html';
    }
}

// Inicializa verificação ao carregar produto
document.addEventListener('DOMContentLoaded', verificarProdutoId);