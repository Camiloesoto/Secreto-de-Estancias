// CRM Configuration for Customer Relationship Management
// Simple CRM system using localStorage (can be upgraded to a real CRM)

const CRM_CONFIG = {
    enabled: true,
    title: 'CRM - El Secreto de Estancias',
    description: 'Sistema de gestión de clientes y leads',
    storageKey: 'estancias_crm_data',
    leadStatuses: [
        'Nuevo',
        'Contactado',
        'Interesado',
        'Visitó',
        'Cotizando',
        'Vendido',
        'Perdido'
    ],
    leadSources: [
        'Sitio Web',
        'WhatsApp',
        'Teléfono',
        'Referido',
        'Redes Sociales',
        'Búsqueda Google',
        'Otro'
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

// Sample CRM data
const SAMPLE_CRM_DATA = {
    leads: [
        {
            id: 1,
            name: 'Juan Pérez',
            email: 'juan@example.com',
            phone: '+57 300 123 4567',
            source: 'Sitio Web',
            status: 'Interesado',
            lotType: 'Terraza',
            lotSize: '2000 m²',
            budget: '150000000',
            notes: 'Cliente interesado en lotes de terraza. Prefiere visitar en fin de semana.',
            createdAt: '2024-01-15T10:00:00Z',
            lastContact: '2024-01-18T14:30:00Z',
            nextFollowUp: '2024-01-25T10:00:00Z',
            tags: ['interesado', 'terraza', 'fin-de-semana']
        },
        {
            id: 2,
            name: 'María González',
            email: 'maria@example.com',
            phone: '+57 310 987 6543',
            source: 'WhatsApp',
            status: 'Visitó',
            lotType: 'Ondulado',
            lotSize: '2500 m²',
            budget: '200000000',
            notes: 'Cliente visitó el proyecto. Muy satisfecha con la ubicación y vistas.',
            createdAt: '2024-01-10T09:00:00Z',
            lastContact: '2024-01-20T16:00:00Z',
            nextFollowUp: '2024-01-27T10:00:00Z',
            tags: ['visitó', 'ondulado', 'satisfecha']
        }
    ],
    activities: [
        {
            id: 1,
            leadId: 1,
            type: 'Llamada',
            description: 'Llamada de seguimiento. Cliente confirmó interés en visitar.',
            date: '2024-01-18T14:30:00Z',
            nextAction: 'Agendar visita para fin de semana'
        },
        {
            id: 2,
            leadId: 2,
            type: 'Visita',
            description: 'Visita al proyecto. Cliente recorrió lotes ondulados.',
            date: '2024-01-20T16:00:00Z',
            nextAction: 'Enviar cotización detallada'
        }
    ]
};

// CRM management class
class CRMManager {
    constructor() {
        this.data = this.loadData();
        this.currentLead = null;
        this.init();
    }
    
    loadData() {
        const savedData = localStorage.getItem(CRM_CONFIG.storageKey);
        if (savedData) {
            return JSON.parse(savedData);
        } else {
            localStorage.setItem(CRM_CONFIG.storageKey, JSON.stringify(SAMPLE_CRM_DATA));
            return SAMPLE_CRM_DATA;
        }
    }
    
    saveData() {
        localStorage.setItem(CRM_CONFIG.storageKey, JSON.stringify(this.data));
    }
    
    // Lead management
    addLead(leadData) {
        const lead = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            lastContact: new Date().toISOString(),
            status: 'Nuevo',
            tags: [],
            ...leadData
        };
        
        this.data.leads.push(lead);
        this.saveData();
        
        // Add activity
        this.addActivity({
            leadId: lead.id,
            type: 'Lead creado',
            description: `Nuevo lead creado desde ${lead.source}`,
            date: new Date().toISOString()
        });
        
        return lead;
    }
    
    updateLead(id, updates) {
        const index = this.data.leads.findIndex(lead => lead.id == id);
        if (index !== -1) {
            this.data.leads[index] = { 
                ...this.data.leads[index], 
                ...updates,
                lastContact: new Date().toISOString()
            };
            this.saveData();
            return this.data.leads[index];
        }
        return null;
    }
    
    deleteLead(id) {
        const index = this.data.leads.findIndex(lead => lead.id == id);
        if (index !== -1) {
            this.data.leads.splice(index, 1);
            this.saveData();
            return true;
        }
        return false;
    }
    
    getLead(id) {
        return this.data.leads.find(lead => lead.id == id);
    }
    
    getAllLeads() {
        return this.data.leads.sort((a, b) => new Date(b.lastContact) - new Date(a.lastContact));
    }
    
    getLeadsByStatus(status) {
        return this.data.leads.filter(lead => lead.status === status);
    }
    
    getLeadsBySource(source) {
        return this.data.leads.filter(lead => lead.source === source);
    }
    
    searchLeads(query) {
        const searchTerm = query.toLowerCase();
        return this.data.leads.filter(lead => 
            lead.name.toLowerCase().includes(searchTerm) ||
            lead.email.toLowerCase().includes(searchTerm) ||
            lead.phone.includes(searchTerm) ||
            lead.notes.toLowerCase().includes(searchTerm)
        );
    }
    
    // Activity management
    addActivity(activityData) {
        const activity = {
            id: Date.now(),
            date: new Date().toISOString(),
            ...activityData
        };
        
        this.data.activities.push(activity);
        this.saveData();
        return activity;
    }
    
    getActivitiesByLead(leadId) {
        return this.data.activities
            .filter(activity => activity.leadId == leadId)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // Analytics
    getAnalytics() {
        const totalLeads = this.data.leads.length;
        const leadsByStatus = {};
        const leadsBySource = {};
        const leadsByMonth = {};
        
        this.data.leads.forEach(lead => {
            // By status
            leadsByStatus[lead.status] = (leadsByStatus[lead.status] || 0) + 1;
            
            // By source
            leadsBySource[lead.source] = (leadsBySource[lead.source] || 0) + 1;
            
            // By month
            const month = new Date(lead.createdAt).toISOString().substring(0, 7);
            leadsByMonth[month] = (leadsByMonth[month] || 0) + 1;
        });
        
        return {
            totalLeads,
            leadsByStatus,
            leadsBySource,
            leadsByMonth,
            conversionRate: this.calculateConversionRate(),
            averageResponseTime: this.calculateAverageResponseTime()
        };
    }
    
    calculateConversionRate() {
        const totalLeads = this.data.leads.length;
        const soldLeads = this.data.leads.filter(lead => lead.status === 'Vendido').length;
        return totalLeads > 0 ? (soldLeads / totalLeads * 100).toFixed(1) : 0;
    }
    
    calculateAverageResponseTime() {
        // This would calculate average time from lead creation to first contact
        // For now, return a placeholder
        return '2.5 horas';
    }
    
    // Follow-up management
    getLeadsNeedingFollowUp() {
        const now = new Date();
        return this.data.leads.filter(lead => {
            if (!lead.nextFollowUp) return false;
            const followUpDate = new Date(lead.nextFollowUp);
            return followUpDate <= now;
        });
    }
    
    scheduleFollowUp(leadId, date, notes) {
        const lead = this.getLead(leadId);
        if (lead) {
            lead.nextFollowUp = date;
            this.updateLead(leadId, { nextFollowUp: date });
            
            this.addActivity({
                leadId,
                type: 'Seguimiento programado',
                description: notes || 'Seguimiento programado',
                date: new Date().toISOString(),
                nextAction: notes
            });
            
            return true;
        }
        return false;
    }
    
    // Export functionality
    exportData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `estancias_crm_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }
    
    // Import functionality
    importData(jsonData) {
        try {
            const importedData = JSON.parse(jsonData);
            if (importedData.leads && importedData.activities) {
                this.data = importedData;
                this.saveData();
                return true;
            }
        } catch (error) {
            console.error('Error importing data:', error);
        }
        return false;
    }
}

// Initialize CRM
function initCRM() {
    if (!CRM_CONFIG.enabled) return;
    
    const crmManager = new CRMManager();
    window.crmManager = crmManager;
    
    // Create CRM dashboard if it doesn't exist
    createCRMDashboard();
    
    console.log('✅ CRM inicializado');
}

// Create CRM dashboard
function createCRMDashboard() {
    const crmSection = document.createElement('section');
    crmSection.id = 'crm';
    crmSection.className = 'crm';
    
    crmSection.innerHTML = `
        <div class="container">
            <h2>Panel de Gestión CRM</h2>
            <p class="section-subtitle">Gestiona tus leads y clientes de manera eficiente</p>
            
            <div class="crm-dashboard">
                <div class="crm-stats">
                    <div class="stat-card">
                        <h3>Total Leads</h3>
                        <div class="stat-number" id="total-leads">0</div>
                    </div>
                    <div class="stat-card">
                        <h3>Tasa de Conversión</h3>
                        <div class="stat-number" id="conversion-rate">0%</div>
                    </div>
                    <div class="stat-card">
                        <h3>Leads Nuevos</h3>
                        <div class="stat-number" id="new-leads">0</div>
                    </div>
                    <div class="stat-card">
                        <h3>Seguimientos Pendientes</h3>
                        <div class="stat-number" id="pending-followups">0</div>
                    </div>
                </div>
                
                <div class="crm-actions">
                    <button class="btn btn-primary" onclick="showAddLeadModal()">
                        + Nuevo Lead
                    </button>
                    <button class="btn btn-secondary" onclick="exportCRMData()">
                        📊 Exportar Datos
                    </button>
                    <button class="btn btn-secondary" onclick="showImportModal()">
                        📥 Importar Datos
                    </button>
                </div>
                
                <div class="crm-filters">
                    <select id="status-filter" onchange="filterLeads()">
                        <option value="">Todos los estados</option>
                        ${CRM_CONFIG.leadStatuses.map(status => 
                            `<option value="${status}">${status}</option>`
                        ).join('')}
                    </select>
                    
                    <select id="source-filter" onchange="filterLeads()">
                        <option value="">Todas las fuentes</option>
                        ${CRM_CONFIG.leadSources.map(source => 
                            `<option value="${source}">${source}</option>`
                        ).join('')}
                    </select>
                    
                    <input type="text" id="search-leads" placeholder="Buscar leads..." onkeyup="searchLeads()">
                </div>
                
                <div class="leads-table-container">
                    <table class="leads-table" id="leads-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Contacto</th>
                                <th>Estado</th>
                                <th>Fuente</th>
                                <th>Último Contacto</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="leads-table-body">
                            <!-- Leads will be loaded here -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    // Insert before footer
    const footer = document.querySelector('.footer');
    footer.parentNode.insertBefore(crmSection, footer);
    
    // Load leads
    loadLeadsTable();
    
    // Update stats
    updateCRMStats();
}

// Load leads table
function loadLeadsTable() {
    const tbody = document.getElementById('leads-table-body');
    const crmManager = window.crmManager;
    
    if (!tbody || !crmManager) return;
    
    const leads = crmManager.getAllLeads();
    
    tbody.innerHTML = leads.map(lead => `
        <tr data-lead-id="${lead.id}">
            <td>
                <div class="lead-name">${lead.name}</div>
                <div class="lead-email">${lead.email}</div>
            </td>
            <td>
                <div class="lead-phone">${lead.phone}</div>
                ${lead.lotType ? `<div class="lead-lot">${lead.lotType} - ${lead.lotSize}</div>` : ''}
            </td>
            <td>
                <span class="status-badge status-${lead.status.toLowerCase().replace(/\s+/g, '-')}">
                    ${lead.status}
                </span>
            </td>
            <td>${lead.source}</td>
            <td>${formatDate(lead.lastContact)}</td>
            <td>
                <button class="btn btn-small" onclick="viewLead(${lead.id})">Ver</button>
                <button class="btn btn-small" onclick="editLead(${lead.id})">Editar</button>
                <button class="btn btn-small btn-danger" onclick="deleteLead(${lead.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

// Update CRM stats
function updateCRMStats() {
    const crmManager = window.crmManager;
    if (!crmManager) return;
    
    const analytics = crmManager.getAnalytics();
    
    document.getElementById('total-leads').textContent = analytics.totalLeads;
    document.getElementById('conversion-rate').textContent = analytics.conversionRate + '%';
    document.getElementById('new-leads').textContent = analytics.leadsByStatus['Nuevo'] || 0;
    document.getElementById('pending-followups').textContent = crmManager.getLeadsNeedingFollowUp().length;
}

// Filter leads
function filterLeads() {
    const statusFilter = document.getElementById('status-filter').value;
    const sourceFilter = document.getElementById('source-filter').value;
    const crmManager = window.crmManager;
    
    if (!crmManager) return;
    
    let leads = crmManager.getAllLeads();
    
    if (statusFilter) {
        leads = leads.filter(lead => lead.status === statusFilter);
    }
    
    if (sourceFilter) {
        leads = leads.filter(lead => lead.source === sourceFilter);
    }
    
    updateLeadsTable(leads);
}

// Search leads
function searchLeads() {
    const searchQuery = document.getElementById('search-leads').value;
    const crmManager = window.crmManager;
    
    if (!crmManager) return;
    
    if (searchQuery.trim() === '') {
        loadLeadsTable();
        return;
    }
    
    const results = crmManager.searchLeads(searchQuery);
    updateLeadsTable(results);
}

// Update leads table with filtered results
function updateLeadsTable(leads) {
    const tbody = document.getElementById('leads-table-body');
    
    if (!tbody) return;
    
    tbody.innerHTML = leads.map(lead => `
        <tr data-lead-id="${lead.id}">
            <td>
                <div class="lead-name">${lead.name}</div>
                <div class="lead-email">${lead.email}</div>
            </td>
            <td>
                <div class="lead-phone">${lead.phone}</div>
                ${lead.lotType ? `<div class="lead-lot">${lead.lotType} - ${lead.lotSize}</div>` : ''}
            </td>
            <td>
                <span class="status-badge status-${lead.status.toLowerCase().replace(/\s+/g, '-')}">
                    ${lead.status}
                </span>
                </td>
            <td>${lead.source}</td>
            <td>${formatDate(lead.lastContact)}</td>
            <td>
                <button class="btn btn-small" onclick="viewLead(${lead.id})">Ver</button>
                <button class="btn btn-small" onclick="editLead(${lead.id})">Editar</button>
                <button class="btn btn-small btn-danger" onclick="deleteLead(${lead.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Export CRM data
function exportCRMData() {
    const crmManager = window.crmManager;
    if (crmManager) {
        crmManager.exportData();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCRM);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CRMManager, initCRM };
} else {
    window.CRMManager = CRMManager;
    window.initCRM = initCRM;
}
