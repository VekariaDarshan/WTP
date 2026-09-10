const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const closeMenuBtn = document.getElementById("closeMenuBtn");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("mobile-active");
        navbar.classList.toggle("menu-open", navLinks.classList.contains("mobile-active"));
        menuBtn.setAttribute("aria-expanded", navLinks.classList.contains("mobile-active"));
    });
}

if (closeMenuBtn && navLinks && menuBtn) {
    closeMenuBtn.addEventListener("click", () => {
        navLinks.classList.remove("mobile-active");
        navbar.classList.remove("menu-open");
        menuBtn.setAttribute("aria-expanded", "false");
    });
}

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

const aboutCarousel = document.getElementById("aboutCarousel");
const aboutSlides = aboutCarousel ? [...aboutCarousel.querySelectorAll(".about-slide")] : [];
let aboutSlideIndex = 0;
let aboutCarouselTimer;

function showAboutSlide(index) {
    aboutSlideIndex = (index + aboutSlides.length) % aboutSlides.length;

    aboutSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === aboutSlideIndex);
    });

}

function startAboutCarousel() {
    clearInterval(aboutCarouselTimer);
    aboutCarouselTimer = setInterval(() => showAboutSlide(aboutSlideIndex + 1), 5000);
}

if (aboutCarousel && aboutSlides.length > 1) {
    startAboutCarousel();
}

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        if (navLinks) {
            navLinks.classList.remove("mobile-active");
        }
        if (navbar) {
            navbar.classList.remove("menu-open");
        }
        if (menuBtn) {
            menuBtn.setAttribute("aria-expanded", "false");
        }
    });
});

