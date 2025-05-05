/**
 * Script principal para el portafolio web
 * Maneja la interactividad básica del sitio
 */

document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');
    const header = document.querySelector('header');
    const scrollTopBtn = document.getElementById('scrollTop');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    // Función para alternar el menú móvil
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    // Función para cerrar el menú móvil
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Función para manejar el scroll y cambiar el estilo del header
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Función para manejar el envío del formulario
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validación básica
        if (!name || !email || !subject || !message) {
            alert('Por favor, complete todos los campos del formulario.');
            return;
        }
        
        // Aquí normalmente enviarías los datos a un servidor
        // Como es un sitio estático, solo mostraremos un mensaje de éxito
        alert(`Gracias ${name} por tu mensaje. Te responderemos lo antes posible.`);
        
        // Resetear el formulario
        contactForm.reset();
    }

    // Función para cambiar el tema
    function toggleTheme() {
        if (!themeIcon) return;
        
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    }

    // Función para mostrar/ocultar el botón de ir arriba
    function toggleScrollTopButton() {
        if (!scrollTopBtn) return;
        
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    // Función para ir arriba
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Verificar tema guardado
    function checkTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            if (themeIcon) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            }
        }
    }

    // Event Listeners
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', toggleScrollTopButton);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', scrollToTop);
    }
    
    // Inicializar el formulario si existe
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Verificar tema al cargar
    checkTheme();
    // Verificar posición de scroll al cargar
    toggleScrollTopButton();

    // Animación de aparición al hacer scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    };

    // Añadir clase para animación a elementos seleccionados
    const addAnimationClass = () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const children = section.children;
            for (let i = 0; i < children.length; i++) {
                if (children[i].tagName !== 'DIV' || children[i].classList.contains('container')) {
                    continue;
                }
                children[i].classList.add('animate-on-scroll');
            }
        });

        const cards = document.querySelectorAll('.featured-card, .tool-card, .project-card');
        cards.forEach(card => {
            card.classList.add('animate-on-scroll');
        });
    };

    // Inicializar animaciones
    addAnimationClass();
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar para elementos visibles inicialmente
});