// Google Analytics Configuration
// Replace GA_MEASUREMENT_ID with your actual Google Analytics ID

const GA_MEASUREMENT_ID = 'GA_MEASUREMENT_ID'; // Replace with your ID

// Google Analytics 4 (GA4) - Recommended
function initGA4() {
    if (typeof gtag !== 'undefined') {
        gtag('config', GA_MEASUREMENT_ID, {
            page_title: document.title,
            page_location: window.location.href,
            custom_map: {
                'custom_parameter_1': 'lotes_campestres',
                'custom_parameter_2': 'san_jeronimo'
            }
        });
        
        // Track form submissions
        document.addEventListener('submit', function(e) {
            if (e.target.classList.contains('contact-form')) {
                gtag('event', 'form_submit', {
                    event_category: 'engagement',
                    event_label: 'contact_form'
                });
            }
        });
        
        // Track phone clicks
        document.addEventListener('click', function(e) {
            if (e.target.closest('a[href^="tel:"]')) {
                gtag('event', 'phone_click', {
                    event_category: 'engagement',
                    event_label: 'phone_contact'
                });
            }
        });
        
        // Track WhatsApp clicks
        document.addEventListener('click', function(e) {
            if (e.target.closest('a[href*="wa.me"]')) {
                gtag('event', 'whatsapp_click', {
                    event_category: 'engagement',
                    event_label: 'whatsapp_contact'
                });
            }
        });
        
        // Track map clicks
        document.addEventListener('click', function(e) {
            if (e.target.closest('a[href*="maps.google"]')) {
                gtag('event', 'map_click', {
                    event_category: 'engagement',
                    event_label: 'google_maps'
                });
            }
        });
        
        console.log('✅ Google Analytics 4 inicializado');
    } else {
        console.warn('⚠️ Google Analytics no cargado');
    }
}

// Universal Analytics (UA) - Legacy
function initUA() {
    if (typeof ga !== 'undefined') {
        ga('create', GA_MEASUREMENT_ID, 'auto');
        ga('send', 'pageview');
        console.log('✅ Universal Analytics inicializado');
    } else {
        console.warn('⚠️ Universal Analytics no cargado');
    }
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Try GA4 first, then fallback to UA
    if (typeof gtag !== 'undefined') {
        initGA4();
    } else if (typeof ga !== 'undefined') {
        initUA();
    } else {
        console.warn('⚠️ No analytics service detected');
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initGA4, initUA };
} else {
    window.analytics = { initGA4, initUA };
}
