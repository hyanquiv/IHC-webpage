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
