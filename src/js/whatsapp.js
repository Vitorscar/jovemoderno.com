/**
 * JOVEMODERNO - Funil de Vendas via WhatsApp
 * Gera mensagens personalizadas com categoria, modelo e valor
 */

const CONFIG = {
    numero: "557599120261", // ← SUBSTITUA PELO SEU NÚMERO
    nomeEmpresa: "JoveModerno",
    vendedor: "Vitor" // ← Seu nome
};

/**
 * Abre o WhatsApp com mensagem pré-preenchida para um template específico
 * @param {string} categoria - Ex: "Nutricionista"
 * @param {string} modelo - Ex: "Premium"
 * @param {string} valor - Ex: "R$ 399"
 */
function queroEsseSite(categoria, modelo, valor) {
    const mensagem = 
`Olá ${CONFIG.vendedor}! 👋

Quero contratar este site:

📁 Categoria: ${categoria}
🎨 Modelo: ${modelo}
💰 Valor: ${valor}

Vi o modelo no catálogo da ${CONFIG.nomeEmpresa} e gostaria de receber mais informações sobre:
• Prazo de entrega
• O que está incluso
• Formas de pagamento

Aguardo seu retorno!`;

    const url = `https://wa.me/${CONFIG.numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

/**
 * Visualiza um template (redireciona para a página do modelo)
 * @param {string} categoriaSlug - Ex: "nutricionista"
 * @param {string} modeloSlug - Ex: "modelo-premium"
 */
function visualizarTemplate(categoriaSlug, modeloSlug) {
    const url = `templates/${categoriaSlug}/${modeloSlug}.html`;
    window.open(url, '_blank');
}

/**
 * Solicita orçamento personalizado
 */
function solicitarPersonalizado() {
    const mensagem = 
`Olá ${CONFIG.vendedor}! 

Não encontrei exatamente o que preciso no catálogo da ${CONFIG.nomeEmpresa}.

Gostaria de solicitar um projeto personalizado. Meu negócio é de [DESCREVA AQUI].

Poderia me enviar um orçamento?

Obrigado!`;

    const url = `https://wa.me/${CONFIG.numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

/**
 * Botão genérico de WhatsApp (para o float e navbar)
 */
function abrirWhatsAppGenerico() {
    const mensagem = `Olá! Quero saber mais sobre os sites da ${CONFIG.nomeEmpresa}.`;
    const url = `https://wa.me/${CONFIG.numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

// Exporta para uso global
window.queroEsseSite = queroEsseSite;
window.visualizarTemplate = visualizarTemplate;
window.solicitarPersonalizado = solicitarPersonalizado;
window.abrirWhatsAppGenerico = abrirWhatsAppGenerico;