const contactForm = document.getElementById("inquiryForm");
const eventDateInput = document.getElementById("date");
const formStatus = document.getElementById("formStatus");
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyn6dvVzVVyQ02Vuk3SrxL6HhvwNvlGySWN9JHcd3xJuxaMu76lTJ3uW3fq6So8qX1fnA/exec";

if (eventDateInput && typeof flatpickr === "function") {
    flatpickr(eventDateInput, {
        mode: "multiple",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d/m/Y",
        conjunction: ", ",
        allowInput: false
    });
}

if (contactForm) {
    contactForm.addEventListener("submit", async event => {
        event.preventDefault();

        const submitButton = contactForm.querySelector(".submit-inquiry");
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        formStatus.textContent = "";

        try {
            const payload = {
                name: contactForm.elements.name.value.trim(),
                email: contactForm.elements.email.value.trim(),
                whatsapp: contactForm.elements.whatsapp.value.trim(),
                details: contactForm.elements.details.value.trim(),
                location: contactForm.elements.location.value.trim(),
                date: contactForm.elements.date.value.trim(),
                days: contactForm.elements.days.value.trim()
            };

            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(payload)
            });

            const resultText = await response.text();
            let result;

            try {
                result = JSON.parse(resultText);
            } catch {
                throw new Error("The Google Sheets endpoint returned an invalid response.");
            }

            if (!response.ok || result.success !== true) {
                throw new Error(result.error || "The inquiry could not be saved.");
            }

            contactForm.reset();
            formStatus.textContent = "Thank you. Your inquiry has been sent.";
            submitButton.textContent = "Sent";
        } catch (error) {
            formStatus.textContent = "We could not send your inquiry. Please try again.";
            submitButton.textContent = "Try Again";
            console.error("Inquiry submission failed:", error);
        } finally {
            submitButton.disabled = false;
            setTimeout(() => {
                submitButton.textContent = originalButtonText;
            }, 2500);
        }
    });
}
