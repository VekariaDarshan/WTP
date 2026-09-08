const stories = {
    "shrutika-sandeep": { names: "Shrutika & Sandeep" },
    "neha-arjun": { names: "Neha & Arjun" },
    "priya-rohan": { names: "Priya & Rohan" },
    "ananya-karan": { names: "Ananya & Karan" },
    "meera-aditya": { names: "Meera & Aditya" },
    "shreya-varun": { names: "Shreya & Varun" },
    "aisha-daniel": { names: "Aisha & Daniel" },
    "riya-kabir": { names: "Riya & Kabir" },
    "divya-sameer": { names: "Divya & Sameer" },
    "simran-yash": { names: "Simran & Yash" }
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
const copyElement = document.getElementById("storyCopy");
const imageElement = document.getElementById("storyImages");
const copy = copyElement ? JSON.parse(copyElement.textContent) : {};
const imageData = imageElement ? JSON.parse(imageElement.textContent) : {};
const videoId = copy.videoId || document.body.dataset.video;
const place = copy.place || document.body.dataset.place;
const date = copy.date || document.body.dataset.date;
const tone = copy.tone || document.body.dataset.tone;
const quote = copy.quote || document.body.dataset.quote;
const fallbackImages = imageSets.slice(storyIndex).concat(imageSets.slice(0, storyIndex)).map(id => imageUrl(id));
const pageImages = imageData.images && imageData.images.length ? imageData.images : (copy.images && copy.images.length ? copy.images : fallbackImages);
const image = offset => pageImages[offset % pageImages.length];

document.title = `${story.names} - Wedding Story`;
document.body.style.setProperty("--hero-image", `url("${image(0)}")`);
document.body.style.setProperty("--cinematic-image", `url("${image(2)}")`);
document.body.style.setProperty("--final-image", `url("${image(4)}")`);

document.getElementById("storyContent").innerHTML = `
    <section class="story-hero">
        <div class="story-hero-content reveal"><div><p class="eyebrow">${copy.heroLabel || "Wedding Story"}</p><h1>${copy.heroTitle || story.names.replace(" & ", "<br>&amp; ")}</h1></div><div class="hero-details">${place}<br>${date}<br>${tone}</div></div>
    </section>
    <section class="story-intro reveal"><div><p class="story-number">${copy.introLabel}</p><h2>${copy.introTitle}</h2></div><div class="story-text"><p>${copy.introText}</p><div class="story-meta"><div class="meta"><span>${copy.metaCoupleLabel}</span><span>${story.names}</span></div><div class="meta"><span>${copy.metaLocationLabel}</span><span>${place}</span></div><div class="meta"><span>${copy.metaPhotoLabel}</span><span>We The Photographers</span></div></div></div></section>
    <section class="full-image reveal"><img src="${image(1)}" alt="${story.names} wedding story"></section>
    <section class="image-story reveal"><div class="image-story-image"><img src="${image(2, 1400)}" alt="${copy.beforeImageAlt}"></div><div class="image-story-text"><p class="section-label">${copy.beforeLabel}</p><h2>${copy.beforeTitle}</h2><p>${copy.beforeText}</p></div></section>
    <section class="image-pair reveal"><div class="image"><img src="${image(3, 1400)}" alt="Wedding details for ${story.names}"></div><div class="image"><img src="${image(4, 1400)}" alt="${story.names} portrait"></div></section>
    ${videoId ? `<section class="highlights reveal" aria-labelledby="highlightsTitle"><div class="highlights-heading"><div><p class="section-label">${copy.videoLabel}</p><h2 id="highlightsTitle">${copy.videoTitle}</h2></div><p>${copy.videoText}</p></div><div class="video-frame" data-video-id="${encodeURIComponent(videoId)}"><div class="video-poster" style="background-image: url('https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/maxresdefault.jpg');"><button class="video-play" type="button" aria-label="Play ${copy.videoTitle}"><span aria-hidden="true"></span></button><p class="video-play-label">Play highlights</p></div><iframe title="${copy.videoTitle}" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div></section>` : ""}
    <section class="cinematic reveal"><div><blockquote>&quot;${copy.quote || quote}&quot;</blockquote><small>${copy.quoteCredit}</small></div></section>
    <section class="image-story reverse reveal"><div class="image-story-text"><p class="section-label">${copy.ceremonyLabel}</p><h2>${copy.ceremonyTitle}</h2><p>${copy.ceremonyText}</p></div><div class="image-story-image"><img src="${image(5, 1400)}" alt="${copy.ceremonyImageAlt}"></div></section>
    <section class="three-grid reveal"><div class="image"><img src="${image(6, 1200)}" alt="${copy.gridImageOneAlt}"></div><div class="image"><img src="${image(7, 1200)}" alt="${copy.gridImageTwoAlt}"></div><div class="image"><img src="${image(8, 1200)}" alt="${copy.gridImageThreeAlt}"></div></section>
    <section class="final-image reveal"><div class="final-caption"><span>${copy.finalLabel}</span><h2>${copy.finalTitle}</h2></div></section>
    <section class="cta reveal"><p class="section-label">${copy.ctaLabel}</p><h2>${copy.ctaTitle}</h2><p>${copy.ctaText}</p><a class="cta-button" href="../Index.html#contact">${copy.ctaButton} &rarr;</a></section>
`;

const storyNav = document.querySelector(".story-nav");
const revealElements = document.querySelectorAll(".reveal");
const videoFrames = document.querySelectorAll(".video-frame[data-video-id]");

function startHighlightVideo(frame, withSound = true) {
    const videoId = frame.dataset.videoId;
    const iframe = frame.querySelector("iframe");
    const poster = frame.querySelector(".video-poster");

    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=${withSound ? 0 : 1}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&playsinline=1`;
    frame.classList.add("is-playing");
    poster.setAttribute("aria-hidden", "true");

    window.setTimeout(() => {
        poster.classList.add("is-hidden");
    }, 2000);
}

videoFrames.forEach(frame => {
    frame.querySelector(".video-play").addEventListener("click", () => startHighlightVideo(frame, true));
});

if (videoFrames.length && "IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains("is-playing")) {
                startHighlightVideo(entry.target);
                videoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.45 });

    videoFrames.forEach(frame => videoObserver.observe(frame));
}

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
