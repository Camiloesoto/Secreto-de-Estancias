// ========================================
// MONITOREO DE RENDIMIENTO
// El Secreto de Estancias
// ========================================

class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.observers = [];
        this.init();
    }
    
    init() {
        this.setupPerformanceObserver();
        this.setupIntersectionObserver();
        this.setupErrorTracking();
        this.setupUserMetrics();
    }
    
    // Configurar observador de rendimiento
    setupPerformanceObserver() {
        if ('PerformanceObserver' in window) {
            // Observar métricas de navegación
            const navigationObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    this.metrics[entry.name] = entry.value;
                    this.logMetric(entry.name, entry.value);
                });
            });
            
            try {
                navigationObserver.observe({ entryTypes: ['navigation'] });
            } catch (e) {
                console.warn('Navigation observer no disponible');
            }
            
            // Observar métricas de pintura
            const paintObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    this.metrics[entry.name] = entry.startTime;
                    this.logMetric(entry.name, Math.round(entry.startTime));
                });
            });
            
            try {
                paintObserver.observe({ entryTypes: ['paint'] });
            } catch (e) {
                console.warn('Paint observer no disponible');
            }
            
            // Observar métricas de recursos
            const resourceObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.initiatorType === 'img' || entry.initiatorType === 'css' || entry.initiatorType === 'script') {
                        this.metrics[`resource_${entry.name}`] = entry.duration;
                    }
                });
            });
            
            try {
                resourceObserver.observe({ entryTypes: ['resource'] });
            } catch (e) {
                console.warn('Resource observer no disponible');
            }
        }
    }
    
    // Configurar observador de intersección para métricas de usuario
    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            // Observar elementos críticos
            const criticalElements = document.querySelectorAll('section, .hero, .lote-card, .galeria-item');
            
            const elementObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const elementName = entry.target.className || entry.target.tagName;
                        this.metrics[`element_visible_${elementName}`] = Date.now();
                    }
                });
            }, { threshold: 0.5 });
            
            criticalElements.forEach(element => elementObserver.observe(element));
        }
    }
    
    // Configurar seguimiento de errores
    setupErrorTracking() {
        window.addEventListener('error', (event) => {
            this.logError('JavaScript Error', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error?.stack
            });
        });
        
        window.addEventListener('unhandledrejection', (event) => {
            this.logError('Unhandled Promise Rejection', {
                reason: event.reason
            });
        });
    }
    
    // Configurar métricas de usuario
    setupUserMetrics() {
        // Métricas de scroll
        let scrollDepth = 0;
        let maxScrollDepth = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            scrollDepth = (scrollTop / docHeight) * 100;
            
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                this.metrics.maxScrollDepth = Math.round(maxScrollDepth);
            }
        });
        
        // Métricas de tiempo en página
        let startTime = Date.now();
        
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Date.now() - startTime;
            this.metrics.timeOnPage = Math.round(timeOnPage / 1000);
            this.sendMetrics();
        });
        
        // Métricas de interacción
        document.addEventListener('click', (event) => {
            const target = event.target;
            const elementType = target.tagName.toLowerCase();
            const elementClass = target.className;
            
            this.metrics[`click_${elementType}_${elementClass}`] = (this.metrics[`click_${elementType}_${elementClass}`] || 0) + 1;
        });
    }
    
    // Obtener métricas de Core Web Vitals
    getCoreWebVitals() {
        return new Promise((resolve) => {
            if ('web-vital' in window) {
                import('https://unpkg.com/web-vitals@3/dist/web-vitals.js')
                    .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                        const vitals = {};
                        
                        getCLS((metric) => { vitals.CLS = metric.value; });
                        getFID((metric) => { vitals.FID = metric.value; });
                        getFCP((metric) => { vitals.FCP = metric.value; });
                        getLCP((metric) => { vitals.LCP = metric.value; });
                        getTTFB((metric) => { vitals.TTFB = metric.value; });
                        
                        setTimeout(() => resolve(vitals), 1000);
                    })
                    .catch(() => resolve(null));
            } else {
                resolve(null);
            }
        });
    }
    
    // Obtener métricas de rendimiento
    getPerformanceMetrics() {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                return {
                    DNS: Math.round(perfData.domainLookupEnd - perfData.domainLookupStart),
                    TCP: Math.round(perfData.connectEnd - perfData.connectStart),
                    TTFB: Math.round(perfData.responseStart - perfData.requestStart),
                    DOMContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                    Load: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                    Total: Math.round(perfData.loadEventEnd)
                };
            }
        }
        return null;
    }
    
    // Obtener métricas de memoria (si está disponible)
    getMemoryMetrics() {
        if ('memory' in performance) {
            return {
                usedJSHeapSize: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                totalJSHeapSize: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
                jsHeapSizeLimit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
            };
        }
        return null;
    }
    
    // Registrar métrica
    logMetric(name, value) {
        this.metrics[name] = value;
        
        // Log en consola para desarrollo
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log(`📊 ${name}: ${value}`);
        }
    }
    
    // Registrar error
    logError(type, details) {
        const error = {
            type,
            details,
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };
        
        this.metrics[`error_${type}`] = error;
        
        // Log en consola para desarrollo
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.error('❌ Error:', error);
        }
    }
    
    // Obtener resumen de métricas
    getMetricsSummary() {
        const summary = {
            timestamp: Date.now(),
            url: window.location.href,
            performance: this.getPerformanceMetrics(),
            memory: this.getMemoryMetrics(),
            user: {
                maxScrollDepth: this.metrics.maxScrollDepth || 0,
                timeOnPage: this.metrics.timeOnPage || 0
            },
            errors: Object.keys(this.metrics).filter(key => key.startsWith('error_')).length
        };
        
        return summary;
    }
    
    // Enviar métricas al servidor (opcional)
    sendMetrics() {
        const summary = this.getMetricsSummary();
        
        // Aquí puedes implementar el envío a tu servidor de analytics
        // Por ejemplo, Google Analytics, tu propio backend, etc.
        
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('📊 Métricas a enviar:', summary);
        }
        
        // Ejemplo de envío a Google Analytics (si está configurado)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'performance_metrics', {
                event_category: 'Performance',
                event_label: 'Site Metrics',
                value: summary.performance?.Total || 0
            });
        }
    }
    
    // Generar reporte de rendimiento
    async generateReport() {
        const coreWebVitals = await this.getCoreWebVitals();
        const summary = this.getMetricsSummary();
        
        const report = {
            ...summary,
            coreWebVitals,
            recommendations: this.generateRecommendations(summary, coreWebVitals)
        };
        
        return report;
    }
    
    // Generar recomendaciones basadas en métricas
    generateRecommendations(summary, coreWebVitals) {
        const recommendations = [];
        
        if (summary.performance?.Total > 3000) {
            recommendations.push('⏱️ El tiempo de carga es lento. Considera optimizar imágenes y recursos.');
        }
        
        if (coreWebVitals?.LCP > 2500) {
            recommendations.push('🖼️ LCP lento. Optimiza la imagen hero y recursos críticos.');
        }
        
        if (coreWebVitals?.CLS > 0.1) {
            recommendations.push('📐 CLS alto. Evita cambios de layout durante la carga.');
        }
        
        if (summary.memory?.usedJSHeapSize > 50) {
            recommendations.push('💾 Uso alto de memoria. Revisa posibles memory leaks.');
        }
        
        if (summary.errors > 0) {
            recommendations.push('❌ Hay errores en la consola. Revisa y corrige.');
        }
        
        return recommendations;
    }
}

// Inicializar monitor de rendimiento
const performanceMonitor = new PerformanceMonitor();

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.PerformanceMonitor = PerformanceMonitor;
    window.performanceMonitor = performanceMonitor;
}

// Auto-generar reporte después de 5 segundos
setTimeout(async () => {
    const report = await performanceMonitor.generateReport();
    
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('📊 Reporte de Rendimiento:', report);
        
        if (report.recommendations.length > 0) {
            console.log('💡 Recomendaciones:', report.recommendations);
        }
    }
}, 5000);
