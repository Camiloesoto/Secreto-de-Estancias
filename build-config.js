// ========================================
// CONFIGURACIÓN DE BUILD Y MINIFICACIÓN
// El Secreto de Estancias
// ========================================

const BUILD_CONFIG = {
    // Configuración de archivos a procesar
    files: {
        css: {
            source: 'styles.css',
            output: 'styles.min.css',
            minify: true,
            autoprefixer: true
        },
        js: {
            source: 'script.js',
            output: 'script.min.js',
            minify: true,
            uglify: true
        },
        html: {
            source: 'index.html',
            output: 'index.min.html',
            minify: true,
            inlineCSS: false,
            inlineJS: false
        }
    },
    
    // Configuración de optimización de imágenes
    images: {
        formats: ['webp', 'jpg'],
        quality: {
            webp: 85,
            jpg: 90
        },
        sizes: [
            { width: 1920, suffix: '-large' },
            { width: 1200, suffix: '-medium' },
            { width: 800, suffix: '-small' },
            { width: 400, suffix: '-thumbnail' }
        ]
    },
    
    // Configuración de cache busting
    cacheBust: {
        enabled: true,
        method: 'hash', // 'hash' o 'timestamp'
        exclude: ['index.html']
    },
    
    // Configuración de Service Worker
    serviceWorker: {
        enabled: true,
        cacheName: 'el-secreto-estancias-v1',
        strategies: {
            css: 'cache-first',
            js: 'cache-first',
            images: 'cache-first',
            fonts: 'cache-first',
            html: 'network-first'
        }
    },
    
    // Configuración de CDN
    cdn: {
        enabled: false,
        domains: [
            'https://cdn.example.com',
            'https://static.example.com'
        ]
    },
    
    // Configuración de análisis de rendimiento
    performance: {
        lighthouse: true,
        webpagetest: true,
        coreWebVitals: true
    }
};

// Configuración para diferentes entornos
const ENVIRONMENTS = {
    development: {
        minify: false,
        sourceMaps: true,
        cacheBust: false
    },
    staging: {
        minify: true,
        sourceMaps: true,
        cacheBust: true
    },
    production: {
        minify: true,
        sourceMaps: false,
        cacheBust: true
    }
};

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BUILD_CONFIG, ENVIRONMENTS };
} else {
    window.BUILD_CONFIG = BUILD_CONFIG;
    window.ENVIRONMENTS = ENVIRONMENTS;
}

// Función para obtener configuración según entorno
function getConfig(environment = 'development') {
    const envConfig = ENVIRONMENTS[environment] || ENVIRONMENTS.development;
    return {
        ...BUILD_CONFIG,
        ...envConfig
    };
}

// Función para validar configuración
function validateConfig() {
    const required = ['files', 'images', 'cacheBust'];
    const missing = required.filter(key => !BUILD_CONFIG[key]);
    
    if (missing.length > 0) {
        console.error('❌ Configuración incompleta. Faltan:', missing);
        return false;
    }
    
    console.log('✅ Configuración válida');
    return true;
}

// Auto-validación
if (typeof window !== 'undefined') {
    validateConfig();
}
