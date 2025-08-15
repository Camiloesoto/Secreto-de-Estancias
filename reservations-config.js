// Reservations Configuration for Online Booking System
// Simple reservation system using localStorage (can be upgraded to a real backend)

const RESERVATIONS_CONFIG = {
    enabled: true,
    title: 'Reservas Online - El Secreto de Estancias',
    description: 'Reserva tu visita y asegura tu lote preferido',
    maxReservationsPerDay: 4,
    reservationDuration: 60, // minutes
    availableTimeSlots: [
        '9:00 AM',
        '10:30 AM', 
        '2:00 PM',
        '3:30 PM'
    ],
    availableDays: [
        'monday',
        'tuesday', 
        'wednesday',
        'thursday',
        'friday',
        'saturday'
    ],
    lotTypes: [
        'Terraza',
        'Ondulado',
        'Playa'
    ],
    lotSizes: [
        '1000 m²',
        '1500 m²',
        '2000 m²',
        '2500 m²',
        '3000 m²'
    ]
};

// Sample reservations (replace with real data)
const SAMPLE_RESERVATIONS = [
    {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan@example.com',
        phone: '+57 300 123 4567',
        date: '2024-01-20',
        time: '10:30 AM',
        lotType: 'Terraza',
        lotSize: '2000 m²',
        status: 'confirmed',
        createdAt: '2024-01-15T10:00:00Z'
    }
];

// Reservations management
class ReservationsManager {
    constructor() {
        this.reservations = this.loadReservations();
        this.currentDate = new Date();
    }
    
    loadReservations() {
        const savedReservations = localStorage.getItem('estancias_reservations');
        if (savedReservations) {
            return JSON.parse(savedReservations);
        } else {
            localStorage.setItem('estancias_reservations', JSON.stringify(SAMPLE_RESERVATIONS));
            return SAMPLE_RESERVATIONS;
        }
    }
    
    saveReservations() {
        localStorage.setItem('estancias_reservations', JSON.stringify(this.reservations));
    }
    
    addReservation(reservation) {
        reservation.id = Date.now();
        reservation.createdAt = new Date().toISOString();
        reservation.status = 'pending';
        
        this.reservations.push(reservation);
        this.saveReservations();
        
        // Send confirmation email
        this.sendConfirmationEmail(reservation);
        
        return reservation;
    }
    
    getReservation(id) {
        return this.reservations.find(res => res.id == id);
    }
    
    updateReservation(id, updates) {
        const index = this.reservations.findIndex(res => res.id == id);
        if (index !== -1) {
            this.reservations[index] = { ...this.reservations[index], ...updates };
            this.saveReservations();
            return this.reservations[index];
        }
        return null;
    }
    
    cancelReservation(id) {
        const reservation = this.getReservation(id);
        if (reservation) {
            reservation.status = 'cancelled';
            this.saveReservations();
            return reservation;
        }
        return null;
    }
    
    getReservationsByDate(date) {
        return this.reservations.filter(res => res.date === date);
    }
    
    getAvailableTimeSlots(date) {
        const reservations = this.getReservationsByDate(date);
        const reservedTimes = reservations.map(res => res.time);
        
        return RESERVATIONS_CONFIG.availableTimeSlots.filter(time => 
            !reservedTimes.includes(time)
        );
    }
    
    isDateAvailable(date) {
        const reservations = this.getReservationsByDate(date);
        return reservations.length < RESERVATIONS_CONFIG.maxReservationsPerDay;
    }
    
    getNextAvailableDate() {
        let currentDate = new Date();
        let attempts = 0;
        
        while (attempts < 30) { // Look ahead 30 days
            const dateString = currentDate.toISOString().split('T')[0];
            
            if (this.isDateAvailable(dateString)) {
                return dateString;
            }
            
            currentDate.setDate(currentDate.getDate() + 1);
            attempts++;
        }
        
        return null;
    }
    
    sendConfirmationEmail(reservation) {
        // This would integrate with your email service
        console.log('📧 Confirmation email sent for reservation:', reservation.id);
        
        // For now, just show a toast notification
        if (typeof showToast === 'function') {
            showToast('Reserva confirmada. Revisa tu email para más detalles.', 'success');
        }
    }
}

// Initialize reservations system
function initReservations() {
    if (!RESERVATIONS_CONFIG.enabled) return;
    
    const reservationsManager = new ReservationsManager();
    window.reservationsManager = reservationsManager;
    
    // Create reservations section if it doesn't exist
    createReservationsSection();
    
    console.log('✅ Sistema de reservas inicializado');
}

// Create reservations section
function createReservationsSection() {
    const reservationsSection = document.createElement('section');
    reservationsSection.id = 'reservas';
    reservationsSection.className = 'reservas';
    
    reservationsSection.innerHTML = `
        <div class="container">
            <h2>Reserva tu visita</h2>
            <p class="section-subtitle">Asegura tu lote preferido agendando una visita</p>
            
            <div class="reservations-content">
                <div class="reservation-form-container">
                    <form class="reservation-form" id="reservation-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="reservation-name">Nombre completo *</label>
                                <input type="text" id="reservation-name" name="name" required>
                            </div>
                            <div class="form-group">
                                <label for="reservation-email">Email *</label>
                                <input type="email" id="reservation-email" name="email" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="reservation-phone">Teléfono *</label>
                                <input type="tel" id="reservation-phone" name="phone" required>
                            </div>
                            <div class="form-group">
                                <label for="reservation-date">Fecha preferida *</label>
                                <input type="date" id="reservation-date" name="date" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="reservation-time">Hora preferida *</label>
                                <select id="reservation-time" name="time" required>
                                    <option value="">Selecciona una hora</option>
                                    ${RESERVATIONS_CONFIG.availableTimeSlots.map(time => 
                                        `<option value="${time}">${time}</option>`
                                    ).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="reservation-lot-type">Tipo de lote de interés</label>
                                <select id="reservation-lot-type" name="lotType">
                                    <option value="">Selecciona un tipo</option>
                                    ${RESERVATIONS_CONFIG.lotTypes.map(type => 
                                        `<option value="${type}">${type}</option>`
                                    ).join('')}
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="reservation-message">Mensaje adicional</label>
                            <textarea id="reservation-message" name="message" rows="4" placeholder="Cuéntanos más sobre tus preferencias..."></textarea>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">Reservar visita</button>
                    </form>
                </div>
                
                <div class="reservation-info">
                    <h3>Información importante</h3>
                    <ul>
                        <li>Las visitas tienen una duración aproximada de 1 hora</li>
                        <li>Máximo 4 visitas por día para garantizar atención personalizada</li>
                        <li>Te enviaremos una confirmación por email</li>
                        <li>Puedes cancelar o reprogramar hasta 24 horas antes</li>
                    </ul>
                    
                    <div class="available-hours">
                        <h4>Horarios disponibles:</h4>
                        <ul>
                            <li><strong>Lunes a Viernes:</strong> 9:00 AM - 4:00 PM</li>
                            <li><strong>Sábados:</strong> 9:00 AM - 2:00 PM</li>
                            <li><strong>Domingos:</strong> Cerrado</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insert before blog section
    const blogSection = document.querySelector('#blog');
    if (blogSection) {
        blogSection.parentNode.insertBefore(reservationsSection, blogSection);
    } else {
        // If no blog section, insert before footer
        const footer = document.querySelector('.footer');
        footer.parentNode.insertBefore(reservationsSection, footer);
    }
    
    // Add event listeners
    addReservationEventListeners();
    
    // Set minimum date to today
    const dateInput = document.getElementById('reservation-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }
}

// Add reservation event listeners
function addReservationEventListeners() {
    const form = document.getElementById('reservation-form');
    const dateInput = document.getElementById('reservation-date');
    const timeSelect = document.getElementById('reservation-time');
    
    if (form) {
        form.addEventListener('submit', handleReservationSubmit);
    }
    
    if (dateInput && timeSelect) {
        dateInput.addEventListener('change', function() {
            updateAvailableTimeSlots(this.value);
        });
    }
}

// Handle reservation form submission
function handleReservationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const reservationData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        date: formData.get('date'),
        time: formData.get('time'),
        lotType: formData.get('lotType'),
        message: formData.get('message')
    };
    
    // Validate date availability
    const reservationsManager = window.reservationsManager;
    if (!reservationsManager.isDateAvailable(reservationData.date)) {
        showToast('Esta fecha no está disponible. Por favor selecciona otra.', 'error');
        return;
    }
    
    // Validate time availability
    const availableTimes = reservationsManager.getAvailableTimeSlots(reservationData.date);
    if (!availableTimes.includes(reservationData.time)) {
        showToast('Esta hora no está disponible. Por favor selecciona otra.', 'error');
        return;
    }
    
    // Create reservation
    try {
        const reservation = reservationsManager.addReservation(reservationData);
        
        // Show success message
        showToast('¡Reserva confirmada! Te enviaremos un email con los detalles.', 'success');
        
        // Reset form
        e.target.reset();
        
        // Update time slots
        updateAvailableTimeSlots(reservationData.date);
        
        console.log('✅ Reserva creada:', reservation);
        
    } catch (error) {
        showToast('Error al crear la reserva. Por favor intenta nuevamente.', 'error');
        console.error('❌ Error creating reservation:', error);
    }
}

// Update available time slots based on selected date
function updateAvailableTimeSlots(selectedDate) {
    const reservationsManager = window.reservationsManager;
    const availableTimes = reservationsManager.getAvailableTimeSlots(selectedDate);
    const timeSelect = document.getElementById('reservation-time');
    
    if (timeSelect) {
        // Clear current options
        timeSelect.innerHTML = '<option value="">Selecciona una hora</option>';
        
        // Add available times
        availableTimes.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        });
        
        // If no times available, show message
        if (availableTimes.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No hay horarios disponibles';
            option.disabled = true;
            timeSelect.appendChild(option);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initReservations);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ReservationsManager, initReservations };
} else {
    window.ReservationsManager = ReservationsManager;
    window.initReservations = initReservations;
}
