document.addEventListener('DOMContentLoaded', function () {

    // --- Lógica para o Menu Mobile ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // --- Lógica para o Carrossel da Galeria ---
    const galleryImages = [
        './assets/img/corte de cabelo masculino.jpg',
        './assets/img/corte de cabelo masculino.jpg',
        './assets/img/corte de cabelo masculino.jpg',
        './assets/img/corte de cabelo masculino.jpg',
        './assets/img/corte de cabelo masculino.jpg',
        './assets/img/corte de cabelo masculino.jpg'
    ];
    
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselTrack = document.querySelector('.carousel-track');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    // Popula o carrossel e os pontos
    galleryImages.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Imagem da galeria ${index + 1}`;
        img.onerror = function() {
            this.onerror=null;
            this.src='https://placehold.co/800x600/CCCCCC/FFFFFF?text=Imagem+N%C3%A3o+Encontrada';
        };
        slide.appendChild(img);
        carouselTrack.appendChild(slide);

        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });

    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const slides = Array.from(carouselTrack.children);
    const dots = Array.from(dotsContainer.children);
    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoplayInterval;

    if (totalSlides > 0) {
        // Função para mover para um slide específico
        const goToSlide = (slideIndex) => {
            if (slideIndex < 0) {
                slideIndex = totalSlides - 1;
            } else if (slideIndex >= totalSlides) {
                slideIndex = 0;
            }

            const slideWidth = slides[0].offsetWidth;
            carouselTrack.style.transition = 'transform 0.5s ease-in-out';
            carouselTrack.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
            currentIndex = slideIndex;

            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        };
        
        nextButton.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });

        prevButton.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });

        dotsContainer.addEventListener('click', (e) => {
            const targetDot = e.target.closest('.dot');
            if (targetDot) {
                const targetIndex = Array.from(dots).indexOf(targetDot);
                goToSlide(targetIndex);
            }
        });

        const startAutoplay = () => {
            stopAutoplay();
            autoplayInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 4000);
        };

        const stopAutoplay = () => {
            clearInterval(autoplayInterval);
        };

        carouselContainer.addEventListener('mouseenter', stopAutoplay);
        carouselContainer.addEventListener('mouseleave', startAutoplay);
        
        window.addEventListener('resize', () => {
            const slideWidth = slides[0].offsetWidth;
            carouselTrack.style.transition = 'none';
            carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            setTimeout(() => {
                carouselTrack.style.transition = 'transform 0.5s ease-in-out';
            });
        });

        goToSlide(0);
        startAutoplay();
    }
    
    // --- Lógica para Rolagem Suave (Smooth Scrolling) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                
                if (mobileMenu.contains(this) && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // --- Atualiza o ano no rodapé ---
    document.getElementById('current-year').textContent = new Date().getFullYear();
});