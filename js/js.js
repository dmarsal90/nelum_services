/**
 * Navegación suave a las secciones
 */
function scrollToSection(sectionId, element) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.nav-container').offsetHeight;
        const offsetPosition = section.offsetTop - navHeight - 15;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Actualizar estado activo inmediatamente
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        element.classList.add('active');
    }
}

/**
 * Resaltado de botones de navegación según el scroll
 */
const updateActiveNav = () => {
    let current = '';
    const sections = document.querySelectorAll('.section');
    const navHeight = document.querySelector('.nav-container').offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        // Comprobamos si el atributo onclick contiene el ID de la sección actual
        if (btn.getAttribute('onclick').includes(`'${current}'`)) {
            btn.classList.add('active');
        }
    });
};

/**
 * EFECTO MÓVIL: Resaltar tarjetas al pasar por el centro de la pantalla
 * Esto simula el efecto "hover" mientras el usuario hace scroll.
 */
const initMobileScrollHighlight = () => {
    const options = {
        root: null,
        rootMargin: '-15% 0px -15% 0px', // Se activa cuando está cerca del centro
        threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
        // Solo aplicar si la pantalla es de móvil/tablet
        if (window.innerWidth <= 768) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('touch-active');
                } else {
                    entry.target.classList.remove('touch-active');
                }
            });
        }
    }, options);

    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
};

// Event Listeners
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', () => {
    updateActiveNav();
    initMobileScrollHighlight();
});

// Re-inicializar si cambian el tamaño de la pantalla
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelectorAll('.service-card').forEach(c => c.classList.remove('touch-active'));
    }
});