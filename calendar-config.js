// Calendar Configuration for Visit Scheduling
// Integrate with your preferred calendar service

const CALENDAR_CONFIG = {
    // Google Calendar
    google: {
        enabled: false,
        calendarId: 'YOUR_GOOGLE_CALENDAR_ID',
        apiKey: 'YOUR_GOOGLE_API_KEY',
        clientId: 'YOUR_GOOGLE_CLIENT_ID'
    },
    
    // Calendly (Recommended for simplicity)
    calendly: {
        enabled: false,
        url: 'https://calendly.com/YOUR_CALENDLY_USERNAME'
    },
    
    // Custom WhatsApp Scheduling
    whatsapp: {
        enabled: true,
        phone: '573137848155',
        message: 'Hola! Me gustaría agendar una visita para conocer los lotes en El Secreto de Estancias.',
        buttonText: '📅 Agendar visita',
        availableHours: {
            monday: '9:00 AM - 6:00 PM',
            tuesday: '9:00 AM - 6:00 PM',
            wednesday: '9:00 AM - 6:00 PM',
            thursday: '9:00 AM - 6:00 PM',
            friday: '9:00 AM - 6:00 PM',
            saturday: '9:00 AM - 2:00 PM',
            sunday: 'Cerrado'
        }
    }
};

// Initialize calendar functionality
function initCalendar() {
    if (CALENDAR_CONFIG.whatsapp.enabled) {
        createWhatsAppCalendar();
    }
    
    if (CALENDAR_CONFIG.calendly.enabled) {
        loadCalendly();
    }
    
    if (CALENDAR_CONFIG.google.enabled) {
        loadGoogleCalendar();
    }
}

// Create WhatsApp Calendar Button
function createWhatsAppCalendar() {
    const calendarButton = document.createElement('div');
    calendarButton.className = 'whatsapp-calendar-button';
    calendarButton.innerHTML = `
        <div class="calendar-icon">📅</div>
        <div class="calendar-text">${CALENDAR_CONFIG.whatsapp.buttonText}</div>
    `;
    
    calendarButton.addEventListener('click', function() {
        const url = `https://wa.me/${CALENDAR_CONFIG.whatsapp.phone}?text=${encodeURIComponent(CALENDAR_CONFIG.whatsapp.message)}`;
        window.open(url, '_blank');
    });
    
    document.body.appendChild(calendarButton);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-calendar-button {
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: #25D366;
            color: white;
            padding: 15px 20px;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
        }
        
        .whatsapp-calendar-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(37, 211, 102, 0.4);
        }
        
        .calendar-icon {
            font-size: 20px;
        }
        
        .calendar-text {
            font-size: 14px;
        }
        
        @media (max-width: 768px) {
            .whatsapp-calendar-button {
                padding: 12px 16px;
                bottom: 70px;
            }
            
            .calendar-text {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// Load Calendly
function loadCalendly() {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
    
    // Create Calendly button
    const calendlyButton = document.createElement('div');
    calendlyButton.className = 'calendly-button';
    calendlyButton.innerHTML = `
        <div class="calendar-icon">📅</div>
        <div class="calendar-text">Agendar visita</div>
    `;
    
    calendlyButton.addEventListener('click', function() {
        Calendly.initPopupWidget({
            url: CALENDAR_CONFIG.calendly.url
        });
    });
    
    document.body.appendChild(calendlyButton);
}

// Load Google Calendar
function loadGoogleCalendar() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = function() {
        gapi.load('client:auth2', function() {
            gapi.client.init({
                apiKey: CALENDAR_CONFIG.google.apiKey,
                clientId: CALENDAR_CONFIG.google.clientId,
                scope: 'https://www.googleapis.com/auth/calendar.events'
            });
        });
    };
    document.head.appendChild(script);
}

// Show available hours
function showAvailableHours() {
    const hours = CALENDAR_CONFIG.whatsapp.availableHours;
    let hoursHtml = '<div class="available-hours"><h4>Horarios disponibles:</h4><ul>';
    
    Object.entries(hours).forEach(([day, time]) => {
        const dayName = day.charAt(0).toUpperCase() + day.slice(1);
        hoursHtml += `<li><strong>${dayName}:</strong> ${time}</li>`;
    });
    
    hoursHtml += '</ul></div>';
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .available-hours {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            margin: 20px 0;
        }
        
        .available-hours h4 {
            color: var(--verde-oscuro);
            margin-bottom: 15px;
        }
        
        .available-hours ul {
            list-style: none;
            padding: 0;
        }
        
        .available-hours li {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        
        .available-hours li:last-child {
            border-bottom: none;
        }
    `;
    document.head.appendChild(style);
    
    return hoursHtml;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCalendar);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CALENDAR_CONFIG, initCalendar, showAvailableHours };
} else {
    window.CALENDAR_CONFIG = CALENDAR_CONFIG;
    window.initCalendar = initCalendar;
    window.showAvailableHours = showAvailableHours;
}
