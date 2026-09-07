// For Copying Phone Number & Email
function copyText(elementId) {
    var textToCopy = document.getElementById(elementId).innerText;
    var tempInput = document.createElement("input");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    
    try {
        document.execCommand("copy");
        alert("Copied: " + textToCopy);
    } catch (err) {
        console.error("Unable to copy text", err);
    } finally {
        document.body.removeChild(tempInput);
    }
}

// For Real Time Updates
function updateTimeAndDate() {
    const timeElement = document.getElementById("time");
    const dateElement = document.getElementById("date");

    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    timeElement.innerHTML = `<div>${day}</div><div>${time}</div>`;
    dateElement.textContent = date;
}

setInterval(updateTimeAndDate, 1000);

// For Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById("mySidebar");
    sidebar.classList.toggle("active");
}

// For Scroll Reveal Effect
document.addEventListener("DOMContentLoaded", function () {
    const revealItems = document.querySelectorAll(".reveal");

    if (revealItems.length === 0) return;

    revealItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 70}ms`;
    });

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -20px 0px"
        });

        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("visible"));
    }
});

window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    const title = document.querySelector(".title");
    const imageContainer = document.querySelector(".image-container");

    if (title) {
        title.style.transform = `translateY(${Math.min(scrollY * 0.08, 18)}px)`;
    }

    if (imageContainer) {
        imageContainer.style.transform = `translateY(${Math.min(scrollY * 0.04, 10)}px)`;
    }
});