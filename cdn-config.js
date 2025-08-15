// ========================================
// CONFIGURACIÓN DE CDN Y DISTRIBUCIÓN
// El Secreto de Estancias
// ========================================

const CDN_CONFIG = {
    // Configuración principal del CDN
    enabled: false, // Cambiar a true cuando tengas CDN
    primary: {
        domain: 'https://cdn.elsecretoestancias.com',
        fallback: 'https://static.elsecretoestancias.com',
        ssl: true
    },
    
    // Configuración de imágenes
    images: {
        enabled: true,
        formats: ['webp', 'jpg', 'png'],
        quality: {
            webp: 85,
            jpg: 90,
            png: 90
        },
        sizes: [
            { width: 1920, suffix: '-large' },
            { width: 1200, suffix: '-medium' },
            { width: 800, suffix: '-small' },
            { width: 400, suffix: '-thumbnail' }
        ],
        lazyLoad: true,
        placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNkI3QzMyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI0ZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBDYXJnYW5kbzwvdGV4dD48L3N2Zz4='
    },
    
    // Configuración de fuentes
    fonts: {
        enabled: true,
        preload: true,
        display: 'swap',
        fallback: 'Arial, sans-serif'
    },
    
    // Configuración de CSS y JS
    assets: {
        css: {
            minify: true,
            combine: false,
            inline: false
        },
        js: {
            minify: true,
            combine: false,
            defer: true
        }
    },
    
    // Configuración de cache
    cache: {
        browser: {
            css: '1 year',
            js: '1 year',
            images: '1 year',
            fonts: '1 year'
        },
        cdn: {
            css: '1 month',
            js: '1 month',
            images: '6 months',
            fonts: '1 year'
        }
    },
    
    // Configuración de compresión
    compression: {
        gzip: true,
        brotli: true,
        deflate: true
    },
    
    // Configuración de monitoreo
    monitoring: {
        enabled: true,
        realUserMonitoring: true,
        performanceMetrics: true,
        errorTracking: true
    }
};

// Función para obtener URL del CDN
function getCDNUrl(path, options = {}) {
    if (!CDN_CONFIG.enabled) {
        return path; // Devolver ruta original si CDN está deshabilitado
    }
    
    const { format, size, quality } = options;
    let cdnPath = path;
    
    // Agregar parámetros de optimización si es una imagen
    if (CDN_CONFIG.images.enabled && isImage(path)) {
        const params = new URLSearchParams();
        
        if (format) {
            params.append('f', format);
        }
        
        if (size) {
            params.append('w', size);
        }
        
        if (quality) {
            params.append('q', quality);
        }
        
        if (params.toString()) {
            cdnPath += '?' + params.toString();
        }
    }
    
    return CDN_CONFIG.primary.domain + cdnPath;
}

// Función para verificar si es una imagen
function isImage(path) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    return imageExtensions.some(ext => path.toLowerCase().includes(ext));
}

// Función para precargar recursos críticos
function preloadCriticalResources() {
    if (!CDN_CONFIG.enabled) return;
    
    const criticalResources = [
        '/styles.css',
        '/script.js',
        '/config.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = getCDNUrl(resource);
        
        if (resource.endsWith('.css')) {
            link.as = 'style';
        } else if (resource.endsWith('.js')) {
            link.as = 'script';
        }
        
        document.head.appendChild(link);
    });
}

// Función para optimizar imágenes
function optimizeImages() {
    if (!CDN_CONFIG.images.enabled) return;
    
    const images = document.querySelectorAll('img[data-src], .placeholder-image');
    
    images.forEach(img => {
        if (img.dataset.src) {
            // Optimizar imagen con CDN
            const optimizedSrc = getCDNUrl(img.dataset.src, {
                format: 'webp',
                quality: CDN_CONFIG.images.quality.webp
            });
            
            img.dataset.src = optimizedSrc;
        }
    });
}

// Función para verificar estado del CDN
async function checkCDNStatus() {
    if (!CDN_CONFIG.enabled) return false;
    
    try {
        const response = await fetch(CDN_CONFIG.primary.domain + '/health', {
            method: 'HEAD',
            mode: 'no-cors'
        });
        return true;
    } catch (error) {
        console.warn('⚠️ CDN no disponible, usando recursos locales');
        return false;
    }
}

// Función para cambiar a fallback si CDN falla
function switchToFallback() {
    if (CDN_CONFIG.primary.fallback) {
        CDN_CONFIG.primary.domain = CDN_CONFIG.primary.fallback;
        console.log('🔄 Cambiando a CDN de respaldo');
    }
}

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CDN_CONFIG;
} else {
    window.CDN_CONFIG = CDN_CONFIG;
    window.getCDNUrl = getCDNUrl;
    window.optimizeImages = optimizeImages;
    window.checkCDNStatus = checkCDNStatus;
}

// Auto-inicialización
if (typeof window !== 'undefined') {
    // Verificar estado del CDN al cargar
    window.addEventListener('load', () => {
        checkCDNStatus().then(isAvailable => {
            if (!isAvailable) {
                switchToFallback();
            }
        });
        
        // Optimizar imágenes si CDN está disponible
        if (CDN_CONFIG.enabled) {
            optimizeImages();
            preloadCriticalResources();
        }
    });
}
