// ========================================
// SISTEMA DE RESERVAS - FUNCIONALIDAD
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el calendario
    initializeCalendar();
    
    // Inicializar el formulario
    initializeForm();
    
    // Configurar eventos
    setupEventListeners();
});

// ========================================
// CALENDARIO INTERACTIVO
// ========================================

function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    
    if (!calendarEl) return;
    
    // Configuración del calendario
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
        },
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana'
        },
        height: 'auto',
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        
        // Eventos del calendario
        events: getAvailableDates(),
        
        // Selección de fecha
        select: function(info) {
            handleDateSelection(info.startStr);
        },
        
        // Click en fecha
        dateClick: function(info) {
            handleDateClick(info.dateStr);
        },
        
        // Renderizado de eventos
        eventDidMount: function(info) {
            styleEvent(info.event, info.el);
        },
        
        // Cambio de vista
        datesSet: function(info) {
            updateCalendarLegend();
        }
    });
    
    // Renderizar el calendario
    calendar.render();
    
    // Guardar referencia global
    window.reservationCalendar = calendar;
}

// Obtener fechas disponibles (simulado - en producción vendría de una API)
function getAvailableDates() {
    const today = new Date();
    const events = [];
    
    // Generar fechas disponibles para los próximos 3 meses
    for (let i = 0; i < 90; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        // Excluir domingos
        if (date.getDay() !== 0) {
            // Simular disponibilidad (70% de fechas disponibles)
            if (Math.random() > 0.3) {
                events.push({
                    title: 'Disponible',
                    start: date.toISOString().split('T')[0],
                    backgroundColor: '#4CAF50',
                    borderColor: '#4CAF50',
                    textColor: 'white',
                    classNames: ['available-slot']
                });
            } else {
                events.push({
                    title: 'Reservado',
                    start: date.toISOString().split('T')[0],
                    backgroundColor: '#f44336',
                    borderColor: '#f44336',
                    textColor: 'white',
                    classNames: ['booked-slot']
                });
            }
        }
    }
    
    return events;
}

// Manejar selección de fecha
function handleDateSelection(dateStr) {
    const selectedDate = new Date(dateStr);
    const today = new Date();
    
    // Verificar que la fecha sea futura
    if (selectedDate < today) {
        showNotification('No puedes seleccionar fechas pasadas', 'error');
        return;
    }
    
    // Verificar que la fecha esté disponible
    if (!isDateAvailable(dateStr)) {
        showNotification('Esta fecha no está disponible', 'error');
        return;
    }
    
    // Actualizar formulario
    updateFormDate(dateStr);
    
    // Resaltar fecha seleccionada
    highlightSelectedDate(dateStr);
    
    showNotification('Fecha seleccionada: ' + formatDate(selectedDate), 'success');
}

// Manejar click en fecha
function handleDateClick(dateStr) {
    handleDateSelection(dateStr);
}

// Verificar disponibilidad de fecha
function isDateAvailable(dateStr) {
    const events = window.reservationCalendar?.getEvents() || [];
    const event = events.find(e => e.startStr === dateStr);
    return event && event.classNames.includes('available-slot');
}

// Actualizar fecha en el formulario
function updateFormDate(dateStr) {
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        fechaInput.value = formatDate(new Date(dateStr));
    }
}

// Resaltar fecha seleccionada
function highlightSelectedDate(dateStr) {
    // Remover selección anterior
    document.querySelectorAll('.fc-day-selected').forEach(el => {
        el.classList.remove('fc-day-selected');
    });
    
    // Agregar selección nueva
    const dayEl = document.querySelector(`[data-date="${dateStr}"]`);
    if (dayEl) {
        dayEl.classList.add('fc-day-selected');
    }
}

// Estilizar eventos del calendario
function styleEvent(event, element) {
    if (event.classNames.includes('available-slot')) {
        element.style.cursor = 'pointer';
        element.addEventListener('click', function() {
            handleDateSelection(event.startStr);
        });
    }
}

// Actualizar leyenda del calendario
function updateCalendarLegend() {
    const availableCount = document.querySelectorAll('.available-slot').length;
    const bookedCount = document.querySelectorAll('.booked-slot').length;
    
    // Aquí podrías actualizar contadores en la leyenda
    console.log(`Disponibles: ${availableCount}, Reservados: ${bookedCount}`);
}

// ========================================
// FORMULARIO DE RESERVA
// ========================================

function initializeForm() {
    const form = document.getElementById('reservaForm');
    if (!form) return;
    
    // Configurar validación
    setupFormValidation(form);
    
    // Configurar envío
    setupFormSubmission(form);
}

// Configurar validación del formulario
function setupFormValidation(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Validación en tiempo real
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Validaciones específicas por campo
    switch (fieldName) {
        case 'nombre':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'El nombre debe tener al menos 2 caracteres';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Ingresa un email válido';
            }
            break;
            
        case 'telefono':
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value) || value.length < 7) {
                isValid = false;
                errorMessage = 'Ingresa un teléfono válido';
            }
            break;
            
        case 'fecha':
            if (!value) {
                isValid = false;
                errorMessage = 'Selecciona una fecha';
            }
            break;
            
        case 'horario':
            if (!value) {
                isValid = false;
                errorMessage = 'Selecciona un horario';
            }
            break;
    }
    
    // Aplicar resultado de validación
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        showFieldSuccess(field);
    }
    
    return isValid;
}

// Mostrar error en campo
function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    
    // Remover mensaje de error anterior
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Agregar nuevo mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

// Mostrar éxito en campo
function showFieldSuccess(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('success');
    formGroup.classList.remove('error');
    
    // Remover mensaje de error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Limpiar error del campo
function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error', 'success');
    
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Configurar envío del formulario
function setupFormSubmission(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitReservation();
        }
    });
}

// Validar formulario completo
function validateForm() {
    const form = document.getElementById('reservaForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Enviar reserva
function submitReservation() {
    const form = document.getElementById('reservaForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Mostrar estado de carga
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').style.display = 'none';
    submitBtn.querySelector('.btn-loading').style.display = 'inline';
    
    // Simular envío (en producción sería una API real)
    setTimeout(() => {
        // Procesar datos del formulario
        const reservationData = {
            fecha: formData.get('fecha'),
            horario: formData.get('horario'),
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            personas: formData.get('personas'),
            interes: formData.get('interes'),
            lotes: Array.from(formData.getAll('lotes')),
            comentarios: formData.get('comentarios')
        };
        
        // Aquí enviarías los datos a tu backend
        console.log('Datos de reserva:', reservationData);
        
        // Simular respuesta exitosa
        showNotification('¡Reserva confirmada! Te enviaremos un email de confirmación.', 'success');
        
        // Resetear formulario
        form.reset();
        document.getElementById('fecha').value = '';
        
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').style.display = 'inline';
        submitBtn.querySelector('.btn-loading').style.display = 'none';
        
        // Limpiar selección del calendario
        document.querySelectorAll('.fc-day-selected').forEach(el => {
            el.classList.remove('fc-day-selected');
        });
        
    }, 2000);
}

// ========================================
// EVENTOS Y UTILIDADES
// ========================================

function setupEventListeners() {
    // Navegación móvil
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Agregar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Configurar cierre automático
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Cierre manual
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Formatear fecha
function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
}

// Agregar estilos CSS para notificaciones
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 1rem;
            padding: 0;
            line-height: 1;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    `;
    document.head.appendChild(style);
}

// Inicializar estilos de notificaciones
addNotificationStyles();
