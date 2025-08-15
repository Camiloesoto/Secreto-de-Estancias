// ========================================
// CONFIGURACIÓN DEL SITIO - FÁCIL DE EDITAR
// ========================================
// El cliente solo necesita cambiar las URLs de las fotos aquí

const SITE_CONFIG = {
    // ========================================
    // FOTOS DEL SITIO - CAMBIAR AQUÍ
    // ========================================
    images: {
        // Hero principal
        hero: "https://via.placeholder.com/1920x1080/6B7C32/FFFFFF?text=Hero+Principal",
        
        // Sección Bienvenida
        bienvenida: "https://via.placeholder.com/800x600/6B7C32/FFFFFF?text=Paisaje+Atardecer",
        
        // Sección Ubicación
        ubicacion: "https://via.placeholder.com/800x600/6B7C32/FFFFFF?text=Camino+Ingreso",
        
        // Sección Entorno
        entorno: "https://via.placeholder.com/800x600/6B7C32/FFFFFF?text=Vegetacion+Cielo",
        
        // Tipos de Lotes
        lotes: {
            terraza: "https://via.placeholder.com/600x400/6B7C32/FFFFFF?text=Lote+Terraza",
            ondulado: "https://via.placeholder.com/600x400/6B7C32/FFFFFF?text=Lote+Ondulado",
            playa: "https://via.placeholder.com/600x400/6B7C32/FFFFFF?text=Lote+Playa"
        },
        
        // Características
        caracteristicas: "https://via.placeholder.com/800x600/6B7C32/FFFFFF?text=Lote+Engramado",
        
        // Libertad de Diseño
        libertad: "https://via.placeholder.com/800x600/6B7C32/FFFFFF?text=Vida+Campestre",
        
        // Mirador
        mirador: "https://via.placeholder.com/1200x600/6B7C32/FFFFFF?text=Panoramica+Mirador",
        
        // Integración Naturaleza
        naturaleza: {
            flores: "https://via.placeholder.com/300x300/6B7C32/FFFFFF?text=Flores",
            aves: "https://via.placeholder.com/300x300/6B7C32/FFFFFF?text=Aves",
            arboles: "https://via.placeholder.com/300x300/6B7C32/FFFFFF?text=Arboles",
            bosque: "https://via.placeholder.com/300x300/6B7C32/FFFFFF?text=Bosque"
        },
        
        // Inspiración Arquitectónica
        arquitectura: "https://via.placeholder.com/800x600/6B7C32/FFFFFF?text=Casa+Mirador",
        
        // Galería (8-12 fotos)
        galeria: [
            "https://via.placeholder.com/400x300/6B7C32/FFFFFF?text=Montanas+1",
            "https://via.placeholder.com/400x300/6B7C32/FFFFFF?text=Quebradas+2",
            "https://via.placeholder.com/400x300/6B7C32/FFFFFF?text=Rocas+3",
            "https://via.placeholder.com/400x300/6B7C32/FFFFFF?text=Arboles+4",
            "https://via.placeholder.com/400x300/6B7C32/FFFFFF?text=Senderos+5",
            "https://via.placeholder.com/400x300/6B7C32/FFFFFF?text=Vistas+6",
            "https://via.placeholder.com/400x300/6B7C32/FFFFFF?text=Atardecer+7",
            "https://via.placeholder.com/400x300/6B7C32/FFFFFF?text=Paisaje+8"
        ],
        
        // Contacto
        contacto: "https://via.placeholder.com/800x600/6B7C32/FFFFFF?text=Atardecer+Montanas"
    },
    
    // ========================================
    // INFORMACIÓN DE CONTACTO - CAMBIAR AQUÍ
    // ========================================
    contacto: {
        telefono: "+57 313 784 8155",
        email: "ventas@elsecretodeestancias.com",
        ubicacion: "San Jerónimo, Antioquia – Vereda Estancias",
        whatsapp: "573137848155"
    },
    
// ... existing code ...
    // ========================================
    // CONFIGURACIÓN DE EMAILJS - CAMBIAR AQUÍ
    // ========================================
    emailjs: {
        serviceId: "service_eqqi926",
        templateId: "template_qy2d0sz", 
        userId: "7lfJOZIAFTVnOvRYs"
    }
// ... existing code ...
};

// Exportar para usar en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
} else {
    window.SITE_CONFIG = SITE_CONFIG;
}
