/**
 * Lightbox para la galería de proyectos
 * Permite visualizar las imágenes a pantalla completa con navegación
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const galleryImages = document.querySelectorAll('.lightbox-trigger');
    
    let currentImageIndex = 0;
    
    // Mostrar el lightbox al hacer clic en una imagen
    galleryImages.forEach((image, index) => {
        image.addEventListener('click', function() {
            currentImageIndex = index;
            openLightbox(this);
        });
    });
    
    // Función para abrir el lightbox
    function openLightbox(image) {
        lightbox.style.display = 'block';
        lightboxImg.src = image.src;
        lightboxCaption.textContent = image.alt;
        document.body.style.overflow = 'hidden'; // Evitar scroll en el body
        
        // Añadir clase para animación de entrada
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
    }
    
    // Cerrar el lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
    
    // Función para cerrar el lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }
    
    // Navegar a la siguiente imagen
    lightboxNext.addEventListener('click', nextImage);
    
    // Navegar a la imagen anterior
    lightboxPrev.addEventListener('click', prevImage);
    
    // Función para ir a la siguiente imagen
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    }
    
    // Función para ir a la imagen anterior
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    }
    
    // Actualizar la imagen del lightbox
    function updateLightboxImage() {
        const image = galleryImages[currentImageIndex];
        lightboxImg.src = image.src;
        lightboxCaption.textContent = image.alt;
        
        // Efecto de transición
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.style.opacity = '1';
        }, 100);
    }
    
    // Control con teclado
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            }
        }
    });
});
