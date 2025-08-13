document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentGallery = [];
    let currentIndex = 0;

    // Handle multiple galleries on the same page
    const galleries = document.querySelectorAll('.featured-gallery, .focused-gallery');

    galleries.forEach(galleryContainer => {
        const galleryItems = galleryContainer.querySelectorAll('.gallery-item');
        const imageSources = Array.from(galleryItems).map(item => item.href);

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                currentGallery = imageSources;
                currentIndex = index;
                openLightbox(this.href);
            });
        });
    });

    function openLightbox(src) {
        if (lightbox && lightboxImg) {
            lightboxImg.src = src;
            lightbox.classList.add('active');
            updateNavButtons();
        }
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
        }
    }

    function showPrev() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : currentGallery.length - 1;
        lightboxImg.src = currentGallery[currentIndex];
        updateNavButtons();
    }

    function showNext() {
        currentIndex = (currentIndex < currentGallery.length - 1) ? currentIndex + 1 : 0;
        lightboxImg.src = currentGallery[currentIndex];
        updateNavButtons();
    }
    
    function updateNavButtons() {
        if (!prevBtn || !nextBtn) return;
        // Hide nav buttons if there's only one image
        const showButtons = currentGallery.length > 1;
        prevBtn.style.display = showButtons ? 'block' : 'none';
        nextBtn.style.display = showButtons ? 'block' : 'none';
    }

    // Event Listeners
    if (closeLightboxBtn) {
        closeLightboxBtn.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        // Close lightbox if background is clicked
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', showPrev);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', showNext);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
            if (e.key === 'ArrowLeft' && currentGallery.length > 1) {
                showPrev();
            }
            if (e.key === 'ArrowRight' && currentGallery.length > 1) {
                showNext();
            }
        }
    });
});