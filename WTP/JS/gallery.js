const siteHeader = document.getElementById("siteHeader");
const siteNav = document.getElementById("siteNav");
const navToggle = document.getElementById("navToggle");
const navClose = document.getElementById("navClose");
const carouselImages = [...document.querySelectorAll(".carousel-track img")];
const fallbackImage = "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=88";

carouselImages.forEach(image => {
    image.loading = "eager";
    image.addEventListener("error", () => {
        if (image.src !== fallbackImage) {
            image.src = fallbackImage;
        }
    }, { once: true });
});

window.addEventListener("scroll", () => {
    siteHeader.classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });

function closeNavigation() {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

navClose.addEventListener("click", closeNavigation);

document.querySelectorAll(".site-nav a").forEach(link => {
    link.addEventListener("click", closeNavigation);
});

const storyPages = [
    ["shrutika-sandeep.html", "neha-arjun.html", "priya-rohan.html", "ananya-karan.html", "meera-aditya.html"],
    ["shreya-varun.html", "aisha-daniel.html", "riya-kabir.html", "divya-sameer.html", "simran-yash.html"]
];

document.querySelectorAll(".carousel-track").forEach((track, trackIndex) => {
    track.querySelectorAll(".gallery-card").forEach((card, cardIndex) => {
        card.addEventListener("click", () => {
            window.location.href = storyPages[trackIndex][cardIndex % 5];
        });
    });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeNavigation();
    }
});
