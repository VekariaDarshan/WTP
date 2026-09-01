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