const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach(btn => {
            const isActive = btn === button;
            btn.classList.toggle("active", isActive);
            btn.setAttribute("aria-pressed", String(isActive));
        });

        galleryItems.forEach(item => {
            const matches = selectedFilter === "all" || item.dataset.category === selectedFilter;
            item.classList.toggle("hidden", !matches);
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
