const stories = {
    "shrutika-sandeep": { names: "Shrutika & Sandeep" },
    "darshni-diven": { names: "Darshni & Diven" },
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
    "d155fe7ac01d02eb/IQC5KBzWAgaRSqbLA67GSiCyAakHg-VZNZuWfCnDODmVbxE?e=3XWdRh",
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

const imageUrl = (id, width = 2200) => `https://1drv.ms/i/c/${id}?width=${width}&height=0&cropmode=none`;
const browserImageUrl = source => {
    if (typeof source !== "string" || !source.includes("1drv.ms")) return source;
    return `${source}${source.includes("?") ? "&" : "?"}download=1`;
};
const storyKey = document.body.dataset.couple;
const story = stories[storyKey];
const storyIndex = Object.keys(stories).indexOf(storyKey);
const copyElement = document.getElementById("storyCopy");
const imageElement = document.getElementById("storyImages");
const copy = copyElement ? JSON.parse(copyElement.textContent) : {};
const imageData = imageElement ? JSON.parse(imageElement.textContent) : {};
const legacyImages = copy.images || [];
const legacyImage = index => legacyImages[index] || imageSets[index];
const legacyGalleryImages = Array.from({ length: 15 }, (_, index) => legacyImages[index] || imageSets[index % imageSets.length]).map((source, index) => {
    const entry = typeof source === "string" ? { id: source } : source;
    return { ...entry, alt: entry.alt || `${story.names} wedding moment ${index + 1}` };
});
const sections = copy.sections || {
    hero: { image: legacyImage(0), videoId: copy.videoId, place: copy.place, date: copy.date, tone: copy.tone, heroLabel: copy.heroLabel, heroTitle: copy.heroTitle },
    intro: { image: legacyImage(1), introLabel: copy.introLabel, introTitle: copy.introTitle, introText: copy.introText, metaCoupleLabel: copy.metaCoupleLabel, metaLocationLabel: copy.metaLocationLabel, metaPhotoLabel: copy.metaPhotoLabel },
    before: { image: legacyImage(2), beforeImageAlt: copy.beforeImageAlt, beforeLabel: copy.beforeLabel, beforeTitle: copy.beforeTitle, beforeText: copy.beforeText },
    video: { videoLabel: copy.videoLabel, videoTitle: copy.videoTitle, videoText: copy.videoText },
    quote: { quote: copy.quote, quoteCredit: copy.quoteCredit },
    ceremony: { image: legacyImage(5), ceremonyLabel: copy.ceremonyLabel, ceremonyTitle: copy.ceremonyTitle, ceremonyText: copy.ceremonyText, ceremonyImageAlt: copy.ceremonyImageAlt },
    gallery: { images: legacyGalleryImages },
    final: { image: legacyImage(4), finalLabel: copy.finalLabel, finalTitle: copy.finalTitle },
    cta: { ctaLabel: copy.ctaLabel, ctaTitle: copy.ctaTitle, ctaText: copy.ctaText, ctaButton: copy.ctaButton }
};
Object.assign(copy, ...Object.values(sections));
const videoId = copy.videoId || document.body.dataset.video;
const place = copy.place || document.body.dataset.place;
const date = copy.date || document.body.dataset.date;
const tone = copy.tone || document.body.dataset.tone;
const quote = copy.quote || document.body.dataset.quote;
const fallbackImages = imageSets.slice(storyIndex).concat(imageSets.slice(0, storyIndex)).map(id => ({ id }));
const configuredImages = sections.gallery && sections.gallery.images && sections.gallery.images.length ? sections.gallery.images : (imageData.images && imageData.images.length ? imageData.images : (copy.images && copy.images.length ? copy.images : fallbackImages));
const pageImages = configuredImages.map(source => {
    const entry = typeof source === "string" ? { id: source } : source;
    return { ...entry, src: entry.src || (entry.id.startsWith("http") ? entry.id : imageUrl(entry.id)) };
});
const image = offset => pageImages[offset % pageImages.length].src;
const resolveImageSource = source => {
    if (typeof source === "object") return source.src || resolveImageSource(source.id);
    return source.startsWith("http") ? browserImageUrl(source) : imageUrl(source);
};
const sectionImage = (section, fallbackOffset) => section && section.image !== undefined ? (typeof section.image === "number" ? image(section.image) : resolveImageSource(section.image)) : image(fallbackOffset);
const galleryImages = pageImages.slice(0, 15);

const heroImage = sectionImage(sections.hero, 0);

document.title = `${story.names} - Wedding Story`;
document.body.style.setProperty("--hero-image", `url("${heroImage}")`);
document.body.style.setProperty("--cinematic-image", `url("${image(2)}")`);
document.body.style.setProperty("--final-image", `url("${sectionImage(sections.final, 4)}")`);

if (heroImage.includes("1drv.ms")) {
    const heroPreload = new Image();
    heroPreload.onerror = () => {
        document.body.style.setProperty("--hero-image", `url("${image(0)}")`);
    };
    heroPreload.src = heroImage;
}

document.getElementById("storyContent").innerHTML = `
    <section class="story-hero${videoId ? " story-hero--video" : ""}">
        ${videoId ? `<iframe class="story-hero-video" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&mute=1&controls=0&loop=1&playlist=${encodeURIComponent(videoId)}&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&playsinline=1&autohide=1" title="${copy.heroLabel}" allow="autoplay; encrypted-media" tabindex="-1" aria-hidden="true"></iframe>` : ""}
        <div class="story-hero-content reveal"><div><p class="eyebrow">${copy.heroLabel || "Wedding Story"}</p><h1>${copy.heroTitle || story.names.replace(" & ", "<br>&amp; ")}</h1></div><div class="hero-details">${place}<br>${date}<br>${tone}</div></div>
    </section>
    <section class="story-intro reveal"><div><p class="story-number">${copy.introLabel}</p><h2>${copy.introTitle}</h2></div><div class="story-text"><p>${copy.introText}</p><div class="story-meta"><div class="meta"><span>${copy.metaCoupleLabel}</span><span>${story.names}</span></div><div class="meta"><span>${copy.metaLocationLabel}</span><span>${place}</span></div><div class="meta"><span>${copy.metaPhotoLabel}</span><span>We The Photographers</span></div></div></div></section>
    <section class="full-image reveal"><img src="${sectionImage(sections.intro, 1)}" alt="${story.names} wedding story"></section>
    <section class="image-story reveal"><div class="image-story-image"><img src="${sectionImage(sections.before, 2)}" alt="${copy.beforeImageAlt}"></div><div class="image-story-text"><p class="section-label">${copy.beforeLabel}</p><h2>${copy.beforeTitle}</h2><p>${copy.beforeText}</p></div></section>
    <section class="image-pair reveal"><div class="image"><img src="${image(3, 1400)}" alt="Wedding details for ${story.names}"></div><div class="image"><img src="${image(4, 1400)}" alt="${story.names} portrait"></div></section>
    ${videoId ? `<section class="highlights reveal" aria-labelledby="highlightsTitle"><div class="highlights-heading"><div><p class="section-label">${copy.videoLabel}</p><h2 id="highlightsTitle">${copy.videoTitle}</h2></div><p>${copy.videoText}</p></div><div class="video-frame" data-video-id="${encodeURIComponent(videoId)}"><div class="video-poster" style="background-image: url('https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/maxresdefault.jpg');"><button class="video-play" type="button" aria-label="Play ${copy.videoTitle}"><span aria-hidden="true"></span></button><p class="video-play-label">Play highlights</p></div><iframe title="${copy.videoTitle}" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div></section>` : ""}
    <section class="cinematic reveal"><div><blockquote>&quot;${copy.quote || quote}&quot;</blockquote><small>${copy.quoteCredit}</small></div></section>
    <section class="image-story reverse reveal"><div class="image-story-text"><p class="section-label">${copy.ceremonyLabel}</p><h2>${copy.ceremonyTitle}</h2><p>${copy.ceremonyText}</p></div><div class="image-story-image"><img src="${sectionImage(sections.ceremony, 5)}" alt="${copy.ceremonyImageAlt}"></div></section>
    <section class="story-gallery reveal" aria-labelledby="galleryTitle"><div class="story-gallery-heading"><div><p class="section-label">The Full Story</p><h2 id="galleryTitle">Moments to<br>remember.</h2></div><p>Fifteen frames from ${story.names}'s celebration.</p></div><div class="story-gallery-grid">${galleryImages.map((galleryImage, index) => `<figure class="story-gallery-image"><img src="${galleryImage.src}" alt="${galleryImage.alt || `${story.names} wedding moment ${index + 1}`}" loading="eager"></figure>`).join("")}</div></section>
    <section class="final-image reveal"><div class="final-caption"><span>${copy.finalLabel}</span><h2>${copy.finalTitle}</h2></div></section>
    <section class="cta reveal"><p class="section-label">${copy.ctaLabel}</p><h2>${copy.ctaTitle}</h2><p>${copy.ctaText}</p><a class="cta-button" href="contact.html">${copy.ctaButton} &rarr;</a></section>
`;

document.body.insertAdjacentHTML("beforeend", `
    <div class="image-lightbox" id="imageLightbox" aria-hidden="true">
        <div class="image-lightbox-panel" role="dialog" aria-modal="true" aria-label="Full-size wedding photograph">
            <button class="image-lightbox-close" type="button" aria-label="Close image viewer">&times;</button>
            <img class="image-lightbox-preview" alt="">
            <p class="image-lightbox-caption"></p>
        </div>
    </div>
`);

const imageLightbox = document.getElementById("imageLightbox");
const imageLightboxPreview = imageLightbox.querySelector(".image-lightbox-preview");
const imageLightboxCaption = imageLightbox.querySelector(".image-lightbox-caption");
const imageLightboxClose = imageLightbox.querySelector(".image-lightbox-close");
let lastFocusedGalleryImage;

function closeImageLightbox() {
    imageLightbox.classList.remove("is-open");
    imageLightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    if (lastFocusedGalleryImage) lastFocusedGalleryImage.focus();
}

function openImageLightbox(imageElement) {
    lastFocusedGalleryImage = imageElement.closest(".story-gallery-image");
    imageLightboxPreview.src = imageElement.currentSrc || imageElement.src;
    imageLightboxPreview.alt = imageElement.alt;
    imageLightboxCaption.textContent = imageElement.alt;
    imageLightbox.classList.add("is-open");
    imageLightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    imageLightboxClose.focus();
}

document.querySelectorAll(".story-gallery-image").forEach(item => {
    const imageElement = item.querySelector("img");
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.setAttribute("aria-label", `View full-size image: ${imageElement.alt}`);
    item.addEventListener("click", () => openImageLightbox(imageElement));
    item.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openImageLightbox(imageElement);
        }
    });
});

imageLightboxClose.addEventListener("click", closeImageLightbox);
imageLightbox.addEventListener("click", event => {
    if (event.target === imageLightbox) closeImageLightbox();
});
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && imageLightbox.classList.contains("is-open")) closeImageLightbox();
});

let galleryLayoutFrame;

function layoutJustifiedGallery() {
    const gallery = document.querySelector(".story-gallery-grid");
    if (!gallery) return;

    const items = [...gallery.querySelectorAll(".story-gallery-image")];
    const galleryWidth = gallery.clientWidth;
    const gap = 12;
    const targetRowHeight = Math.min(360, Math.max(180, galleryWidth / 3.5));
    const rows = [];
    let currentRow = [];
    let currentAspectTotal = 0;

    items.forEach((item, index) => {
        const image = item.querySelector("img");
        const aspectRatio = image.naturalWidth && image.naturalHeight ? image.naturalWidth / image.naturalHeight : 1.35;
        const nextAspectTotal = currentAspectTotal + aspectRatio;
        const nextRowHeight = (galleryWidth - gap * currentRow.length) / nextAspectTotal;

        if (currentRow.length > 1 && nextRowHeight < targetRowHeight) {
            rows.push({ items: currentRow, aspectTotal: currentAspectTotal });
            currentRow = [];
            currentAspectTotal = 0;
        }

        currentRow.push(item);
        currentAspectTotal += aspectRatio;

        if (index === items.length - 1) {
            rows.push({ items: currentRow, aspectTotal: currentAspectTotal });
        }
    });

    gallery.replaceChildren(...rows.map(row => {
        const rowElement = document.createElement("div");
        const rowHeight = (galleryWidth - gap * (row.items.length - 1)) / row.aspectTotal;
        rowElement.className = "story-gallery-row";
        rowElement.style.setProperty("--row-height", `${rowHeight}px`);

        row.items.forEach(item => {
            const image = item.querySelector("img");
            const aspectRatio = image.naturalWidth && image.naturalHeight ? image.naturalWidth / image.naturalHeight : 1.35;
            item.style.setProperty("--image-ratio", aspectRatio);
            rowElement.appendChild(item);
        });

        return rowElement;
    }));
}

function scheduleGalleryLayout() {
    cancelAnimationFrame(galleryLayoutFrame);
    galleryLayoutFrame = requestAnimationFrame(layoutJustifiedGallery);
}

document.querySelectorAll(".story-gallery-image img").forEach(image => {
    image.addEventListener("load", scheduleGalleryLayout, { once: true });
});
layoutJustifiedGallery();
window.addEventListener("resize", scheduleGalleryLayout, { passive: true });

const storyNav = document.querySelector(".story-nav");
const revealElements = document.querySelectorAll(".reveal");
const videoFrames = document.querySelectorAll(".video-frame[data-video-id]");
const heroVideo = document.querySelector(".story-hero-video");

if (heroVideo) {
    heroVideo.addEventListener("load", () => {
        heroVideo.closest(".story-hero").classList.add("story-hero-video-ready");
    }, { once: true });
}

function startHighlightVideo(frame, withSound = true) {
    const videoId = frame.dataset.videoId;
    const iframe = frame.querySelector("iframe");
    const poster = frame.querySelector(".video-poster");

    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=${withSound ? 0 : 1}&rel=0&playsinline=1`;
    frame.classList.add("is-playing");
    poster.setAttribute("aria-hidden", "true");
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
