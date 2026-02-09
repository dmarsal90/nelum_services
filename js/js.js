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

        // Actualizar estado activo
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        element.classList.add('active');
        
        // Centrar el botón en el menú horizontal
        element.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
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
        if (btn.getAttribute('onclick').includes(`'${current}'`)) {
            btn.classList.add('active');
            // ESTA LÍNEA HACE LA MAGIA: Centra el botón activo automáticamente al hacer scroll
            btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    });
};

/**
 * EFECTO MÓVIL: Resaltar tarjetas al pasar por el centro
 */
const initMobileScrollHighlight = () => {
    const options = {
        root: null,
        rootMargin: '-15% 0px -15% 0px',
        threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
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

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', () => {
    updateActiveNav();
    initMobileScrollHighlight();
});
