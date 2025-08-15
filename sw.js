// ========================================
// SERVICE WORKER - CACHE OFFLINE
// El Secreto de Estancias
// ========================================

const CACHE_NAME = 'el-secreto-estancias-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Archivos críticos para cache inmediato
const STATIC_FILES = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/config.js',
    '/sw.js',
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap',
    'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
];

// Estrategias de cache
const CACHE_STRATEGIES = {
    // Cache primero para archivos estáticos
    'cache-first': async (request) => {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        try {
            const networkResponse = await fetch(request);
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        } catch (error) {
            // Si falla la red, devolver fallback
            return new Response('Offline - Contenido no disponible', {
                status: 503,
                statusText: 'Service Unavailable'
            });
        }
    },
    
    // Red primero para HTML
    'network-first': async (request) => {
        try {
            const networkResponse = await fetch(request);
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        } catch (error) {
            const cachedResponse = await caches.match(request);
            if (cachedResponse) {
                return cachedResponse;
            }
            return new Response('Offline - Contenido no disponible', {
                status: 503,
                statusText: 'Service Unavailable'
            });
        }
    },
    
    // Stale-while-revalidate para recursos dinámicos
    'stale-while-revalidate': async (request) => {
        const cache = await caches.open(DYNAMIC_CACHE);
        const cachedResponse = await cache.match(request);
        
        const fetchPromise = fetch(request).then(networkResponse => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
        });
        
        return cachedResponse || fetchPromise;
    }
};

// Instalación del Service Worker
self.addEventListener('install', (event) => {
    console.log('🚀 Service Worker instalando...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('📦 Cacheando archivos estáticos...');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('✅ Service Worker instalado correctamente');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ Error instalando Service Worker:', error);
            })
    );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
    console.log('🔄 Service Worker activando...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('🗑️ Eliminando cache antiguo:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ Service Worker activado');
                return self.clients.claim();
            })
    );
});

// Interceptar peticiones
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Solo procesar peticiones GET
    if (request.method !== 'GET') {
        return;
    }
    
    // Estrategia según tipo de archivo
    if (request.destination === 'document') {
        // HTML - Network first
        event.respondWith(CACHE_STRATEGIES['network-first'](request));
    } else if (request.destination === 'style' || request.destination === 'script') {
        // CSS y JS - Cache first
        event.respondWith(CACHE_STRATEGIES['cache-first'](request));
    } else if (request.destination === 'image') {
        // Imágenes - Cache first
        event.respondWith(CACHE_STRATEGIES['cache-first'](request));
    } else if (request.destination === 'font') {
        // Fuentes - Cache first
        event.respondWith(CACHE_STRATEGIES['cache-first'](request));
    } else {
        // Otros recursos - Stale while revalidate
        event.respondWith(CACHE_STRATEGIES['stale-while-revalidate'](request));
    }
});

// Sincronización en segundo plano
self.addEventListener('sync', (event) => {
    console.log('🔄 Sincronización en segundo plano:', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

// Función de sincronización en segundo plano
async function doBackgroundSync() {
    try {
        // Aquí puedes implementar sincronización de datos
        // Por ejemplo, enviar formularios pendientes
        console.log('🔄 Sincronizando datos en segundo plano...');
        
        // Simular sincronización
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('✅ Sincronización completada');
    } catch (error) {
        console.error('❌ Error en sincronización:', error);
    }
}

// Manejo de mensajes
self.addEventListener('message', (event) => {
    console.log('📨 Mensaje recibido en Service Worker:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({
            version: CACHE_NAME,
            timestamp: Date.now()
        });
    }
});

// Limpieza automática de cache
async function cleanOldCaches() {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
        name !== STATIC_CACHE && name !== DYNAMIC_CACHE
    );
    
    await Promise.all(
        oldCaches.map(name => caches.delete(name))
    );
    
    console.log('🧹 Cache limpio completado');
}

// Ejecutar limpieza cada 24 horas
setInterval(cleanOldCaches, 24 * 60 * 60 * 1000);
