// Blog Configuration for Integrated Blog
// Simple blog system using localStorage (can be upgraded to a real CMS)

const BLOG_CONFIG = {
    enabled: true,
    title: 'Blog - El Secreto de Estancias',
    description: 'Noticias, consejos y novedades sobre lotes campestres y vida rural',
    postsPerPage: 6,
    categories: [
        'Lotes Campestres',
        'Vida Rural',
        'Inversión',
        'Naturaleza',
        'San Jerónimo'
    ]
};

// Sample blog posts (replace with real content)
const SAMPLE_POSTS = [
    {
        id: 1,
        title: '¿Por qué invertir en lotes campestres en 2024?',
        excerpt: 'Descubre las ventajas de invertir en lotes campestres y por qué San Jerónimo es la opción ideal.',
        content: 'Los lotes campestres representan una excelente oportunidad de inversión en 2024. Con la creciente demanda de espacios naturales y la flexibilidad del trabajo remoto, cada vez más personas buscan un refugio fuera de la ciudad...',
        category: 'Inversión',
        author: 'Equipo Estancias',
        date: '2024-01-15',
        image: 'https://via.placeholder.com/800x400/6B7C32/FFFFFF?text=Inversion+Lotes',
        tags: ['inversión', 'lotes', 'campestres', '2024']
    },
    {
        id: 2,
        title: 'San Jerónimo: El paraíso escondido de Antioquia',
        excerpt: 'Conoce las maravillas naturales y la ubicación estratégica de San Jerónimo.',
        content: 'San Jerónimo es uno de los municipios más hermosos de Antioquia, ubicado estratégicamente a solo 45 minutos de Medellín. Su clima templado, paisajes montañosos y gente amable lo convierten en el lugar perfecto...',
        category: 'San Jerónimo',
        author: 'Equipo Estancias',
        date: '2024-01-10',
        image: 'https://via.placeholder.com/800x400/6B7C32/FFFFFF?text=San+Jeronimo',
        tags: ['san jerónimo', 'antioquia', 'naturaleza', 'clima']
    },
    {
        id: 3,
        title: 'Diseña tu casa campestre sin restricciones',
        excerpt: 'La libertad de diseño es una de las mayores ventajas de nuestros lotes.',
        content: 'En El Secreto de Estancias, no hay Plan de Ordenamiento Territorial (POT) que limite tu creatividad. Puedes diseñar tu casa campestre exactamente como la sueñas, sin restricciones de altura, estilo o materiales...',
        category: 'Lotes Campestres',
        author: 'Equipo Estancias',
        date: '2024-01-05',
        image: 'https://via.placeholder.com/800x400/6B7C32/FFFFFF?text=Libertad+Diseño',
        tags: ['diseño', 'libertad', 'casa', 'campestre']
    }
];

// Blog functionality
class BlogManager {
    constructor() {
        this.posts = this.loadPosts();
        this.currentPage = 1;
        this.postsPerPage = BLOG_CONFIG.postsPerPage;
    }
    
    loadPosts() {
        const savedPosts = localStorage.getItem('estancias_blog_posts');
        if (savedPosts) {
            return JSON.parse(savedPosts);
        } else {
            // Initialize with sample posts
            localStorage.setItem('estancias_blog_posts', JSON.stringify(SAMPLE_POSTS));
            return SAMPLE_POSTS;
        }
    }
    
    savePosts() {
        localStorage.setItem('estancias_blog_posts', JSON.stringify(this.posts));
    }
    
    addPost(post) {
        post.id = Date.now();
        post.date = new Date().toISOString().split('T')[0];
        this.posts.unshift(post);
        this.savePosts();
        return post;
    }
    
    getPost(id) {
        return this.posts.find(post => post.id == id);
    }
    
    getPostsByCategory(category) {
        return this.posts.filter(post => post.category === category);
    }
    
    searchPosts(query) {
        const searchTerm = query.toLowerCase();
        return this.posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    
    getPaginatedPosts(page = 1) {
        const startIndex = (page - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        return {
            posts: this.posts.slice(startIndex, endIndex),
            totalPages: Math.ceil(this.posts.length / this.postsPerPage),
            currentPage: page
        };
    }
}

// Initialize blog
function initBlog() {
    if (!BLOG_CONFIG.enabled) return;
    
    const blogManager = new BlogManager();
    window.blogManager = blogManager;
    
    // Create blog section if it doesn't exist
    createBlogSection();
    
    console.log('✅ Blog inicializado');
}

// Create blog section
function createBlogSection() {
    const blogSection = document.createElement('section');
    blogSection.id = 'blog';
    blogSection.className = 'blog';
    
    blogSection.innerHTML = `
        <div class="container">
            <h2>Blog</h2>
            <p class="section-subtitle">Noticias y consejos sobre lotes campestres</p>
            
            <div class="blog-filters">
                <button class="filter-btn active" data-category="all">Todos</button>
                ${BLOG_CONFIG.categories.map(category => 
                    `<button class="filter-btn" data-category="${category}">${category}</button>`
                ).join('')}
            </div>
            
            <div class="blog-grid" id="blog-grid">
                <!-- Posts will be loaded here -->
            </div>
            
            <div class="blog-pagination" id="blog-pagination">
                <!-- Pagination will be loaded here -->
            </div>
        </div>
    `;
    
    // Insert before footer
    const footer = document.querySelector('.footer');
    footer.parentNode.insertBefore(blogSection, footer);
    
    // Load posts
    loadBlogPosts();
    
    // Add event listeners
    addBlogEventListeners();
}

// Load blog posts
function loadBlogPosts(category = 'all', page = 1) {
    const blogGrid = document.getElementById('blog-grid');
    const blogManager = window.blogManager;
    
    let posts;
    if (category === 'all') {
        const paginated = blogManager.getPaginatedPosts(page);
        posts = paginated.posts;
        updatePagination(paginated);
    } else {
        posts = blogManager.getPostsByCategory(category);
    }
    
    blogGrid.innerHTML = posts.map(post => `
        <article class="blog-post" data-id="${post.id}">
            <div class="post-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
            </div>
            <div class="post-content">
                <div class="post-category">${post.category}</div>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-meta">
                    <span class="post-date">${formatDate(post.date)}</span>
                    <span class="post-author">${post.author}</span>
                </div>
                <button class="btn btn-secondary read-more" onclick="readBlogPost(${post.id})">
                    Leer más
                </button>
            </div>
        </article>
    `).join('');
}

// Update pagination
function updatePagination(paginated) {
    const pagination = document.getElementById('blog-pagination');
    if (paginated.totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHtml = '<div class="pagination-controls">';
    
    if (paginated.currentPage > 1) {
        paginationHtml += `<button class="pagination-btn" onclick="loadBlogPosts('all', ${paginated.currentPage - 1})">← Anterior</button>`;
    }
    
    for (let i = 1; i <= paginated.totalPages; i++) {
        const activeClass = i === paginated.currentPage ? 'active' : '';
        paginationHtml += `<button class="pagination-btn ${activeClass}" onclick="loadBlogPosts('all', ${i})">${i}</button>`;
    }
    
    if (paginated.currentPage < paginated.totalPages) {
        paginationHtml += `<button class="pagination-btn" onclick="loadBlogPosts('all', ${paginated.currentPage + 1})">Siguiente →</button>`;
    }
    
    paginationHtml += '</div>';
    pagination.innerHTML = paginationHtml;
}

// Add blog event listeners
function addBlogEventListeners() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Load posts
            if (category === 'all') {
                loadBlogPosts('all', 1);
            } else {
                loadBlogPosts(category);
            }
        });
    });
}

// Read blog post
function readBlogPost(postId) {
    const post = window.blogManager.getPost(postId);
    if (!post) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'blog-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <article class="blog-post-full">
                <img src="${post.image}" alt="${post.title}" class="post-image-full">
                <div class="post-content-full">
                    <div class="post-category">${post.category}</div>
                    <h2>${post.title}</h2>
                    <div class="post-meta">
                        <span class="post-date">${formatDate(post.date)}</span>
                        <span class="post-author">${post.author}</span>
                    </div>
                    <div class="post-content-text">${post.content}</div>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </article>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initBlog);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BlogManager, initBlog };
} else {
    window.BlogManager = BlogManager;
    window.initBlog = initBlog;
}
