// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality directly
    initNavigation();
    initFAQ();
    initContactForm();
    initScrollAnimations();
    initNavbarScroll();
    initLightbox();
    initEmailJS(); // Initialize EmailJS
    loadImagesFromConfig(); // Load images from config
    preloadCriticalImages(); // Preload critical images
    // initGoogleMap(); // Comentado - usando embed gratuito
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 30px rgba(30, 57, 50, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(30, 57, 50, 0.1)';
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// FAQ functionality
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.faq-icon');
            
            // Close all other FAQ items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherIcon = otherQuestion.querySelector('.faq-icon');
                    otherAnswer.classList.remove('active');
                    otherIcon.textContent = '+';
                }
            });
            
            // Toggle current FAQ item
            answer.classList.toggle('active');
            icon.textContent = answer.classList.contains('active') ? '−' : '+';
        });
    });
}

// Contact form functionality with EmailJS
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.nombre || !data.telefono || !data.email) {
                showToast('Por favor completa todos los campos obligatorios', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showToast('Por favor ingresa un email válido', 'error');
                return;
            }
            
            // Show loading state
            showToast('Enviando mensaje...', 'info');
// ... existing code ...
            // Prepare email data
            const emailData = {
                to_name: 'Equipo de Ventas',
                from_name: data.nombre,
                from_phone: data.telefono,
                from_email: data.email,
                visit_date: data.fecha || 'No especificada',
                message: data.mensaje || 'No especificado',
                project_name: 'El Secreto de Estancias',
                sent_date: new Date().toLocaleDateString('es-CO')
            };
// ... existing code ...
            
            // Send email using EmailJS
            emailjs.send(
                SITE_CONFIG.emailjs.serviceId,
                SITE_CONFIG.emailjs.templateId,
                emailData,
                SITE_CONFIG.emailjs.userId
            )
            .then(function(response) {
                showToast('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
                contactForm.reset();
                console.log('Email sent successfully:', response);
            })
            .catch(function(error) {
                showToast('Error al enviar el mensaje. Por favor intenta nuevamente.', 'error');
                console.error('Email error:', error);
            });
        });
    }
}

// Toast notification system
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    // Set message and type
    toastMessage.textContent = message;
    
    // Remove existing type classes
    toast.classList.remove('success', 'error', 'info');
    
    // Set background color based on type
    switch(type) {
        case 'success':
            toast.classList.add('success');
            break;
        case 'error':
            toast.classList.add('error');
            break;
        case 'info':
            toast.classList.add('info');
            break;
        default:
            toast.classList.add('success');
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Initialize EmailJS
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(SITE_CONFIG.emailjs.userId);
        console.log('EmailJS initialized successfully');
    } else {
        console.warn('EmailJS not loaded');
    }
}

// Load images from config
function loadImagesFromConfig() {
    if (typeof SITE_CONFIG === 'undefined') {
        console.warn('SITE_CONFIG not loaded');
        return;
    }

    // Hero background - NO cambiar para mantener el gradiente original
    // const heroSection = document.querySelector('.hero');
    // if (heroSection) {
    //     heroSection.style.backgroundImage = `url('${SITE_CONFIG.images.hero}')`;
    // }

    // Bienvenida image
    const bienvenidaImage = document.querySelector('.bienvenida .placeholder-image');
    if (bienvenidaImage) {
        bienvenidaImage.style.backgroundImage = `url('${SITE_CONFIG.images.bienvenida}')`;
        bienvenidaImage.classList.remove('placeholder-image');
        bienvenidaImage.classList.add('real-image');
    }

    // Lotes images
    const loteCards = document.querySelectorAll('.lote-card .placeholder-image');
    loteCards.forEach((card, index) => {
        const loteTypes = ['terraza', 'ondulado', 'playa'];
        if (loteTypes[index]) {
            card.style.backgroundImage = `url('${SITE_CONFIG.images.lotes[loteTypes[index]]}')`;
            card.classList.remove('placeholder-image');
            card.classList.add('real-image');
        }
    });

    // Galería images
    const galeriaItems = document.querySelectorAll('.galeria-item .placeholder-image');
    galeriaItems.forEach((item, index) => {
        if (SITE_CONFIG.images.galeria[index]) {
            item.style.backgroundImage = `url('${SITE_CONFIG.images.galeria[index]}')`;
            item.classList.remove('placeholder-image');
            item.classList.add('real-image');
        }
    });

    console.log('Images loaded from config');
}

// Email notification function (fallback)
function sendEmailNotification(data) {
    // This function can be used as a fallback or alternative to EmailJS
    // You can integrate with other services like Formspree, Netlify Forms, or your own backend
    
    const emailBody = `
        Nuevo mensaje de El Secreto de Estancias:
        
        Nombre: ${data.nombre}
        Teléfono: ${data.telefono}
        Email: ${data.email}
        Fecha de visita: ${data.fecha || 'No especificada'}
        Mensaje: ${data.mensaje || 'No especificado'}
        
        Enviado desde: ${window.location.href}
    `;
    
    // For now, just log the data
    console.log('Email notification data:', emailBody);
    
    // You can implement actual email sending here
    // Example: Send to your email service or backend API
}



// Scroll animations with modern effects - Optimized
// Scroll animations with modern effects - Performance optimized
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    if (entry.target.dataset.reveal === 'left') {
                        entry.target.classList.add('reveal-left', 'active');
                    } else if (entry.target.dataset.reveal === 'right') {
                        entry.target.classList.add('reveal-right', 'active');
                    } else {
                        entry.target.classList.add('reveal', 'active');
                    }
                    if (
                        entry.target.classList.contains('lote-card') || 
                        entry.target.classList.contains('tiempo-item') ||
                        entry.target.classList.contains('servicio-item')
                    ) {
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 60;
                        entry.target.style.transitionDelay = `${delay}ms`;
                        entry.target.classList.add('scale-in');
                    }
                });
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('section, .lote-card, .servicio-item, .tiempo-item, .galeria-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Navbar scroll effect - Optimized with debounce
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let ticking = false;

    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
}

// Lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    // Close lightbox when clicking outside or on close button
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target === lightboxClose) {
            closeLightbox();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// Open lightbox
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    // For demonstration, we'll use placeholder images
    // Replace these with actual image URLs when you have them
    const images = [
        'https://via.placeholder.com/800x600/2E5E4E/FFFFFF?text=Montañas+de+San+Jerónimo',
        'https://via.placeholder.com/800x600/1E3932/FFFFFF?text=Quebradas+Naturales',
        'https://via.placeholder.com/800x600/C7A76B/FFFFFF?text=Rocas+y+Formaciones',
        'https://via.placeholder.com/800x600/2E5E4E/FFFFFF?text=Árboles+Nativos',
        'https://via.placeholder.com/800x600/1E3932/FFFFFF?text=Senderos+Naturales',
        'https://via.placeholder.com/800x600/C7A76B/FFFFFF?text=Vistas+Panorámicas',
        'https://via.placeholder.com/800x600/2E5E4E/FFFFFF?text=Atardecer+en+la+Meseta',
        'https://via.placeholder.com/800x600/1E3932/FFFFFF?text=Paisaje+Campestre'
    ];
    
    if (images[index]) {
        lightboxImg.src = images[index];
        lightboxImg.alt = `Imagen ${index + 1} de la galería`;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Toggle FAQ (for onclick in HTML)
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('.faq-icon');
    
    // Close all other FAQ items
    const allQuestions = document.querySelectorAll('.faq-question');
    allQuestions.forEach(question => {
        if (question !== element) {
            const otherAnswer = question.nextElementSibling;
            const otherIcon = question.querySelector('.faq-icon');
            otherAnswer.classList.remove('active');
            otherIcon.textContent = '+';
        }
    });
    
    // Toggle current FAQ item
    answer.classList.toggle('active');
    icon.textContent = answer.classList.contains('active') ? '−' : '+';
}

// Performance optimization: Lazy loading for images - Enhanced
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        // Preload image before showing
                        const tempImg = new Image();
                        tempImg.onload = () => {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        };
                        tempImg.src = img.dataset.src;
                    }
                }
            });
        }, {
            rootMargin: '150px 0px', // Load images earlier
            threshold: 0.01 // More sensitive
        });
        
        // Observe all images with data-src
        const lazyImages = document.querySelectorAll('img[data-src], .placeholder-image');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}


// Preload critical images
function preloadCriticalImages() {
    if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.images) {
        const criticalImages = [
            // SITE_CONFIG.images.hero, // NO preload hero para mantener gradiente
            SITE_CONFIG.images.bienvenida
        ];
        
        criticalImages.forEach(src => {
            if (src) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = src;
                document.head.appendChild(link);
            }
        });
    }
}

// Preload critical resources
function preloadCriticalResources() {
    // Preload fonts
    const fontLinks = [
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap'
    ];
    
    fontLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
    
    // Preload EmailJS
    const emailjsLink = document.createElement('link');
    emailjsLink.rel = 'preload';
    emailjsLink.as = 'script';
    emailjsLink.href = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    document.head.appendChild(emailjsLink);
}

// Show performance indicator
function showPerformanceIndicator(message) {
    const indicator = document.createElement('div');
    indicator.className = 'performance-indicator';
    indicator.textContent = message;
    indicator.style.cssText = `
        position: fixed;
        top: 1rem;
        left: 1rem;
        background: #25D366;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
        z-index: 2000;
        animation: slideInLeft 0.5s ease;
        box-shadow: 0 2px 10px rgba(37, 211, 102, 0.3);
    `;
    
    document.body.appendChild(indicator);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        indicator.style.animation = 'slideOutLeft 0.5s ease';
        setTimeout(() => indicator.remove(), 500);
    }, 3000);
}

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button when scrolling down
window.addEventListener('scroll', function() {
    const scrollTop = document.querySelector('.scroll-top');
    if (window.scrollY > 500) {
        if (!scrollTop) {
            createScrollToTopButton();
        }
    } else {
        if (scrollTop) {
            scrollTop.remove();
        }
    }
});

function createScrollToTopButton() {
    const scrollTop = document.createElement('button');
    scrollTop.className = 'scroll-top';
    scrollTop.innerHTML = '↑';
    scrollTop.style.cssText = `
        position: fixed;
        bottom: 5rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #C7A76B;
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(199, 167, 107, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    scrollTop.addEventListener('click', scrollToTop);
    scrollTop.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(199, 167, 107, 0.4)';
    });
    scrollTop.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(199, 167, 107, 0.3)';
    });
    
    document.body.appendChild(scrollTop);
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
});

// Performance monitoring and loading optimization - Enhanced
window.addEventListener('load', function() {
    // Add loaded class for animations
    document.body.classList.add('loaded');
    
    // Performance metrics
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
            const loadTime = Math.max(0, perfData.loadEventEnd - perfData.loadEventStart);
            const domContentLoaded = Math.max(0, perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart);
            const firstPaint = performance.getEntriesByType('paint')[0]?.startTime || 0;
            
            console.log(`🚀 Performance Metrics:
        - First Paint: ${Math.round(firstPaint)}ms
        - DOM Content Loaded: ${Math.round(domContentLoaded)}ms
        - Page Load: ${Math.round(loadTime)}ms
        - Total Time: ${Math.round(perfData.loadEventEnd)}ms`);
            
            // Show performance indicator if load time is good
            if (loadTime > 0 && loadTime < 2000) {
                showPerformanceIndicator('⚡ Página cargada en ' + Math.round(loadTime) + 'ms');
            }
            
            // Log Core Web Vitals if available
            if ('web-vital' in window) {
                console.log('📊 Core Web Vitals disponibles');
            }
        }
    }
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Register Service Worker for offline functionality
    registerServiceWorker();
});

// Service Worker Registration
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('✅ Service Worker registrado:', registration.scope);
                    
                    // Verificar actualizaciones
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                showToast('Nueva versión disponible. Recarga la página para actualizar.', 'info');
                            }
                        });
                    });
                })
                .catch(error => {
                    console.error('❌ Error registrando Service Worker:', error);
                });
        });
    } else {
        console.log('⚠️ Service Worker no soportado en este navegador');
    }
}







// Google Maps functionality
function initGoogleMap() {
    // Coordenadas de San Jerónimo, Antioquia (aproximadas)
    const sanJeronimo = { lat: 6.4431, lng: -75.7281 };
    
    // Crear el mapa
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: sanJeronimo,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            },
            {
                featureType: 'transit',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });
    
    // Agregar marcador del proyecto
    const marker = new google.maps.Marker({
        position: sanJeronimo,
        map: map,
        title: 'El Secreto de Estancias',
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: '#6B7C32',
            fillOpacity: 0.8,
            strokeColor: '#FFFFFF',
            strokeWeight: 2
        }
    });
    
    // Info window del marcador
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px; max-width: 200px;">
                <h3 style="margin: 0 0 10px 0; color: #6B7C32;">El Secreto de Estancias</h3>
                <p style="margin: 0; color: #2C2C2C;">San Jerónimo, Antioquia<br>Vereda Estancias</p>
            </div>
        `
    });
    
    // Mostrar info window al hacer clic en el marcador
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

// Add CSS for loaded state
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        opacity: 0;
        transform: translateY(20px);
        transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    body.loaded {
        opacity: 1;
        transform: translateY(0);
    }
    
    .scroll-top:hover {
        background: #B8945A;
    }
    
    /* Animación de entrada para secciones */
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    body.loaded section {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Stagger effect para secciones */
    body.loaded section:nth-child(1) { transition-delay: 0.1s; }
    body.loaded section:nth-child(2) { transition-delay: 0.2s; }
    body.loaded section:nth-child(3) { transition-delay: 0.3s; }
    body.loaded section:nth-child(4) { transition-delay: 0.4s; }
    body.loaded section:nth-child(5) { transition-delay: 0.5s; }
    body.loaded section:nth-child(6) { transition-delay: 0.6s; }
    body.loaded section:nth-child(7) { transition-delay: 0.7s; }
    body.loaded section:nth-child(8) { transition-delay: 0.8s; }
`;
document.head.appendChild(style);
