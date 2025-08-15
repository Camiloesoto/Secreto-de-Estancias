# El Secreto de Estancias - Landing Page

Una landing page premium y elegante para la venta de lotes campestres en San Jerónimo, Antioquia. Diseñada con un enfoque de "lujo natural" que transmite confianza y exclusividad.

## 🎯 Características Principales

- **Diseño Responsive**: Optimizado para desktop, tablet y móvil
- **Estilo Elegante**: Paleta de colores naturales y tipografías premium
- **Performance Alta**: Lazy loading, animaciones CSS optimizadas
- **SEO Ready**: Metadatos completos, estructura semántica
- **Captación de Leads**: Formulario de contacto funcional
- **Galería Interactiva**: Lightbox para visualización de imágenes
- **Navegación Suave**: Scroll automático y menú sticky

## 🎨 Paleta de Colores

- **Verde Bosque**: `#1E3932` (Principal)
- **Verde Suave**: `#2E5E4E` (Secundario)
- **Beige**: `#F5F1E7` (Fondo alternativo)
- **Dorado Claro**: `#C7A76B` (Acentos)
- **Blanco**: `#FFFFFF` (Fondo principal)
- **Gris Cálido**: `#EDEAE6` (Bordes y sombras)

## 🔤 Tipografías

- **Títulos**: Playfair Display (Serif elegante)
- **Cuerpo**: Inter (Sans-serif moderna y legible)

## 📱 Secciones Incluidas

1. **Hero** - Pantalla completa con CTA principal
2. **Bienvenida** - Concepto del proyecto
3. **Ubicación** - Información estratégica y accesos
4. **Cercanías** - Tiempos de viaje a puntos clave
5. **Entorno** - Clima y características naturales
6. **Tipos de Lote** - Terraza, ondulado y playa
7. **Características** - Servicios incluidos
8. **Libertad de Diseño** - Sin P.H. ni restricciones
9. **Mirador** - Vistas panorámicas
10. **Integración Natural** - Corredores de vida
11. **Inspiración Arquitectónica** - Ideas de construcción
12. **Galería** - Imágenes del entorno
13. **FAQ** - Preguntas frecuentes
14. **Contacto** - Formulario y información de contacto
15. **Footer** - Enlaces legales y datos

## 🚀 Instalación y Uso

### Requisitos
- Servidor web (Apache, Nginx, o hosting estático)
- Navegador moderno con soporte para ES6+

### Instalación
1. Descarga todos los archivos del proyecto
2. Sube los archivos a tu servidor web
3. Abre `index.html` en tu navegador

### Estructura de Archivos
```
/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidad JavaScript
├── README.md           # Este archivo
└── favicon.ico         # Icono del sitio (opcional)
```

## ⚙️ Configuración

### Personalización de Colores
Edita las variables CSS en `styles.css` para cambiar la paleta de colores:

```css
:root {
    --color-primary: #1E3932;
    --color-secondary: #2E5E4E;
    --color-accent: #C7A76B;
    --color-background: #F5F1E7;
    --color-white: #FFFFFF;
}
```

### Cambio de Imágenes
Reemplaza los placeholders con tus imágenes reales:

1. **Hero**: Cambia el fondo del hero en `.hero`
2. **Secciones**: Reemplaza `.placeholder-image` con `<img>` reales
3. **Galería**: Actualiza las URLs en `openLightbox()` en `script.js`

### Configuración del Formulario
El formulario está configurado para simular envío. Para funcionalidad real, configura uno de estos servicios:

#### Opción 1: EmailJS
1. Regístrate en [EmailJS](https://www.emailjs.com/)
2. Configura tu servicio de email
3. Descomenta y configura el código en `script.js`:

```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    to_email: 'ventas@elsecretodeestancias.com',
    from_name: data.nombre,
    from_email: data.email,
    message: emailBody
});
```

#### Opción 2: Formspree
1. Regístrate en [Formspree](https://formspree.io/)
2. Cambia el action del formulario en `index.html`:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

#### Opción 3: Netlify Forms
1. Despliega en [Netlify](https://netlify.com/)
2. Agrega `netlify` al formulario:

```html
<form netlify>
```

### Configuración de Google Maps
Para integrar un mapa real:

1. Ve a [Google Maps Platform](https://developers.google.com/maps)
2. Obtén una API key
3. Reemplaza el placeholder del mapa con:

```html
<iframe 
    src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
    width="100%" 
    height="400" 
    style="border:0;" 
    allowfullscreen="" 
    loading="lazy">
</iframe>
```

## 📱 Características Responsive

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: 768px (tablet) y 480px (móvil)
- **Menú Hamburger**: Navegación móvil intuitiva
- **Touch Friendly**: Botones y enlaces optimizados para touch

## 🎭 Funcionalidades JavaScript

- **Navegación Suave**: Scroll automático a secciones
- **FAQ Interactivo**: Acordeón expandible
- **Lightbox**: Visualización de imágenes en galería
- **Formulario Inteligente**: Validación y notificaciones
- **Animaciones**: Efectos de scroll y hover
- **Menú Móvil**: Toggle para dispositivos móviles

## 🔍 SEO y Metadatos

- **Meta Tags**: Title, description, keywords optimizados
- **Open Graph**: Para redes sociales
- **Estructura Semántica**: HTML5 semántico
- **Alt Text**: Para accesibilidad e imágenes
- **Schema.org**: Estructura de datos para motores de búsqueda

## 📊 Performance

- **Lazy Loading**: Carga diferida de imágenes
- **CSS Optimizado**: Estilos minificados y eficientes
- **JavaScript Modular**: Código organizado y optimizado
- **Fuentes Web**: Precarga de tipografías Google Fonts

## 🛠️ Personalización Avanzada

### Agregar Nuevas Secciones
1. Copia la estructura de una sección existente
2. Agrega el contenido en `index.html`
3. Estilos en `styles.css`
4. Funcionalidad en `script.js` si es necesaria

### Cambiar Tipografías
1. Importa nuevas fuentes en `index.html`
2. Actualiza las reglas CSS en `styles.css`
3. Ajusta tamaños y pesos según sea necesario

### Agregar Animaciones
1. Define keyframes en `styles.css`
2. Aplica clases en `script.js`
3. Usa Intersection Observer para triggers

## 🌐 Despliegue

### 🚀 GitHub Pages (Recomendado)
1. **Subir a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/Camiloesoto/Secreto-de-Estancias.git
   git push -u origin main
   ```

2. **Configurar GitHub Pages**:
   - Ve a Settings > Pages en tu repositorio
   - Source: Deploy from a branch
   - Branch: gh-pages
   - El sitio se desplegará automáticamente en: `https://camiloesoto.github.io/Secreto-de-Estancias/`

### 🌐 Otras Plataformas de Despliegue

#### **Netlify** (Gratis)
- Conecta tu repositorio de GitHub
- Despliegue automático en cada push
- URL personalizable: `https://secreto-estancias.netlify.app`
- Formularios incluidos automáticamente

#### **Vercel** (Gratis)
- Conecta tu repositorio de GitHub
- Despliegue instantáneo
- URL: `https://secreto-de-estancias.vercel.app`
- Performance optimizada automáticamente

#### **Firebase Hosting** (Gratis)
- Conecta con GitHub
- URL: `https://secreto-estancias.web.app`
- CDN global de Google

### 📁 Hosting Tradicional
- **cPanel**: Sube archivos vía File Manager
- **FTP**: Usa un cliente FTP como FileZilla
- **SSH**: Para servidores VPS/Dedicated

## 📞 Soporte y Contacto

Para soporte técnico o personalizaciones:
- **Email**: ventas@elsecretodeestancias.com
- **Teléfono**: +57 313 784 8155

## 📄 Licencia

Este proyecto está diseñado específicamente para "El Secreto de Estancias". Todos los derechos reservados.

## 🔄 Actualizaciones

### v1.0.0 (Actual)
- Landing page completa con todas las secciones
- Diseño responsive y optimizado
- Funcionalidad JavaScript completa
- SEO y metadatos implementados

### Próximas Funcionalidades
- Integración con CRM
- Chat en vivo
- Calendario de visitas
- Sistema de reservas online
- Blog integrado
- Multiidioma (ES/EN)

---

**El Secreto de Estancias** - Vive la naturaleza con libertad y confort
