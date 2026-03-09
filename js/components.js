class ComponentLoader {
    constructor() {
        this.cache = {};
    }

    async loadArtworkData() {
        if (this.cache.artworks) return this.cache.artworks;
        const response = await fetch('data/artworks.json');
        this.cache.artworks = await response.json();
        return this.cache.artworks;
    }

    async loadComponent(name) {
        if (this.cache[name]) return this.cache[name];
        const response = await fetch(`components/${name}.html`);
        this.cache[name] = await response.text();
        return this.cache[name];
    }

    async injectComponent(elementId, componentName) {
        const element = document.getElementById(elementId);
        if (!element) return;
        const html = await this.loadComponent(componentName);
        element.innerHTML = html;
    }

    // Generate all collection sections for the selected-works page
    async generateSelectedWorks() {
        const container = document.getElementById('works-content');
        if (!container) return;

        const data = await this.loadArtworkData();
        const collectionKeys = data.homepage.collections;

        let html = '';
        for (const key of collectionKeys) {
            const collection = data.collections[key];
            const artworks = collection.artworks;

            let itemsHtml = '';
            for (const artworkKey of artworks) {
                const artwork = data.artworks[artworkKey];
                if (!artwork) continue;
                const mediumFilename = artwork.filename.replace(/\.jpeg$/i, '.jpg');
                const mediumSrc = `images/artworks/medium/${mediumFilename}`;
                const originalSrc = `images/artworks/originals/${artwork.filename}`;
                itemsHtml += `
                    <div class="gallery-item"
                        data-title="${artwork.title}"
                        data-medium="${artwork.medium || ''}"
                        data-dimensions="${artwork.dimensions || ''}"
                        data-year="${artwork.year || ''}"
                        data-description="${artwork.description || ''}"
                        data-src="${mediumSrc}"
                        data-original="${originalSrc}">
                        <img src="${mediumSrc}"
                             alt="${artwork.title}"
                             loading="lazy">
                    </div>`;
            }

            const descriptionHtml = collection.description
                ? `<p class="collection-description">${collection.description}</p>`
                : '';
            html += `
                <section class="collection-section" id="${key}">
                    <h2 class="collection-section-title">${collection.title}</h2>
                    ${descriptionHtml}
                    <div class="gallery-grid">${itemsHtml}</div>
                </section>`;
        }

        container.innerHTML = html;
    }

    // Generate sub-nav links for the selected-works sidebar
    async generateSubNav() {
        const subNav = document.getElementById('sub-nav');
        if (!subNav) return;

        const data = await this.loadArtworkData();
        const collectionKeys = data.homepage.collections;

        const html = collectionKeys.map(key => {
            const col = data.collections[key];
            return `<a href="#${key}" class="sub-nav-link" data-section="${key}">${col.title}</a>`;
        }).join('');

        subNav.innerHTML = html;
    }
}

// =====================
// Sidebar (hamburger on mobile)
// =====================

function initializeSidebar() {
    const btn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (!btn || !sidebar) return;

    btn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('visible');
    });

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('visible');
        });
    }

    // Close sidebar on nav link click (mobile)
    sidebar.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link') || e.target.classList.contains('sub-nav-link')) {
            sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('visible');
        }
    });
}

// =====================
// Active nav link
// =====================

function setActiveNavLink() {
    const page = document.body.dataset.page;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });
}

// =====================
// Scroll-spy for sub-nav
// =====================

function initializeScrollSpy() {
    const sections = document.querySelectorAll('.collection-section');
    const subNavLinks = document.querySelectorAll('.sub-nav-link');
    if (!sections.length || !subNavLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                subNavLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === id);
                });
            }
        });
    }, { threshold: 0.15, rootMargin: '-80px 0px -60% 0px' });

    sections.forEach(section => observer.observe(section));
}

// =====================
// Lightbox
// =====================

function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxLoading = document.getElementById('lightbox-loading');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDetails = document.getElementById('lightbox-details');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    let galleryItems = [];
    let currentIndex = 0;

    function getGalleryItems() {
        return Array.from(document.querySelectorAll('.gallery-item'));
    }

    function openLightbox(index) {
        galleryItems = getGalleryItems();
        currentIndex = index;
        showImage(currentIndex);
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    function showImage(index) {
        const item = galleryItems[index];
        if (!item) return;

        const originalSrc = item.dataset.original;
        const mediumSrc = item.dataset.src;
        const title = item.dataset.title || '';
        const medium = item.dataset.medium || '';
        const dimensions = item.dataset.dimensions || '';
        const year = item.dataset.year || '';
        const description = item.dataset.description || '';

        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxDetails) {
            const parts = [medium, dimensions, year].filter(Boolean).join(' · ');
            lightboxDetails.textContent = description
                ? `${parts}${parts ? ' — ' : ''}${description}`
                : parts;
        }

        // Show loading, start with medium image
        lightboxImage.classList.add('loading');
        if (lightboxLoading) lightboxLoading.classList.remove('hidden');
        lightboxImage.src = mediumSrc;

        lightboxImage.onload = () => {
            if (lightboxLoading) lightboxLoading.classList.add('hidden');
            lightboxImage.classList.remove('loading');
        };

        // Preload original in background
        if (originalSrc) {
            const img = new Image();
            img.onload = () => {
                lightboxImage.src = originalSrc;
                lightboxImage.classList.remove('loading');
                if (lightboxLoading) lightboxLoading.classList.add('hidden');
            };
            img.onerror = () => {
                lightboxImage.classList.remove('loading');
                if (lightboxLoading) lightboxLoading.classList.add('hidden');
            };
            img.src = originalSrc;
        }

        // Preload adjacent images
        [index - 1, index + 1].forEach(i => {
            const adj = galleryItems[(i + galleryItems.length) % galleryItems.length];
            if (adj) {
                const preload = new Image();
                preload.src = adj.dataset.original || adj.dataset.src;
            }
        });
    }

    function navigate(direction) {
        galleryItems = getGalleryItems();
        currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
        showImage(currentIndex);
    }

    // Click on gallery items
    document.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (item) {
            galleryItems = getGalleryItems();
            const index = galleryItems.indexOf(item);
            if (index !== -1) openLightbox(index);
        }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => navigate(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigate(1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display !== 'block') return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });
}

// =====================
// Lazy loading
// =====================

function initializeLazyLoading() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        observer.observe(img);
    });
}

// =====================
// Init
// =====================

document.addEventListener('DOMContentLoaded', async () => {
    const loader = new ComponentLoader();
    const page = document.body.dataset.page;

    // Inject sidebar and footer
    await loader.injectComponent('sidebar', 'sidebar');
    await loader.injectComponent('footer-content', 'footer');

    // Inject lightbox if present
    await loader.injectComponent('lightbox-content', 'lightbox');

    // Set active nav link and initialize sidebar toggle
    setActiveNavLink();
    initializeSidebar();

    // Page-specific logic
    if (page === 'selected-works') {
        await loader.generateSubNav();
        await loader.generateSelectedWorks();
        // Re-observe images added dynamically
        initializeLazyLoading();
        // Scroll-spy needs content to be present
        setTimeout(initializeScrollSpy, 50);
    }

    // Initialize lightbox (works on any page with gallery items)
    initializeLightbox();
    initializeLazyLoading();
});
