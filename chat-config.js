// Chat Configuration
// Configure your preferred live chat service here

const CHAT_CONFIG = {
    // Tawk.to (Free option)
    tawk: {
        enabled: false,
        widgetId: 'YOUR_TAWK_WIDGET_ID',
        scriptUrl: 'https://embed.tawk.to/YOUR_TAWK_WIDGET_ID/default'
    },
    
    // Crisp (Paid option)
    crisp: {
        enabled: false,
        websiteId: 'YOUR_CRISP_WEBSITE_ID'
    },
    
    // LiveChat (Paid option)
    livechat: {
        enabled: false,
        license: 'YOUR_LIVECHAT_LICENSE'
    },
    
    // Custom WhatsApp Chat
    whatsapp: {
        enabled: false, // DESHABILITADO - Widget feo
        phone: '573137848155',
        message: 'Hola! Me interesa conocer más sobre los lotes en El Secreto de Estancias.',
        buttonText: '💬 Chat en vivo',
        position: 'bottom-right'
    }
};

// Initialize chat based on configuration
function initChat() {
    // WhatsApp Chat (Always available as fallback)
    if (CHAT_CONFIG.whatsapp.enabled) {
        createWhatsAppChat();
    }
    
    // Tawk.to
    if (CHAT_CONFIG.tawk.enabled) {
        loadTawkTo();
    }
    
    // Crisp
    if (CHAT_CONFIG.crisp.enabled) {
        loadCrisp();
    }
    
    // LiveChat
    if (CHAT_CONFIG.livechat.enabled) {
        loadLiveChat();
    }
}

// Create WhatsApp Chat Button
function createWhatsAppChat() {
    const chatButton = document.createElement('div');
    chatButton.className = 'whatsapp-chat-button';
    chatButton.innerHTML = `
        <div class="chat-icon">💬</div>
        <div class="chat-text">${CHAT_CONFIG.whatsapp.buttonText}</div>
    `;
    
    chatButton.addEventListener('click', function() {
        const url = `https://wa.me/${CHAT_CONFIG.whatsapp.phone}?text=${encodeURIComponent(CHAT_CONFIG.whatsapp.message)}`;
        window.open(url, '_blank');
    });
    
    document.body.appendChild(chatButton);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-chat-button {
            position: fixed;
            ${CHAT_CONFIG.whatsapp.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
            ${CHAT_CONFIG.whatsapp.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
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
        
        .whatsapp-chat-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(37, 211, 102, 0.4);
        }
        
        .chat-icon {
            font-size: 20px;
        }
        
        .chat-text {
            font-size: 14px;
        }
        
        @media (max-width: 768px) {
            .whatsapp-chat-button {
                padding: 12px 16px;
            }
            
            .chat-text {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// Load Tawk.to
function loadTawkTo() {
    const script = document.createElement('script');
    script.src = CHAT_CONFIG.tawk.scriptUrl;
    script.async = true;
    script.charset = 'UTF-8';
    document.head.appendChild(script);
}

// Load Crisp
function loadCrisp() {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = CHAT_CONFIG.crisp.websiteId;
    
    const script = document.createElement('script');
    script.src = 'https://client.crisp.chat/l.js';
    script.async = true;
    document.head.appendChild(script);
}

// Load LiveChat
function loadLiveChat() {
    const script = document.createElement('script');
    script.src = `https://cdn.livechatinc.com/tracking.js`;
    script.async = true;
    document.head.appendChild(script);
    
    script.onload = function() {
        window.__lc = window.__lc || {};
        window.__lc.license = CHAT_CONFIG.livechat.license;
        window.__lc.asyncInit = true;
    };
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initChat);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CHAT_CONFIG, initChat };
} else {
    window.CHAT_CONFIG = CHAT_CONFIG;
    window.initChat = initChat;
}
