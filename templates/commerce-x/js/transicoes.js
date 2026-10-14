/* ============================================================
   COMMERCE X — TRANSIÇÕES (Scroll Reveal, Partículas, Fade)
   ============================================================ */

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Partículas para a página index
function initParticles() {
    const bg = document.getElementById('particlesBg');
    if (!bg) return;
    for (let i = 0; i < 30; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position:absolute; width:${Math.random()*6+2}px; height:${Math.random()*6+2}px;
            background:var(--theme-primary); border-radius:50%; opacity:${Math.random()*0.3+0.05};
            top:${Math.random()*100}%; left:${Math.random()*100}%;
            animation: floatParticle ${Math.random()*8+6}s infinite ease-in-out;
            animation-delay:${Math.random()*5}s;
        `;
        bg.appendChild(dot);
    }
}

// Transição de fade entre páginas (usada em selecao.js)
function fadeOutAndRedirect(url) {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    setTimeout(() => { window.location.href = url; }, 400);
}