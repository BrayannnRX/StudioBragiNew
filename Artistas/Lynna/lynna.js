// Smooth Scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header com fundo ao rolar
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        header.style.backgroundColor = 'rgba(15, 15, 15, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.backgroundColor = 'rgba(15, 15, 15, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar detail cards
document.querySelectorAll('.detail-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observar artist cards da seção "Outros Artistas"
document.querySelectorAll('.artist-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Efeito de hover 3D nos cards de outros artistas
document.querySelectorAll('.artist-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Adicionar efeito de ripple nos botões
const addRippleEffect = (button) => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
};

// Aplicar ripple em todos os botões
document.querySelectorAll('button, .btn-whatsapp, .btn-instagram, .btn-view-profile').forEach(button => {
    addRippleEffect(button);
});

// CSS para o efeito ripple
const style = document.createElement('style');
style.textContent = `
    button, .btn-whatsapp, .btn-instagram, .btn-view-profile {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.artist-hero-content');
    const heroBg = document.querySelector('.artist-hero-bg');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = `${1 - scrolled / 500}`;
    }
    
    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animação do contact card ao entrar na viewport
const contactCard = document.querySelector('.contact-card');
if (contactCard) {
    contactCard.style.opacity = '0';
    contactCard.style.transform = 'translateX(50px)';
    contactCard.style.transition = 'all 0.8s ease';
    
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });
    
    contactObserver.observe(contactCard);
}

// Animação dos ideal items
document.querySelectorAll('.ideal-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `all 0.5s ease ${index * 0.1}s`;
    
    const idealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });
    
    idealObserver.observe(item);
});

// ==========================================
// INTEGRAÇÃO WHATSAPP
// ==========================================

// Número de WhatsApp do Studio Bragi
const WHATSAPP_NUMBER = '5521987252542'; // Altere para o número real

// Função para abrir WhatsApp
function openWhatsApp(message = '') {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Botão WhatsApp do artista
const whatsappBtn = document.querySelector('.btn-whatsapp');
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const artistName = document.querySelector('.artist-hero-title')?.textContent || 'o artista';
        openWhatsApp(`Olá! Gostaria de mais informações sobre a contratação de ${artistName}.`);
    });
}

// Botão de contato no header
const headerContactBtn = document.querySelector('.btn-contato');
if (headerContactBtn) {
    headerContactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openWhatsApp('Olá! Gostaria de maiores informações sobre os serviços do Studio Bragi.');
    });
}

// ==========================================
// NAVEGAÇÃO + GERAÇÃO DE CARDS ALEATÓRIOS (CORRIGIDO DEFINITIVO)
// ==========================================

const artistPages = {
    'Raymel': 'Artistas/Raymel/raymel.html',
    'Lynna': 'Artistas/Lynna/lynna.html',
    'Kindão': 'Artistas/Kindao/kindao.html',
    'Fabão': 'Artistas/Fabao/fabao.html',
    'Danit': 'Artistas/Danit/danit.html',
    'Viktor Souza': 'Artistas/Viktor/viktor.html',
    'Nuylly': 'Artistas/Nuylly/nuylly.html',
};

// Função principal
function generateRandomArtistCards() {
    const container = document.querySelector('.artists-grid');
    if (!container) return;

    // Detecta qual artista está sendo exibido
    const currentPath = window.location.pathname.toLowerCase();
    const currentArtist = Object.keys(artistPages).find(name => {
        const fileName = artistPages[name].split('/').pop().replace('.html', '').toLowerCase();
        return currentPath.includes(fileName);
    });

    // Filtra os outros artistas
    const otherArtists = Object.keys(artistPages).filter(a => a !== currentArtist);
    const selected = otherArtists.sort(() => Math.random() - 0.5).slice(0, 3);

    // Corrige caminho relativo (subir 2 pastas se estiver dentro de /Artistas/Nome/)
    const depthFix = currentPath.includes('/artistas/') ? '../../' : '';

    container.innerHTML = '';

    selected.forEach(name => {
        const htmlPath = depthFix + artistPages[name];
        const imgPath = htmlPath.replace('.html', '.jpg'); // mesmo nome, extensão diferente

        const card = document.createElement('div');
        card.classList.add('artist-card');
        card.innerHTML = `
            <div class="artist-image">
                <img src="${imgPath}" alt="${name}" class="artist-thumb" onerror="this.src='${depthFix}assets/img/placeholder.jpg'">
            </div>
            <div class="artist-info">
                <h3 class="artist-name">${name}</h3>
                <p class="artist-role">Artista</p>
                <a href="${htmlPath}" class="btn-view-profile">Ver Perfil</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Executa ao carregar
document.addEventListener('DOMContentLoaded', generateRandomArtistCards);


// Executa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', generateRandomArtistCards);


// Corrigir links de navegação do header para voltar à página principal
document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes('index.html')) {
        link.setAttribute('href', '../../index.html' + (href.includes('#') ? href.substring(href.indexOf('#')) : ''));
    }
});

// Botão "Voltar" - redirecionar para a página principal
const backButton = document.querySelector('.btn-back');
if (backButton) {
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '../../index.html#artistas';
    });
}

// Corrigir logo para voltar à home
const logoLink = document.querySelector('.logo');
if (logoLink) {
    logoLink.style.cursor = 'pointer';
    logoLink.addEventListener('click', () => {
        window.location.href = '../../index.html';
    });
}

// Log de carregamento
console.log('Página do Artista - Studio Bragi carregada com sucesso! 🎵');