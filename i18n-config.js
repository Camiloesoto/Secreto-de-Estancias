// Internationalization Configuration (i18n)
// Multi-language support for Spanish (ES) and English (EN)

const I18N_CONFIG = {
    defaultLanguage: 'es',
    supportedLanguages: ['es', 'en'],
    fallbackLanguage: 'es',
    storageKey: 'estancias_language'
};

// Language translations
const TRANSLATIONS = {
    es: {
        // Navigation
        nav: {
            inicio: 'Inicio',
            ubicacion: 'Ubicación',
            lotes: 'Lotes',
            caracteristicas: 'Características',
            galeria: 'Galería',
            reservas: 'Reservas',
            blog: 'Blog',
            contacto: 'Contacto'
        },
        
        // Hero Section
        hero: {
            title: 'El Secreto de Estancias',
            subtitle: 'Vive la naturaleza con libertad y confort',
            copy: 'Un proyecto exclusivo en San Jerónimo, sobre una meseta única, con vistas memorables y libertad de diseño.',
            cta: {
                agendar: 'Agendar visita',
                disponibilidad: 'Ver disponibilidad'
            },
            trust: {
                acceso: 'Doble acceso vial',
                altitud: 'Altitud 1.000 m s.n.m.',
                parcelacion: 'Parcelación abierta (sin P.H.)'
            }
        },
        
        // Bienvenida
        bienvenida: {
            title: 'Un refugio de lujo natural',
            description: 'En lo alto de San Jerónimo, nace un lugar pensado para quienes buscan amplitud, privacidad y naturaleza. El Secreto de Estancias ofrece lotes generosos, vistas únicas y la libertad de crear un hogar auténtico, sin imposiciones.'
        },
        
        // Ubicación
        ubicacion: {
            title: 'Ubicación estratégica',
            municipio: 'Municipio',
            municipioValue: 'San Jerónimo, vereda Estancias (Antioquia)',
            altitud: 'Altitud',
            altitudValue: '1.000 m s.n.m.',
            coordenadas: 'Coordenadas',
            coordenadasValue: '6°26\'35.1"N 75°43\'41.1"W'
        },
        
        // Cercanías
        cercanias: {
            title: 'Cercanías estratégicas',
            medellin: 'Medellín',
            medellinTime: '45 min',
            sabaneta: 'Sabaneta',
            sabanetaTime: '35 min',
            envigado: 'Envigado',
            envigadoTime: '40 min',
            aeropuerto: 'Aeropuerto José María Córdova',
            aeropuertoTime: '1h 15min'
        },
        
        // Entorno
        entorno: {
            title: 'Entorno natural privilegiado',
            clima: 'Clima templado todo el año',
            temperatura: 'Temperatura promedio: 22°C',
            vegetacion: 'Vegetación nativa conservada',
            fauna: 'Fauna silvestre diversa'
        },
        
        // Tipos de Lotes
        lotes: {
            title: 'Tipos de lotes disponibles',
            terraza: {
                title: 'Lotes en Terraza',
                description: 'Lotes planos con vistas panorámicas, ideales para construcción inmediata.'
            },
            ondulado: {
                title: 'Lotes Ondulados',
                description: 'Lotes con suave pendiente, perfectos para casas con vista y ventilación natural.'
            },
            playa: {
                title: 'Lotes de Playa',
                description: 'Lotes junto a quebradas naturales, con sonido de agua y frescura constante.'
            }
        },
        
        // Características
        caracteristicas: {
            title: 'Características incluidas',
            agua: 'Dos derechos de agua',
            explanacion: 'Explanación incluida',
            grama: 'Grama macana sembrada',
            vias: 'Vías internas pavimentadas',
            electricidad: 'Electricidad disponible',
            internet: 'Internet de alta velocidad'
        },
        
        // Libertad de Diseño
        libertad: {
            title: 'Libertad de diseño total',
            description: 'Sin Plan de Ordenamiento Territorial (POT) que limite tu creatividad. Diseña tu casa campestre exactamente como la sueñas.',
            beneficios: [
                'Sin restricciones de altura',
                'Sin límites de estilo arquitectónico',
                'Libertad en materiales de construcción',
                'Personalización total del proyecto'
            ]
        },
        
        // Mirador
        mirador: {
            title: 'Mirador panorámico',
            description: 'Desde nuestro mirador podrás contemplar las montañas de Antioquia, el valle de San Jerónimo y los atardeceres más espectaculares de la región.'
        },
        
        // Integración Natural
        integracion: {
            title: 'Integración con la naturaleza',
            description: 'El proyecto está diseñado para preservar y potenciar el entorno natural existente.',
            elementos: [
                'Corredores de vida silvestre',
                'Árboles nativos conservados',
                'Quebradas naturales protegidas',
                'Senderos ecológicos integrados'
            ]
        },
        
        // Inspiración Arquitectónica
        inspiracion: {
            title: 'Inspiración arquitectónica',
            description: 'Te proporcionamos ideas y referencias para que puedas diseñar tu casa campestre ideal.',
            estilos: [
                'Arquitectura campestre moderna',
                'Casas de campo tradicionales',
                'Diseño bioclimático',
                'Integración paisajística'
            ]
        },
        
        // Galería
        galeria: {
            title: 'Galería de imágenes',
            subtitle: 'Conoce el entorno natural de El Secreto de Estancias'
        },
        
        // FAQ
        faq: {
            title: 'Preguntas frecuentes',
            questions: [
                {
                    question: '¿Cuáles son los tamaños de lotes disponibles?',
                    answer: 'Ofrecemos lotes desde 1.000 m² hasta 3.000 m², adaptados a diferentes necesidades y presupuestos.'
                },
                {
                    question: '¿Incluye servicios básicos?',
                    answer: 'Sí, todos los lotes incluyen dos derechos de agua, explanación, grama macana y acceso a vías pavimentadas.'
                },
                {
                    question: '¿Hay restricciones de construcción?',
                    answer: 'No hay Plan de Ordenamiento Territorial (POT), por lo que tienes total libertad de diseño y construcción.'
                },
                {
                    question: '¿Cuánto tiempo toma llegar desde Medellín?',
                    answer: 'Desde Medellín se llega en aproximadamente 45 minutos por vías pavimentadas y en excelente estado.'
                }
            ]
        },
        
        // Contacto
        contacto: {
            title: 'Contacto',
            subtitle: 'Agenda tu visita y conoce los lotes disponibles',
            form: {
                nombre: 'Nombre completo *',
                telefono: 'Teléfono *',
                email: 'Email *',
                fecha: 'Fecha de visita preferida',
                mensaje: 'Mensaje',
                enviar: 'Enviar mensaje',
                enviando: 'Enviando...'
            },
            info: {
                telefono: 'Teléfono',
                email: 'Email',
                ubicacion: 'Ubicación',
                whatsapp: 'WhatsApp',
                maps: 'Ver en Google Maps'
            }
        },
        
        // Footer
        footer: {
            slogan: 'Vive la naturaleza con libertad y confort',
            links: {
                privacidad: 'Aviso de privacidad',
                terminos: 'Términos y condiciones',
                datos: 'Política de datos'
            },
            copyright: 'El Secreto de Estancias. Todos los derechos reservados.'
        },
        
        // Blog
        blog: {
            title: 'Blog',
            subtitle: 'Noticias y consejos sobre lotes campestres',
            filters: {
                all: 'Todos',
                lotes: 'Lotes Campestres',
                vida: 'Vida Rural',
                inversion: 'Inversión',
                naturaleza: 'Naturaleza',
                sanJeronimo: 'San Jerónimo'
            },
            readMore: 'Leer más',
            categories: {
                lotes: 'Lotes Campestres',
                vida: 'Vida Rural',
                inversion: 'Inversión',
                naturaleza: 'Naturaleza',
                sanJeronimo: 'San Jerónimo'
            }
        },
        
        // Reservas
        reservas: {
            title: 'Reserva tu visita',
            subtitle: 'Asegura tu lote preferido agendando una visita',
            form: {
                nombre: 'Nombre completo *',
                email: 'Email *',
                telefono: 'Teléfono *',
                fecha: 'Fecha preferida *',
                hora: 'Hora preferida *',
                tipoLote: 'Tipo de lote de interés',
                mensaje: 'Mensaje adicional',
                reservar: 'Reservar visita'
            },
            info: {
                title: 'Información importante',
                items: [
                    'Las visitas tienen una duración aproximada de 1 hora',
                    'Máximo 4 visitas por día para garantizar atención personalizada',
                    'Te enviaremos una confirmación por email',
                    'Puedes cancelar o reprogramar hasta 24 horas antes'
                ],
                horarios: 'Horarios disponibles:',
                lunesViernes: 'Lunes a Viernes: 9:00 AM - 4:00 PM',
                sabados: 'Sábados: 9:00 AM - 2:00 PM',
                domingos: 'Domingos: Cerrado'
            }
        },
        
        // Language switcher
        language: {
            es: 'Español',
            en: 'English'
        }
    },
    
    en: {
        // Navigation
        nav: {
            inicio: 'Home',
            ubicacion: 'Location',
            lotes: 'Lots',
            caracteristicas: 'Features',
            galeria: 'Gallery',
            reservas: 'Bookings',
            blog: 'Blog',
            contacto: 'Contact'
        },
        
        // Hero Section
        hero: {
            title: 'El Secreto de Estancias',
            subtitle: 'Live nature with freedom and comfort',
            copy: 'An exclusive project in San Jerónimo, on a unique plateau, with memorable views and design freedom.',
            cta: {
                agendar: 'Schedule visit',
                disponibilidad: 'Check availability'
            },
            trust: {
                acceso: 'Double road access',
                altitud: 'Altitude 1,000 m.a.s.l.',
                parcelacion: 'Open subdivision (no restrictions)'
            }
        },
        
        // Bienvenida
        bienvenida: {
            title: 'A luxury natural refuge',
            description: 'High in San Jerónimo, a place is born for those seeking spaciousness, privacy and nature. El Secreto de Estancias offers generous lots, unique views and the freedom to create an authentic home without impositions.'
        },
        
        // Ubicación
        ubicacion: {
            title: 'Strategic location',
            municipio: 'Municipality',
            municipioValue: 'San Jerónimo, Estancias village (Antioquia)',
            altitud: 'Altitude',
            altitudValue: '1,000 m.a.s.l.',
            coordenadas: 'Coordinates',
            coordenadasValue: '6°26\'35.1"N 75°43\'41.1"W'
        },
        
        // Cercanías
        cercanias: {
            title: 'Strategic proximity',
            medellin: 'Medellín',
            medellinTime: '45 min',
            sabaneta: 'Sabaneta',
            sabanetaTime: '35 min',
            envigado: 'Envigado',
            envigadoTime: '40 min',
            aeropuerto: 'José María Córdova Airport',
            aeropuertoTime: '1h 15min'
        },
        
        // Entorno
        entorno: {
            title: 'Privileged natural environment',
            clima: 'Temperate climate year-round',
            temperatura: 'Average temperature: 22°C',
            vegetacion: 'Preserved native vegetation',
            fauna: 'Diverse wildlife'
        },
        
        // Tipos de Lotes
        lotes: {
            title: 'Available lot types',
            terraza: {
                title: 'Terrace Lots',
                description: 'Flat lots with panoramic views, ideal for immediate construction.'
            },
            ondulado: {
                title: 'Rolling Lots',
                description: 'Lots with gentle slope, perfect for houses with views and natural ventilation.'
            },
            playa: {
                title: 'Stream Lots',
                description: 'Lots next to natural streams, with water sounds and constant freshness.'
            }
        },
        
        // Características
        caracteristicas: {
            title: 'Included features',
            agua: 'Two water rights',
            explanacion: 'Leveling included',
            grama: 'Planted macana grass',
            vias: 'Paved internal roads',
            electricidad: 'Available electricity',
            internet: 'High-speed internet'
        },
        
        // Libertad de Diseño
        libertad: {
            title: 'Total design freedom',
            description: 'No Territorial Planning Plan (POT) to limit your creativity. Design your country house exactly as you dream it.',
            beneficios: [
                'No height restrictions',
                'No architectural style limits',
                'Freedom in construction materials',
                'Total project customization'
            ]
        },
        
        // Mirador
        mirador: {
            title: 'Panoramic viewpoint',
            description: 'From our viewpoint you can contemplate the mountains of Antioquia, the San Jerónimo valley and the most spectacular sunsets in the region.'
        },
        
        // Integración Natural
        integracion: {
            title: 'Integration with nature',
            description: 'The project is designed to preserve and enhance the existing natural environment.',
            elementos: [
                'Wildlife corridors',
                'Preserved native trees',
                'Protected natural streams',
                'Integrated ecological trails'
            ]
        },
        
        // Inspiración Arquitectónica
        inspiracion: {
            title: 'Architectural inspiration',
            description: 'We provide ideas and references so you can design your ideal country house.',
            estilos: [
                'Modern country architecture',
                'Traditional country houses',
                'Bioclimatic design',
                'Landscape integration'
            ]
        },
        
        // Galería
        galeria: {
            title: 'Image gallery',
            subtitle: 'Discover the natural environment of El Secreto de Estancias'
        },
        
        // FAQ
        faq: {
            title: 'Frequently asked questions',
            questions: [
                {
                    question: 'What lot sizes are available?',
                    answer: 'We offer lots from 1,000 m² to 3,000 m², adapted to different needs and budgets.'
                },
                {
                    question: 'Does it include basic services?',
                    answer: 'Yes, all lots include two water rights, leveling, macana grass and access to paved roads.'
                },
                {
                    question: 'Are there construction restrictions?',
                    answer: 'There is no Territorial Planning Plan (POT), so you have total freedom of design and construction.'
                },
                {
                    question: 'How long does it take to get from Medellín?',
                    answer: 'From Medellín it takes approximately 45 minutes via paved roads in excellent condition.'
                }
            ]
        },
        
        // Contacto
        contacto: {
            title: 'Contact',
            subtitle: 'Schedule your visit and discover available lots',
            form: {
                nombre: 'Full name *',
                telefono: 'Phone *',
                email: 'Email *',
                fecha: 'Preferred visit date',
                mensaje: 'Message',
                enviar: 'Send message',
                enviando: 'Sending...'
            },
            info: {
                telefono: 'Phone',
                email: 'Email',
                ubicacion: 'Location',
                whatsapp: 'WhatsApp',
                maps: 'View on Google Maps'
            }
        },
        
        // Footer
        footer: {
            slogan: 'Live nature with freedom and comfort',
            links: {
                privacidad: 'Privacy notice',
                terminos: 'Terms and conditions',
                datos: 'Data policy'
            },
            copyright: 'El Secreto de Estancias. All rights reserved.'
        },
        
        // Blog
        blog: {
            title: 'Blog',
            subtitle: 'News and advice about country lots',
            filters: {
                all: 'All',
                lotes: 'Country Lots',
                vida: 'Country Life',
                inversion: 'Investment',
                naturaleza: 'Nature',
                sanJeronimo: 'San Jerónimo'
            },
            readMore: 'Read more',
            categories: {
                lotes: 'Country Lots',
                vida: 'Country Life',
                inversion: 'Investment',
                naturaleza: 'Nature',
                sanJeronimo: 'San Jerónimo'
            }
        },
        
        // Reservas
        reservas: {
            title: 'Book your visit',
            subtitle: 'Secure your preferred lot by scheduling a visit',
            form: {
                nombre: 'Full name *',
                email: 'Email *',
                telefono: 'Phone *',
                fecha: 'Preferred date *',
                hora: 'Preferred time *',
                tipoLote: 'Lot type of interest',
                mensaje: 'Additional message',
                reservar: 'Book visit'
            },
            info: {
                title: 'Important information',
                items: [
                    'Visits last approximately 1 hour',
                    'Maximum 4 visits per day to ensure personalized attention',
                    'We will send you an email confirmation',
                    'You can cancel or reschedule up to 24 hours before'
                ],
                horarios: 'Available hours:',
                lunesViernes: 'Monday to Friday: 9:00 AM - 4:00 PM',
                sabados: 'Saturdays: 9:00 AM - 2:00 PM',
                domingos: 'Sundays: Closed'
            }
        },
        
        // Language switcher
        language: {
            es: 'Español',
            en: 'English'
        }
    }
};

// Language management class
class LanguageManager {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || I18N_CONFIG.defaultLanguage;
        this.init();
    }
    
    init() {
        this.updateLanguage(this.currentLanguage);
        this.createLanguageSwitcher();
        this.translatePage();
    }
    
    getStoredLanguage() {
        return localStorage.getItem(I18N_CONFIG.storageKey);
    }
    
    setStoredLanguage(language) {
        localStorage.setItem(I18N_CONFIG.storageKey, language);
    }
    
    updateLanguage(language) {
        if (!I18N_CONFIG.supportedLanguages.includes(language)) {
            language = I18N_CONFIG.fallbackLanguage;
        }
        
        this.currentLanguage = language;
        this.setStoredLanguage(language);
        
        // Update HTML lang attribute
        document.documentElement.lang = language;
        
        // Update meta tags
        this.updateMetaTags();
        
        // Translate page content
        this.translatePage();
        
        console.log(`✅ Language changed to: ${language}`);
    }
    
    updateMetaTags() {
        const lang = this.currentLanguage;
        const translations = TRANSLATIONS[lang];
        
        // Update title
        document.title = `El Secreto de Estancias | ${translations.hero.subtitle}`;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = translations.hero.copy;
        }
        
        // Update Open Graph
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.content = `El Secreto de Estancias | ${translations.hero.subtitle}`;
        }
        
        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.content = translations.hero.copy;
        }
    }
    
    translatePage() {
        const lang = this.currentLanguage;
        const translations = TRANSLATIONS[lang];
        
        // Translate navigation
        this.translateNavigation(translations.nav);
        
        // Translate hero section
        this.translateHero(translations.hero);
        
        // Translate other sections
        this.translateSection('bienvenida', translations.bienvenida);
        this.translateSection('ubicacion', translations.ubicacion);
        this.translateSection('lotes', translations.lotes);
        this.translateSection('caracteristicas', translations.caracteristicas);
        this.translateSection('galeria', translations.galeria);
        this.translateSection('faq', translations.faq);
        this.translateSection('contacto', translations.contacto);
        this.translateSection('blog', translations.blog);
        this.translateSection('reservas', translations.reservas);
        
        // Translate footer
        this.translateFooter(translations.footer);
        
        // Update dynamic content
        this.updateDynamicContent(translations);
    }
    
    translateNavigation(translations) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const key = href.substring(1);
                if (translations[key]) {
                    link.textContent = translations[key];
                }
            }
        });
    }
    
    translateHero(translations) {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) heroTitle.textContent = translations.title;
        
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) heroSubtitle.textContent = translations.subtitle;
        
        const heroCopy = document.querySelector('.hero-copy');
        if (heroCopy) heroCopy.textContent = translations.copy;
        
        const ctaButtons = document.querySelectorAll('.hero-cta .btn');
        if (ctaButtons[0]) ctaButtons[0].textContent = translations.cta.agendar;
        if (ctaButtons[1]) ctaButtons[1].textContent = translations.cta.disponibilidad;
        
        const trustChips = document.querySelectorAll('.trust-chip');
        if (trustChips[0]) trustChips[0].textContent = translations.trust.acceso;
        if (trustChips[1]) trustChips[1].textContent = translations.trust.altitud;
        if (trustChips[2]) trustChips[2].textContent = translations.trust.parcelacion;
    }
    
    translateSection(sectionId, translations) {
        const section = document.querySelector(`#${sectionId}, .${sectionId}`);
        if (!section) return;
        
        // Translate title
        const title = section.querySelector('h2');
        if (title && translations.title) {
            title.textContent = translations.title;
        }
        
        // Translate subtitle
        const subtitle = section.querySelector('.section-subtitle');
        if (subtitle && translations.subtitle) {
            subtitle.textContent = translations.subtitle;
        }
        
        // Translate specific content based on section
        switch (sectionId) {
            case 'bienvenida':
                this.translateBienvenida(section, translations);
                break;
            case 'ubicacion':
                this.translateUbicacion(section, translations);
                break;
            case 'lotes':
                this.translateLotes(section, translations);
                break;
            case 'caracteristicas':
                this.translateCaracteristicas(section, translations);
                break;
            case 'faq':
                this.translateFAQ(section, translations);
                break;
            case 'contacto':
                this.translateContacto(section, translations);
                break;
        }
    }
    
    translateBienvenida(section, translations) {
        const title = section.querySelector('h2');
        if (title) title.textContent = translations.title;
        
        const description = section.querySelector('p');
        if (description) description.textContent = translations.description;
    }
    
    translateUbicacion(section, translations) {
        const infoItems = section.querySelectorAll('.info-item');
        infoItems.forEach(item => {
            const title = item.querySelector('h3');
            const value = item.querySelector('p');
            
            if (title && value) {
                const key = title.textContent.toLowerCase().replace(/\s+/g, '');
                if (translations[key]) {
                    title.textContent = translations[key];
                }
                if (translations[`${key}Value`]) {
                    value.textContent = translations[`${key}Value`];
                }
            }
        });
    }
    
    translateLotes(section, translations) {
        const loteCards = section.querySelectorAll('.lote-card');
        loteCards.forEach((card, index) => {
            const title = card.querySelector('h3');
            const description = card.querySelector('p');
            
            if (title && description) {
                const types = ['terraza', 'ondulado', 'playa'];
                const type = types[index];
                if (translations[type]) {
                    title.textContent = translations[type].title;
                    description.textContent = translations[type].description;
                }
            }
        });
    }
    
    translateCaracteristicas(section, translations) {
        const serviceItems = section.querySelectorAll('.servicio-item');
        serviceItems.forEach(item => {
            const title = item.querySelector('h3');
            if (title) {
                const key = title.textContent.toLowerCase().replace(/\s+/g, '');
                if (translations[key]) {
                    title.textContent = translations[key];
                }
            }
        });
    }
    
    translateFAQ(section, translations) {
        const faqQuestions = section.querySelectorAll('.faq-question');
        faqQuestions.forEach((question, index) => {
            if (translations.questions[index]) {
                question.textContent = translations.questions[index].question;
                
                const answer = question.nextElementSibling;
                if (answer) {
                    answer.textContent = translations.questions[index].answer;
                }
            }
        });
    }
    
    translateContacto(section, translations) {
        const form = section.querySelector('form');
        if (form) {
            const labels = form.querySelectorAll('label');
            labels.forEach(label => {
                const forAttr = label.getAttribute('for');
                if (forAttr && translations.form[forAttr]) {
                    label.textContent = translations.form[forAttr];
                }
            });
            
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = translations.form.enviar;
            }
        }
    }
    
    translateFooter(translations) {
        const slogan = document.querySelector('.footer-logo p');
        if (slogan) slogan.textContent = translations.slogan;
        
        const links = document.querySelectorAll('.footer-links a');
        links.forEach((link, index) => {
            const linkKeys = ['privacidad', 'terminos', 'datos'];
            const key = linkKeys[index];
            if (key && translations.links[key]) {
                link.textContent = translations.links[key];
            }
        });
        
        const copyright = document.querySelector('.footer-copy p');
        if (copyright) copyright.textContent = translations.copyright;
    }
    
    updateDynamicContent(translations) {
        // Update any dynamic content that might be added later
        // This is called after the initial translation
    }
    
    createLanguageSwitcher() {
        const languageSwitcher = document.createElement('div');
        languageSwitcher.className = 'language-switcher';
        languageSwitcher.innerHTML = `
            <button class="lang-btn ${this.currentLanguage === 'es' ? 'active' : ''}" data-lang="es">
                ${TRANSLATIONS.es.language.es}
            </button>
            <button class="lang-btn ${this.currentLanguage === 'en' ? 'active' : ''}" data-lang="en">
                ${TRANSLATIONS.en.language.en}
            </button>
        `;
        
        // Add event listeners
        const langBtns = languageSwitcher.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.updateLanguage(lang);
                
                // Update active state
                langBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        // Insert into navigation
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.appendChild(languageSwitcher);
        }
        
        // Add styles
        this.addLanguageSwitcherStyles();
    }
    
    addLanguageSwitcherStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .language-switcher {
                display: flex;
                gap: 0.5rem;
                margin-left: 2rem;
            }
            
            .lang-btn {
                padding: 0.5rem 1rem;
                border: 2px solid var(--verde-oliva);
                background: transparent;
                color: var(--verde-oscuro);
                border-radius: 20px;
                cursor: pointer;
                transition: var(--transition-medium);
                font-size: 0.9rem;
                font-weight: 500;
            }
            
            .lang-btn:hover,
            .lang-btn.active {
                background: var(--verde-oliva);
                color: white;
            }
            
            @media (max-width: 768px) {
                .language-switcher {
                    margin-left: 1rem;
                }
                
                .lang-btn {
                    padding: 0.4rem 0.8rem;
                    font-size: 0.8rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.languageManager = new LanguageManager();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LanguageManager, TRANSLATIONS, I18N_CONFIG };
} else {
    window.LanguageManager = LanguageManager;
    window.TRANSLATIONS = TRANSLATIONS;
    window.I18N_CONFIG = I18N_CONFIG;
}
