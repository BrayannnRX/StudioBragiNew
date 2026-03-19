/**
 * Studio Bragi v2.0
 * Modern Interactions & Animations
 */

// =========================================================================================
// SISTEMA DE CONTROLE DE ARTISTAS NA PÁGINA PRINCIPAL
// Abaixo, altere os valores para `true` para exibir o artista, ou `false` para ocultá-lo.
// Os novos artistas ficam desativados por padrão até que você mude para `true`.
// =========================================================================================
const configArtistas = {
    "Lynna": true,
    "Kindao": true,
    "Cigano": true,
    "De90": true,
    "Everthon": true,
    "Danit": false,
    "Fabao": false,
    "Nuylly": false,
    "Pinduka": false,
    "Raymel": false,
    "Viktor": false
};

document.addEventListener('DOMContentLoaded', () => {
    // 0. Artist Visibility System
    const artistCards = document.querySelectorAll('.artist-card[data-artist]');
    artistCards.forEach(card => {
        const artistName = card.getAttribute('data-artist');
        if (configArtistas[artistName] === false) {
            card.style.display = 'none';
        }
    });

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navWrapper = document.querySelector('.nav-wrapper');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn?.addEventListener('click', () => {
        navWrapper.classList.toggle('mobile-active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navWrapper.classList.remove('mobile-active');
        });
    });

    // 2. Header Scroll Effect
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, delay);
                } else {
                    entry.target.classList.add('active');
                }
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 4. About Section Image Carousel
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');

    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;

        const goToSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(ind => ind.classList.remove('active'));

            slides[index].classList.add('active');
            indicators[index].classList.add('active');
            currentSlide = index;
        };

        const nextSlide = () => {
            let index = (currentSlide + 1) % totalSlides;
            goToSlide(index);
        };

        const prevSlide = () => {
            let index = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(index);
        };

        nextBtn?.addEventListener('click', nextSlide);
        prevBtn?.addEventListener('click', prevSlide);

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        // Auto advance carousel
        setInterval(nextSlide, 5000);
    }
});