const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = [...document.querySelectorAll(".gallery-item")];
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxCategory = document.getElementById("lightboxCategory");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxFullscreen = document.getElementById("lightboxFullscreen");

let activeFilter = "all";
let filteredGallery = [...galleryItems];
let currentImageIndex = 0;

function applyFilter(selectedFilter) {
    activeFilter = selectedFilter;

    filterButtons.forEach(button => {
        const isActive = button.dataset.filter === selectedFilter;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    filteredGallery = galleryItems.filter(item => {
        return selectedFilter === "all" || item.dataset.category === selectedFilter;
    });

    galleryItems.forEach(item => {
        const matches = selectedFilter === "all" || item.dataset.category === selectedFilter;
        item.classList.toggle("hidden", !matches);
    });

    if (filteredGallery.length > 0) {
        currentImageIndex = 0;
    }
}

function updateLightboxImage(index) {
    if (!filteredGallery.length) return;

    const safeIndex = (index + filteredGallery.length) % filteredGallery.length;
    currentImageIndex = safeIndex;

    const currentItem = filteredGallery[safeIndex];
    const src = currentItem.dataset.src || currentItem.querySelector("img")?.src;
    const title = currentItem.dataset.title || "Gallery image";
    const category = currentItem.dataset.category || "Gallery";

    lightboxImage.src = src;
    lightboxImage.alt = title;
    lightboxCaption.textContent = title;
    lightboxCategory.textContent = category;
}

function openLightbox(index) {
    if (!filteredGallery.length) return;

    updateLightboxImage(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");

    if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(() => {});
        }
    } else if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
    }
}

function moveLightbox(direction) {
    if (!filteredGallery.length) return;
    updateLightboxImage(currentImageIndex + direction);
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        applyFilter(button.dataset.filter);
    });
});

galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        const visibleItems = filteredGallery.length ? filteredGallery : galleryItems;
        const clickedIndex = visibleItems.indexOf(item);
        openLightbox(clickedIndex >= 0 ? clickedIndex : 0);
    });
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => moveLightbox(-1));
lightboxNext.addEventListener("click", () => moveLightbox(1));
lightboxFullscreen.addEventListener("click", toggleFullscreen);

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        const navLinks = document.getElementById("navLinks");
        const navbar = document.getElementById("navbar");
        const menuBtn = document.getElementById("menuBtn");

        navLinks?.classList.remove("mobile-active");
        navbar?.classList.remove("menu-open");
        menuBtn?.setAttribute("aria-expanded", "false");

        closeLightbox();
    }

    if (lightbox.classList.contains("is-open")) {
        if (event.key === "ArrowLeft") {
            moveLightbox(-1);
        }

        if (event.key === "ArrowRight") {
            moveLightbox(1);
        }
    }
});

applyFilter(activeFilter);
