// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // LÓGICA DEL CARRUSEL (Storytelling & Bocetos)
    // ==========================================
    // Principio 11: Reemplazamiento de memoria por conocimiento en el mundo. 
    // Mostramos botones (< >) explícitos en lugar de forzar al usuario a recordar que puede hacer 'swipe'.
    
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const btnNext = document.getElementById('btnNext');
    const btnPrev = document.getElementById('btnPrev');
    const indicators = Array.from(document.querySelectorAll('.indicator'));
    
    let currentIndex = 0;

    // Función principal de actualización del carrusel
    const updateCarousel = (index) => {
        // Principio de Feedback: El usuario nota visualmente el cambio de slide inmediatamente
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Actualizar el estado visual de los indicadores (Puntos)
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active', 'w-6', 'bg-sulley');
                indicator.classList.remove('w-2', 'bg-gray-300');
            } else {
                indicator.classList.remove('active', 'w-6', 'bg-sulley');
                indicator.classList.add('w-2', 'bg-gray-300');
            }
        });
    };

    // Evento: Botón Siguiente
    if(btnNext) {
        btnNext.addEventListener('click', () => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            updateCarousel(currentIndex);
        });
    }

    // Evento: Botón Anterior
    if(btnPrev) {
        btnPrev.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            updateCarousel(currentIndex);
        });
    }

    // Evento: Click directo en indicadores
    // Principio 8: Minimizar coste de acceso. Permite ir al boceto 3 sin tener que pasar por el 2.
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(currentIndex);
        });
    });


    // ==========================================
    // LÓGICA DEL HEADER FIJO (Scroll Effect)
    // ==========================================
    // Otorga consistencia visual y feedback sutil cuando el usuario empieza a hacer scroll
    const header = document.querySelector('header');
    
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('shadow-md', 'py-1');
                header.classList.remove('shadow-sm', 'py-0');
            } else {
                header.classList.add('shadow-sm', 'py-0');
                header.classList.remove('shadow-md', 'py-1');
            }
        });
    }
});

    // ==========================================
    // LÓGICA DEL SIDEBAR COLAPSABLE Y SCROLLSPY
    // ==========================================
    // Principio 8: Minimizar coste de acceso.
    // Principio 11: ScrollSpy para mostrar en dónde se encuentra el usuario.

    const sidebar = document.getElementById('sidebar');
    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
    const desktopToggleBtn = document.getElementById('desktopToggleBtn');
    const sidebarIconMobile = document.getElementById('sidebarIconMobile');
    const sidebarIconDesktop = document.getElementById('sidebarIconDesktop');
    const spyLinks = document.querySelectorAll('.spy-link');
    
    // Secciones a observar
    const sections = [
        document.getElementById('equipo'),
        document.getElementById('vr-project'),
        document.getElementById('fase1'),
        document.getElementById('fase2'),
        document.getElementById('fase3'),
        document.getElementById('fase4'),
        document.getElementById('fase5'),
        document.getElementById('mobile-project')
    ];

    let isSidebarExpanded = false;

    const toggleSidebar = () => {
        isSidebarExpanded = !isSidebarExpanded;
        if(isSidebarExpanded) {
            sidebar.classList.add('sidebar-expanded');
            if(sidebarIconDesktop) sidebarIconDesktop.classList.add('rotate-180-custom');
        } else {
            sidebar.classList.remove('sidebar-expanded');
            if(sidebarIconDesktop) sidebarIconDesktop.classList.remove('rotate-180-custom');
        }
    };

    const toggleMobileSidebar = () => {
        const isHidden = sidebarWrapper.classList.contains('-translate-x-full');
        if(isHidden) {
            sidebarWrapper.classList.remove('-translate-x-full');
            if(sidebarIconMobile) sidebarIconMobile.classList.add('rotate-180-custom');
        } else {
            sidebarWrapper.classList.add('-translate-x-full');
            if(sidebarIconMobile) sidebarIconMobile.classList.remove('rotate-180-custom');
            // Si estaba expandido en texto, colapsarlo también
            if(isSidebarExpanded) toggleSidebar();
        }
    };

    if(desktopToggleBtn) desktopToggleBtn.addEventListener('click', toggleSidebar);
    if(toggleSidebarBtn) toggleSidebarBtn.addEventListener('click', toggleMobileSidebar);

    // ScrollSpy nativo con IntersectionObserver (Principio 11)
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id) {
                // Remover active de todos
                spyLinks.forEach(link => link.classList.remove('active'));
                
                // Añadir active al correspondiente
                const activeLink = document.querySelector(`.spy-link[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    
                    // Si el elemento es una fase (fase1, fase2...), también iluminar 'vr-project' de forma sutil
                    if(entry.target.id.startsWith('fase')) {
                         const parentLink = document.querySelector('.spy-link[href="#vr-project"]');
                         if(parentLink) parentLink.classList.add('active');
                    }
                }
            }
        });
    }, observerOptions);

    sections.forEach(sec => {
        if(sec) scrollSpyObserver.observe(sec);
    });

    // ==========================================
    // LÓGICA DEL BOTÓN BACK TO TOP
    // ==========================================
    // Principio 12: Ayuda predictiva.
    
    const backToTopBtn = document.getElementById('backToTopBtn');

    if(backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                // Mostrar botón (quita translateY y pone opacity 1)
                backToTopBtn.classList.remove('translate-y-24', 'opacity-0');
                backToTopBtn.classList.add('translate-y-0', 'opacity-100');
            } else {
                // Ocultar botón
                backToTopBtn.classList.add('translate-y-24', 'opacity-0');
                backToTopBtn.classList.remove('translate-y-0', 'opacity-100');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
