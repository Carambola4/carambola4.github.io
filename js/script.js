document.addEventListener('DOMContentLoaded', function() {

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Check if the elements exist before adding event listeners
    if (galleryItems.length > 0 && lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgElement = item.querySelector('img');
                if(imgElement) {
                    const imgSrc = imgElement.getAttribute('src');
                    lightboxImg.setAttribute('src', imgSrc);
                    lightbox.style.display = 'flex'; // Use flex to center the content
                }
            });
        });
    }

    // Function to close the lightbox
    function closeLightbox() {
        if (lightbox) {
            lightbox.style.display = 'none';
        }
    }

    // Close lightbox when clicking the close button or the background
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            // Closes the lightbox only if the dark background is clicked, not the image itself
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Optional: Close lightbox with the Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

});