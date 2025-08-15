// ========================================
// CONFIGURACIÓN DEL SERVICE WORKER
// El Secreto de Estancias
// ========================================

const SW_CONFIG = {
    // Configuración principal
    version: 'v1.0.0',
    cacheName: 'el-secreto-estancias-v1',
    
    // Archivos críticos para cache inmediato
    staticFiles: [
        '/',
        '/index.html',
        '/styles.css',
        '/script.js',
        '/config.js',
        '/sw.js',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap',
        'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
    ],
    
    // Estrategias de cache por tipo de archivo
    strategies: {
        document: 'network-first',    // HTML - Red primero
        style: 'cache-first',         // CSS - Cache primero
        script: 'cache-first',        // JavaScript - Cache primero
        image: 'cache-first',         // Imágenes - Cache primero
        font: 'cache-first',          // Fuentes - Cache primero
        default: 'stale-while-revalidate' // Otros - Stale while revalidate
    },
    
    // Configuración de cache
    cache: {
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
        maxEntries: 100,              // Máximo 100 entradas
        cleanupInterval: 60 * 60 * 1000 // Limpiar cada hora
    },
    
    // Configuración de sincronización
    sync: {
        enabled: true,
        tags: ['background-sync', 'form-sync'],
        maxRetries: 3
    },
    
    // Configuración de notificaciones
    notifications: {
        enabled: true,
        title: 'El Secreto de Estancias',
        icon: '/favicon.ico',
        badge: '/favicon.ico'
    },
    
    // Configuración de offline
    offline: {
        fallbackPage: '/offline.html',
        showOfflineIndicator: true
    }
};

// Función para obtener estrategia según tipo de archivo
function getStrategy(request) {
    const url = new URL(request.url);
    const extension = url.pathname.split('.').pop()?.toLowerCase();
    
    if (request.destination === 'document' || extension === 'html') {
        return SW_CONFIG.strategies.document;
    } else if (request.destination === 'style' || extension === 'css') {
        return SW_CONFIG.strategies.style;
    } else if (request.destination === 'script' || extension === 'js') {
        return SW_CONFIG.strategies.script;
    } else if (request.destination === 'image' || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
        return SW_CONFIG.strategies.image;
    } else if (request.destination === 'font' || ['woff', 'woff2', 'ttf', 'otf'].includes(extension)) {
        return SW_CONFIG.strategies.font;
    }
    
    return SW_CONFIG.strategies.default;
}

// Función para verificar si el archivo debe ser cacheado
function shouldCache(request) {
    const url = new URL(request.url);
    
    // No cachear peticiones POST, PUT, DELETE
    if (['POST', 'PUT', 'DELETE'].includes(request.method)) {
        return false;
    }
    
    // No cachear peticiones a APIs externas
    if (url.hostname !== window.location.hostname) {
        return false;
    }
    
    // No cachear archivos de configuración dinámica
    if (url.pathname.includes('config') || url.pathname.includes('api')) {
        return false;
    }
    
    return true;
}

// Función para limpiar cache antiguo
async function cleanOldCaches() {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
        name !== SW_CONFIG.cacheName && 
        name !== 'static-v1' && 
        name !== 'dynamic-v1'
    );
    
    await Promise.all(
        oldCaches.map(name => caches.delete(name))
    );
    
    console.log('🧹 Cache limpio completado');
}

// Función para mostrar estado del Service Worker
function showSWStatus(status) {
    if (SW_CONFIG.notifications.enabled) {
        const notification = new Notification(SW_CONFIG.notifications.title, {
            body: status,
            icon: SW_CONFIG.notifications.icon,
            badge: SW_CONFIG.notifications.badge
        });
        
        setTimeout(() => notification.close(), 3000);
    }
}

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SW_CONFIG;
} else {
    window.SW_CONFIG = SW_CONFIG;
    window.getStrategy = getStrategy;
    window.shouldCache = shouldCache;
    window.cleanOldCaches = cleanOldCaches;
    window.showSWStatus = showSWStatus;
}

// Auto-inicialización
if (typeof window !== 'undefined') {
    // Verificar si el Service Worker está registrado
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            console.log('✅ Service Worker listo:', registration.active?.state);
        });
    }
    
    // Mostrar estado en consola
    console.log('🔧 Service Worker Config cargado:', SW_CONFIG.version);
}
