```javascript
/* =====================================================
   NAVBAR
===================================================== */

const navbar = document.getElementById("navbar");

if (navbar) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const closeMenuBtn = document.getElementById("closeMenuBtn");

function closeMobileMenu() {
    if (navLinks) {
        navLinks.classList.remove("mobile-active");
    }

    if (navbar) {
        navbar.classList.remove("menu-open");
    }

    if (menuBtn) {
        menuBtn.setAttribute("aria-expanded", "false");
    }
}

if (menuBtn && navLinks) {
    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("mobile-active");

        if (navbar) {
            navbar.classList.toggle("menu-open", isOpen);
        }

        menuBtn.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );
    });
}

if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", () => {
        closeMobileMenu();
    });
}


/* Close mobile menu when a navigation link is clicked */

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        closeMobileMenu();
    });
});


/* Close mobile menu with Escape */

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});


/* =====================================================
   SCROLL REVEAL ANIMATION
===================================================== */

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0 && "IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    // Stop observing once the element has appeared
                    observer.unobserve(entry.target);
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

} else {

    // Fallback for older browsers
    revealElements.forEach(element => {
        element.classList.add("active");
    });

}


/* =====================================================
   INQUIRY MODAL
===================================================== */

const inquiryModal = document.getElementById("inquiryModal");
const openInquiryModal = document.getElementById("openInquiryModal");
const closeInquiryModal = document.getElementById("closeInquiryModal");


/* Open modal */

if (inquiryModal && openInquiryModal) {

    openInquiryModal.addEventListener("click", () => {

        inquiryModal.classList.add("open");

        inquiryModal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

    });

}


/* Close modal */

function closeInquiry() {

    if (!inquiryModal) return;

    inquiryModal.classList.remove("open");

    inquiryModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}

if (closeInquiryModal) {

    closeInquiryModal.addEventListener("click", () => {
        closeInquiry();
    });

}


/* Close when clicking outside the panel */

if (inquiryModal) {

    inquiryModal.addEventListener("click", event => {

        if (event.target === inquiryModal) {
            closeInquiry();
        }

    });

}


/* Close modal with Escape */

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        inquiryModal &&
        inquiryModal.classList.contains("open")
    ) {
        closeInquiry();
    }

});


/* =====================================================
   GOOGLE SHEETS FORM
===================================================== */

/*
    IMPORTANT:

    Replace the URL below with the Web App URL
    from your Google Apps Script deployment.

    It should look like:

    https://script.google.com/macros/s/XXXXXXXXXXXX/exec
*/

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxGcPFLEpCh8n3LE86p-kj8wQYEDTeiPSyJA5eT7lWOWIJU_qxEOwRYnQCtarj9vHTA/exec";


const inquiryForm = document.getElementById("inquiryForm");


if (inquiryForm) {

    inquiryForm.addEventListener("submit", async event => {

        event.preventDefault();


        /* ---------------------------------------------
           Get submit button
        --------------------------------------------- */

        const submitButton =
            inquiryForm.querySelector(".submit-inquiry");


        if (!submitButton) {
            return;
        }


        const originalButtonText =
            submitButton.textContent;


        /* ---------------------------------------------
           Disable button while submitting
        --------------------------------------------- */

        submitButton.disabled = true;

        submitButton.textContent = "Sending...";


        try {

            /* -----------------------------------------
               Collect form data
            ----------------------------------------- */

            const payload = {

                Name:
                    inquiryForm.elements.name.value.trim(),

                Email:
                    inquiryForm.elements.email.value.trim(),

                Whatsapp:
                    inquiryForm.elements.whatsapp.value.trim(),

                Details:
                    inquiryForm.elements.details.value.trim(),

                Location:
                    inquiryForm.elements.location.value.trim(),

                Date:
                    inquiryForm.elements.date.value.trim(),

                Days:
                    inquiryForm.elements.days.value.trim()

            };


            /* -----------------------------------------
               Basic validation
            ----------------------------------------- */

            if (
                !payload.Name ||
                !payload.Email ||
                !payload.Whatsapp ||
                !payload.Details ||
                !payload.Location ||
                !payload.Date ||
                !payload.Days
            ) {

                throw new Error(
                    "Please complete all required fields."
                );

            }


            /* -----------------------------------------
               Send data to Google Apps Script
            ----------------------------------------- */

            const response = await fetch(
                GOOGLE_SCRIPT_URL,
                {
                    method: "POST",

                    /*
                       Do NOT add:

                       headers: {
                           "Content-Type": "application/json"
                       }

                       Google Apps Script works more reliably
                       here without the custom Content-Type header.
                    */

                    body: JSON.stringify(payload)
                }
            );


            /* -----------------------------------------
               Check response
            ----------------------------------------- */

            if (!response.ok) {

                throw new Error(
                    `Server error: ${response.status}`
                );

            }


            /* -----------------------------------------
               Try to read response
            ----------------------------------------- */

            let result = null;

            try {

                result = await response.json();

            } catch (jsonError) {

                // Some Google Apps Script responses may
                // not return JSON in every browser situation.

                console.warn(
                    "Could not parse Google response as JSON."
                );

            }


            /* -----------------------------------------
               Check Google Apps Script result
            ----------------------------------------- */

            if (result && result.success === false) {

                throw new Error(
                    result.error || "Google Sheets submission failed."
                );

            }


            /* -----------------------------------------
               Success
            ----------------------------------------- */

            inquiryForm.reset();

            submitButton.textContent = "Sent ✓";


            /* Optional success message */

            let successMessage =
                document.getElementById("inquirySuccessMessage");


            if (!successMessage) {

                successMessage =
                    document.createElement("div");

                successMessage.id =
                    "inquirySuccessMessage";

                successMessage.textContent =
                    "Thank you! Your inquiry has been received. We will get back to you within 48 hours.";

                successMessage.setAttribute(
                    "role",
                    "status"
                );

                inquiryForm.appendChild(successMessage);

            }


            successMessage.style.display = "block";


            /* -----------------------------------------
               Reset button after 3 seconds
            ----------------------------------------- */

            setTimeout(() => {

                submitButton.textContent =
                    originalButtonText;

                submitButton.disabled = false;

            }, 3000);


            /* -----------------------------------------
               Optional: close modal after submission
            ----------------------------------------- */

            setTimeout(() => {

                closeInquiry();

                if (successMessage) {
                    successMessage.style.display = "none";
                }

            }, 5000);


        } catch (error) {

            /* -----------------------------------------
               Error
            ----------------------------------------- */

            console.error(
                "Inquiry submission failed:",
                error
            );


            submitButton.textContent =
                "Try Again";


            submitButton.disabled = false;


            /* -----------------------------------------
               Show error message
            ----------------------------------------- */

            let errorMessage =
                document.getElementById("inquiryErrorMessage");


            if (!errorMessage) {

                errorMessage =
                    document.createElement("div");

                errorMessage.id =
                    "inquiryErrorMessage";

                errorMessage.setAttribute(
                    "role",
                    "alert"
                );

                inquiryForm.appendChild(errorMessage);

            }


            errorMessage.textContent =
                "Something went wrong while sending your inquiry. Please try again or contact us directly.";

            errorMessage.style.display =
                "block";


            /* -----------------------------------------
               Restore button after 3 seconds
            ----------------------------------------- */

            setTimeout(() => {

                submitButton.textContent =
                    originalButtonText;

                errorMessage.style.display =
                    "none";

            }, 4000);

        }

    });

}


/* =====================================================
   PREVENT MODAL FROM SUBMITTING WITH ENTER
   WHEN APPROPRIATE
===================================================== */

/*
   This section is intentionally left simple because
   normal Enter-key submission is useful for the form.
*/


/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Ensure modal starts closed */

    if (inquiryModal) {

        inquiryModal.classList.remove("open");

        inquiryModal.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* Ensure mobile menu starts closed */

    closeMobileMenu();

});
```
