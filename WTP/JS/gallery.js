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

const storyPages = [
    ["shrutika-sandeep.html", "darshni-diven.html", "priya-rohan.html", "ananya-karan.html", "meera-aditya.html"],
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
        const navLinks = document.getElementById("navLinks");
        const navbar = document.getElementById("navbar");
        const menuBtn = document.getElementById("menuBtn");

        navLinks?.classList.remove("mobile-active");
        navbar?.classList.remove("menu-open");
        menuBtn?.setAttribute("aria-expanded", "false");
    }
});
