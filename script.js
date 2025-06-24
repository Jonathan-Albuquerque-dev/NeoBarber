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
            carouselTrack.innerHTML = '';
            dotsContainer.innerHTML = '';
            
            galleryImages.forEach((src, index) => {
                const slide = document.createElement('div');
                slide.classList.add('carousel-slide');
                const img = document.createElement('img');
                img.src = src;
                img.alt = 'Imagem da Galeria';
                img.onerror = function() { this.src='https://placehold.co/800x600/CCCCCC/FFFFFF?text=Erro'; };
                slide.appendChild(img);
                carouselTrack.appendChild(slide);

                const dot = document.createElement('span');
                dot.classList.add('dot');
                dot.dataset.index = index;
                dotsContainer.appendChild(dot);
            });

            const prevButton = document.querySelector('.carousel-button.prev');
            const nextButton = document.querySelector('.carousel-button.next');
            const originalSlides = Array.from(carouselTrack.children);
            const dots = Array.from(dotsContainer.children);
            const totalRealSlides = originalSlides.length;
            let counter = 1;
            let slideWidth = 0;
            let isTransitioning = false;
            let autoplayInterval;

            function setupInfiniteLoop() {
                if (totalRealSlides <= 1) return;

                const firstClone = originalSlides[0].cloneNode(true);
                const lastClone = originalSlides[totalRealSlides - 1].cloneNode(true);
                
                carouselTrack.appendChild(firstClone);
                carouselTrack.prepend(lastClone);

                slideWidth = originalSlides[0].getBoundingClientRect().width;
                carouselTrack.style.transform = `translateX(${-slideWidth * counter}px)`;
            }

            function moveSlides(direction) {
                if (isTransitioning) return;
                isTransitioning = true;
                
                carouselTrack.style.transition = 'transform 0.4s ease-in-out';
                counter += direction;
                carouselTrack.style.transform = `translateX(${-slideWidth * counter}px)`;
                
                updateDots();
            }

            function updateDots() {
                let realIndex;
                if (counter === 0) {
                    realIndex = totalRealSlides - 1;
                } else if (counter === totalRealSlides + 1) {
                    realIndex = 0;
                } else {
                    realIndex = counter - 1;
                }
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === realIndex);
                });
            }
            
            carouselTrack.addEventListener('transitionend', () => {
                if (counter <= 0) {
                    carouselTrack.style.transition = 'none';
                    counter = totalRealSlides;
                    carouselTrack.style.transform = `translateX(${-slideWidth * counter}px)`;
                }

                if (counter > totalRealSlides) {
                    carouselTrack.style.transition = 'none';
                    counter = 1;
                    carouselTrack.style.transform = `translateX(${-slideWidth * counter}px)`;
                }
                isTransitioning = false;
            });
            
            const startAutoplay = () => {
                stopAutoplay();
                autoplayInterval = setInterval(() => moveSlides(1), 4000);
            };

            const stopAutoplay = () => clearInterval(autoplayInterval);
            
            function initializeCarousel() {
                setupInfiniteLoop();
                updateDots();
                startAutoplay();
            }

            carouselContainer.addEventListener('mouseenter', stopAutoplay);
            carouselContainer.addEventListener('mouseleave', startAutoplay);
            nextButton.addEventListener('click', () => moveSlides(1));
            prevButton.addEventListener('click', () => moveSlides(-1));
            
            dotsContainer.addEventListener('click', (e) => {
                const targetDot = e.target.closest('.dot');
                if (targetDot) {
                    const targetIndex = parseInt(targetDot.dataset.index);
                    counter = targetIndex + 1; // Ajusta o contador para o slide real correspondente
                    carouselTrack.style.transition = 'transform 0.4s ease-in-out';
                    carouselTrack.style.transform = `translateX(${-slideWidth * counter}px)`;
                    updateDots();
                }
            });

            window.addEventListener('resize', () => {
                slideWidth = originalSlides[0].getBoundingClientRect().width;
                carouselTrack.style.transition = 'none';
                carouselTrack.style.transform = `translateX(${-slideWidth * counter}px)`;
            });

            initializeCarousel();
            
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