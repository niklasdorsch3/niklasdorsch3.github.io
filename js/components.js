// Component loader and template system
class ComponentLoader {
    constructor() {
        this.components = {};
        this.artworkData = null;
    }

    // Load artwork data
    async loadArtworkData() {
        if (!this.artworkData) {
            try {
                const response = await fetch('data/artworks.json');
                this.artworkData = await response.json();
            } catch (error) {
                console.error('Error loading artwork data:', error);
            }
        }
        return this.artworkData;
    }

    // Load a component HTML file
    async loadComponent(name) {
        if (!this.components[name]) {
            try {
                const response = await fetch(`components/${name}.html`);
                this.components[name] = await response.text();
            } catch (error) {
                console.error(`Error loading component ${name}:`, error);
                this.components[name] = '';
            }
        }
        return this.components[name];
    }

    // Replace template variables in HTML
    processTemplate(html, data) {
        return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return data[key] || match;
        });
    }

    // Inject component into element
    async injectComponent(elementId, componentName, templateData = {}) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with id '${elementId}' not found`);
            return;
        }

        const componentHtml = await this.loadComponent(componentName);
        const processedHtml = this.processTemplate(componentHtml, templateData);
        element.innerHTML = processedHtml;
    }

    // Set active navigation item
    setActiveNavigation(activePage) {
        // Wait for navigation to be loaded
        setTimeout(() => {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === activePage || 
                    (activePage === 'home' && link.getAttribute('href').includes('#home'))) {
                    link.classList.add('active');
                }
            });
        }, 100);
    }

    // Generate collection items for homepage
    async generateCollectionItems() {
        const data = await this.loadArtworkData();
        if (!data) return '';

        const collections = data.homepage.collections;
        let html = '';

        collections.forEach(collectionKey => {
            const collection = data.collections[collectionKey];
            const firstArtworkKey = collection.artworks[0];
            const firstArtwork = data.artworks[firstArtworkKey];
            const artworkCount = collection.artworks.length;

            html += `
                <div class="collection-item">
                    <a href="${collectionKey}.html">
                        <div class="collection-image">
                            <img src="images/artworks/${firstArtwork.filename}" alt="${collection.title}" loading="lazy">
                        </div>
                        <h3>${collection.title}</h3>
                        <p>${artworkCount} works</p>
                    </a>
                </div>
            `;
        });

        return html;
    }

    // Generate gallery for collection pages
    async generateGallery(collectionKey) {
        const data = await this.loadArtworkData();
        if (!data || !data.collections[collectionKey]) return '';

        const collection = data.collections[collectionKey];
        let html = '';

        collection.artworks.forEach(artworkKey => {
            const artwork = data.artworks[artworkKey];
            if (!artwork) return;

            const dimensions = artwork.dimensions ? `, ${artwork.dimensions}` : '';
            const year = artwork.year ? `, ${artwork.year}` : '';

            html += `
                <div class="gallery-item" 
                     data-title="${artwork.title}" 
                     data-medium="${artwork.medium}" 
                     data-dimensions="${artwork.dimensions || ''}" 
                     data-year="${artwork.year}">
                    <img src="images/artworks/${artwork.filename}" alt="${artwork.title}" loading="lazy">
                    <div class="gallery-overlay">
                        <h3>${artwork.title}</h3>
                        <p>${artwork.medium}${dimensions}${year}</p>
                    </div>
                </div>
            `;
        });

        return html;
    }

    // Get collection info
    async getCollectionInfo(collectionKey) {
        const data = await this.loadArtworkData();
        return data?.collections[collectionKey] || null;
    }
}

// Global instance
const componentLoader = new ComponentLoader();

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Get page configuration from body data attributes
    const pageTitle = document.body.getAttribute('data-title') || 'Niklas Dorsch - Artist Portfolio';
    const pageDescription = document.body.getAttribute('data-description') || 'Contemporary artist exploring abstract landscapes through mythical narratives';
    const activePage = document.body.getAttribute('data-page') || 'home';

    // Load head component
    await componentLoader.injectComponent('head-content', 'head', {
        title: pageTitle,
        description: pageDescription
    });

    // Load header component
    await componentLoader.injectComponent('header-content', 'header');
    
    // Set active navigation
    componentLoader.setActiveNavigation(activePage);

    // Load footer component
    await componentLoader.injectComponent('footer-content', 'footer');

    // Load lightbox if element exists
    const lightboxContainer = document.getElementById('lightbox-content');
    if (lightboxContainer) {
        await componentLoader.injectComponent('lightbox-content', 'lightbox');
    }

    // Generate collections for homepage
    const collectionsGrid = document.getElementById('collections-grid');
    if (collectionsGrid) {
        const collectionsHtml = await componentLoader.generateCollectionItems();
        collectionsGrid.innerHTML = collectionsHtml;
    }

    // Generate gallery for collection pages
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        const collectionKey = document.body.getAttribute('data-collection');
        if (collectionKey) {
            const galleryHtml = await componentLoader.generateGallery(collectionKey);
            galleryGrid.innerHTML = galleryHtml;

            // Update page header with collection info
            const collectionInfo = await componentLoader.getCollectionInfo(collectionKey);
            if (collectionInfo) {
                const pageHeader = document.querySelector('.page-header h1');
                const pageSubtitle = document.querySelector('.page-header p');
                if (pageHeader) pageHeader.textContent = collectionInfo.title;
                if (pageSubtitle) pageSubtitle.textContent = collectionInfo.description;
            }
        }
    }

    // Re-initialize mobile navigation and lightbox after components are loaded
    setTimeout(() => {
        initializeMobileNavigation();
        initializeLightbox();
    }, 100);
});

// Mobile navigation functionality
function initializeMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
}

// Lightbox functionality
function initializeLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDetails = document.getElementById('lightbox-details');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    if (!lightbox || galleryItems.length === 0) return;

    let currentImageIndex = 0;
    const images = Array.from(galleryItems);

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            showImage(currentImageIndex);
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navigation
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
            showImage(currentImageIndex);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentImageIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
            showImage(currentImageIndex);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
                showImage(currentImageIndex);
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
                showImage(currentImageIndex);
            }
        }
    });

    function showImage(index) {
        const item = images[index];
        const img = item.querySelector('img');
        const title = item.dataset.title;
        const medium = item.dataset.medium;
        const dimensions = item.dataset.dimensions;
        const year = item.dataset.year;

        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxTitle.textContent = title;

        let details = medium;
        if (dimensions) {
            details += `, ${dimensions}`;
        }
        if (year) {
            details += `, ${year}`;
        }
        lightboxDetails.textContent = details;
    }
}