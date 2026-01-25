// Smooth Scroll para links de navegação do header
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
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.backgroundColor = 'rgba(15, 15, 15, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.backgroundColor = 'rgba(15, 15, 15, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Animação de entrada dos elementos ao rolar
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

// Observar cards de serviços
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observar cards de artistas
document.querySelectorAll('.artist-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observar cards de produções
document.querySelectorAll('.production-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Animação dos números das estatísticas
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const isPlus = target.includes('+');
        const number = parseInt(target.replace('+', ''));
        const duration = 2000;
        const increment = number / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < number) {
                stat.textContent = Math.floor(current) + (isPlus ? '+' : '');
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target;
            }
        };
        
        // Observar quando a seção de stats entra na tela
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(stat);
    });
};

animateStats();

// Efeito parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = `${1 - scrolled / 700}`;
    }
});

// Carrossel automático com slide lateral
let currentImageIndex = 0;
const images = document.querySelectorAll('.carousel-image');
const totalImages = images.length;

function changeImage() {
    // Adiciona classe 'previous' na imagem atual (ela sai para a esquerda)
    images[currentImageIndex].classList.add('previous');
    images[currentImageIndex].classList.remove('active');
    
    // Avança para a próxima imagem
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    
    // Adiciona classe 'active' na nova imagem (ela entra da direita)
    images[currentImageIndex].classList.add('active');
    images[currentImageIndex].classList.remove('previous');
    
    // Remove a classe 'previous' das outras imagens após a transição
    setTimeout(() => {
        images.forEach((img, index) => {
            if (index !== currentImageIndex) {
                img.classList.remove('previous');
            }
        });
    }, 800);
}

// Botão "Conheça os Artistas" que rola até a seção
const knowArtistsBtn = document.querySelector('.btn-secondary');
if (knowArtistsBtn && knowArtistsBtn.textContent.includes('Conheça os Artistas')) {
    knowArtistsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const artistsSection = document.querySelector('#artistas') || document.querySelector('.artists');
        if (artistsSection) {
            artistsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Inicia o carrossel automático a cada 3.5 segundos
setInterval(changeImage, 3500);

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
document.querySelectorAll('button').forEach(button => {
    addRippleEffect(button);
});

// CSS para o efeito ripple
const style = document.createElement('style');
style.textContent = `
    button {
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

// Animação de fade-in para a seção About quando entrar na viewport
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.about-text, .about-image').forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateX(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.about-text, .about-image').forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'all 0.8s ease';
    });
    
    document.querySelector('.about-text').style.transform = 'translateX(-50px)';
    document.querySelector('.about-image').style.transform = 'translateX(50px)';
    
    aboutObserver.observe(aboutSection);
}

// ==========================================
// INTEGRAÇÃO WHATSAPP
// ==========================================

// Número de WhatsApp do Studio Bragi (formato internacional sem + e sem espaços)
const WHATSAPP_NUMBER = '5521987252542';

// Função para abrir WhatsApp
function openWhatsApp(message = '') {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Botão de contato no header
const headerContactBtn = document.querySelector('.btn-contato');
if (headerContactBtn) {
    headerContactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openWhatsApp('Olá! Gostaria de saber mais sobre os serviços do Studio Bragi.');
    });
}

// Botões "Fale Conosco" na hero e CTA
const heroContactBtns = document.querySelectorAll('.btn-primary');
heroContactBtns.forEach(btn => {
    if (btn.textContent.includes('Fale Conosco')) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp('Olá! Gostaria de maiores informações sobre os serviços do Studio Bragi.');
        });
    }
});

// Botão CTA específico
const ctaBtn = document.querySelector('.btn-cta');
if (ctaBtn) {
    ctaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openWhatsApp('Olá! Gostaria de maiores informações sobre os serviços do Studio Bragi.');
    });
}

// ==========================================
// NAVEGAÇÃO PARA PÁGINAS DE ARTISTAS (CORRIGIDO!)
// ==========================================

const artistPages = {
    'Raymel': 'Artistas/Raymel/',
    'Lynna': 'Artistas/Lynna/',
    'Kindão': 'Artistas/Kindao/',
    'Fabão': 'Artistas/Fabao/',
    'Danit': 'Artistas/Danit/',
    'Viktor Souza': 'Artistas/Viktor/',
    'Nuylly': 'Artistas/Nuylly/',
    'Pinduka': 'Artistas/Pinduka/',
    'Cigano': 'Artistas/Cigano/',
    'DE 90': 'Artistas/De90/'
};

// Botões "Ver Perfil" dos artistas
document.querySelectorAll('.btn-artist-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const artistCard = btn.closest('.artist-card');
        const artistName = artistCard ? artistCard.querySelector('.artist-name')?.textContent.trim() : '';
        
        if (artistPages[artistName]) {
            window.location.href = artistPages[artistName];
        } else {
            console.warn(`Página não encontrada para: ${artistName}`);
            alert(`Página do artista "${artistName}" em construção!`);
        }
    });
});

// ==========================================
// BOTÕES "CONTATO" DOS CARDS DE ARTISTAS
// ==========================================

const artistContactButtons = document.querySelectorAll('.btn-artist-secondary');

artistContactButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const artistName = button.closest('.artist-card')?.querySelector('.artist-name')?.textContent || 'o artista';
        openWhatsApp(`Olá! Gostaria de mais informações sobre a contratação de ${artistName}.`);
    });
});

console.log('Studio Bragi - Site carregado com sucesso! 🎵');