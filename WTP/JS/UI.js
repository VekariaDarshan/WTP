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

const inquiryModal = document.getElementById("inquiryModal");
const openInquiryModal = document.getElementById("openInquiryModal");
const closeInquiryModal = document.getElementById("closeInquiryModal");
const inquiryForm = document.getElementById("inquiryForm");
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxGcPFLEpCh8n3LE86p-kj8wQYEDTeiPSyJA5eT7lWOWIJU_qxEOwRYnQCtarj9vHTA/exec";

if (inquiryForm) {
    inquiryForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = inquiryForm.querySelector(".submit-inquiry");
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {
            const payload = Object.fromEntries(new FormData(inquiryForm).entries());
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const resultText = await response.text();

            if (!response.ok) {
                throw new Error(resultText || "Request failed");
            }

            inquiryForm.reset();
            submitButton.textContent = "Sent";
            setTimeout(() => {
                submitButton.textContent = originalButtonText;
            }, 2500);
        } catch (error) {
            submitButton.textContent = "Try Again";
            console.error("Inquiry submission failed:", error);
        } finally {
            submitButton.disabled = false;
        }
    });
}

if (inquiryModal && openInquiryModal) {
    openInquiryModal.addEventListener("click", () => {
        inquiryModal.classList.add("open");
        inquiryModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    });
}

if (inquiryModal && closeInquiryModal) {
    closeInquiryModal.addEventListener("click", () => {
        inquiryModal.classList.remove("open");
        inquiryModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    });
}

if (inquiryModal) {
    inquiryModal.addEventListener("click", (event) => {
        if (event.target === inquiryModal) {
            inquiryModal.classList.remove("open");
            inquiryModal.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && inquiryModal.classList.contains("open")) {
            inquiryModal.classList.remove("open");
            inquiryModal.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        }
    });
}
