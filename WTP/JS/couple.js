const stories = {
    "shrutika-sandeep": { names: "Shrutika & Sandeep", place: "Nairobi, Kenya", date: "August 2026", tone: "A celebration of love" },
    "neha-arjun": { names: "Neha & Arjun", place: "Nairobi, Kenya", date: "September 2026", tone: "A day full of feeling" },
    "priya-rohan": { names: "Priya & Rohan", place: "Nairobi, Kenya", date: "October 2026", tone: "A beautiful beginning" },
    "ananya-karan": { names: "Ananya & Karan", place: "Nairobi, Kenya", date: "November 2026", tone: "Two families, one story" },
    "meera-aditya": { names: "Meera & Aditya", place: "Nairobi, Kenya", date: "December 2026", tone: "A quiet kind of magic" },
    "shreya-varun": { names: "Shreya & Varun", place: "Nairobi, Kenya", date: "August 2026", tone: "Love, laughter and light" },
    "aisha-daniel": { names: "Aisha & Daniel", place: "Nairobi, Kenya", date: "September 2026", tone: "The start of forever" },
    "riya-kabir": { names: "Riya & Kabir", place: "Nairobi, Kenya", date: "October 2026", tone: "The moments before forever" },
    "divya-sameer": { names: "Divya & Sameer", place: "Nairobi, Kenya", date: "November 2026", tone: "A story in every glance" },
    "simran-yash": { names: "Simran & Yash", place: "Nairobi, Kenya", date: "December 2026", tone: "A little more than a beginning" }
};

const imageSets = [
    "photo-1519741497674-611481863552",
    "photo-1522673607200-164d1b6ce486",
    "photo-1511285560929-80b456fea0bc",
    "photo-1519225421980-715cb0215aed",
    "photo-1464366400600-7168b8af9bc3",
    "photo-1507504031003-b417219a0fde",
    "photo-1520854221256-17451cc331bf",
    "photo-1516589178581-6cd7833ae3b2",
    "photo-1529634597503-139d3726fed5",
    "photo-1544078751-58fee2d8a03b"
];

const imageUrl = (id, width = 2200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=90`;
const storyKey = document.body.dataset.couple;
const story = stories[storyKey];
const storyIndex = Object.keys(stories).indexOf(storyKey);
const videoId = document.body.dataset.video;
const image = offset => imageUrl(imageSets[(storyIndex + offset) % imageSets.length]);

document.title = `${story.names} - Wedding Story`;
document.body.style.setProperty("--hero-image", `url("${image(0)}")`);
document.body.style.setProperty("--cinematic-image", `url("${image(2)}")`);
document.body.style.setProperty("--final-image", `url("${image(4)}")`);

document.getElementById("storyContent").innerHTML = `
    <section class="story-hero">
        <div class="story-hero-content reveal"><div><p class="eyebrow">Wedding Story</p><h1>${story.names.replace(" & ", "<br>&amp; ")}</h1></div><div class="hero-details">${story.place}<br>${story.date}<br>${story.tone}</div></div>
    </section>
    <section class="story-intro reveal"><div><p class="story-number">The Beginning</p><h2>Two people.<br>One beautiful story.</h2></div><div class="story-text"><p>Some weddings are remembered for the celebration. Others are remembered for how they made you feel.<br><br>${story.names}'s story was filled with laughter, emotion, family and the little moments that made the day uniquely theirs.</p><div class="story-meta"><div class="meta"><span>Couple</span><span>${story.names}</span></div><div class="meta"><span>Location</span><span>Nairobi</span></div><div class="meta"><span>Photography</span><span>We The Photographers</span></div></div></div></section>
    <section class="full-image reveal"><img src="${image(1)}" alt="${story.names} wedding story"></section>
    <section class="image-story reveal"><div class="image-story-image"><img src="${image(2, 1400)}" alt="${story.names} before the wedding"></div><div class="image-story-text"><p class="section-label">Before The Day</p><h2>The moments<br>before forever.</h2><p>Quiet moments. Stolen glances. Nervous laughter. The in-between moments that become the most meaningful photographs.</p></div></section>
    <section class="image-pair reveal"><div class="image"><img src="${image(3, 1400)}" alt="Wedding details for ${story.names}"></div><div class="image"><img src="${image(4, 1400)}" alt="${story.names} portrait"></div></section>
    ${videoId ? `<section class="highlights reveal" aria-labelledby="highlightsTitle"><div class="highlights-heading"><div><p class="section-label">Moving Memories</p><h2 id="highlightsTitle">Highlights.</h2></div><p>Watch the moments, emotions and details come together in motion.</p></div><div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}" title="Wedding highlights film" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div></section>` : ""}
    <section class="cinematic reveal"><div><blockquote>"The best photographs are the ones that bring you back to the moment."</blockquote><small>We The Photographers</small></div></section>
    <section class="image-story reverse reveal"><div class="image-story-text"><p class="section-label">The Ceremony</p><h2>A room full<br>of love.</h2><p>Surrounded by the people who mattered most, two families became one. Every moment unfolded naturally, with the people and details that made their story theirs.</p></div><div class="image-story-image"><img src="${image(5, 1400)}" alt="${story.names} ceremony"></div></section>
    <section class="three-grid reveal"><div class="image"><img src="${image(6, 1200)}" alt="${story.names} celebration"></div><div class="image"><img src="${image(7, 1200)}" alt="Wedding details"></div><div class="image"><img src="${image(8, 1200)}" alt="${story.names} reception"></div></section>
    <section class="final-image reveal"><div class="final-caption"><span>And They Lived</span><h2>Happily Ever After.</h2></div></section>
    <section class="cta reveal"><p class="section-label">Your Story Deserves To Be Remembered</p><h2>Let's Tell<br>Your Story.</h2><p>Your wedding will only happen once. Let's make sure the memories last forever.</p><a class="cta-button" href="../Index.html#contact">Enquire With Us &rarr;</a></section>
`;

const storyNav = document.querySelector(".story-nav");
const revealElements = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    storyNav.classList.toggle("scrolled", window.scrollY > 45);
}, { passive: true });

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(element => observer.observe(element));
} else {
    revealElements.forEach(element => element.classList.add("is-visible"));
}

document.querySelectorAll("img").forEach(image => {
    image.addEventListener("error", () => {
        image.style.visibility = "hidden";
    }, { once: true });
});
