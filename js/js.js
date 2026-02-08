function scrollToSection(sectionId, element) {
            const section = document.getElementById(sectionId);
            if (section) {
                const navHeight = document.querySelector('.nav-container').offsetHeight;
                const offsetPosition = section.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active state
                document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
                element.classList.add('active');
            }
        }

        // Highlight nav on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('.section');
            const navHeight = document.querySelector('.nav-container').offsetHeight;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - navHeight - 100;
                if (pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('onclick').includes(current)) {
                    btn.classList.add('active');
                }
            });
        });