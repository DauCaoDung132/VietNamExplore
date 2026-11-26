const slideshow = document.querySelector(".hero-slideshow");
const slides = [...document.querySelectorAll(".hero-slide")];
const dots = [...document.querySelectorAll(".slide-dot")];
const prevButton = document.querySelector("#prev-slide");
const nextButton = document.querySelector("#next-slide");
const regionText = document.querySelector("#slide-region");
const captionText = document.querySelector("#slide-caption");
const statusText = document.querySelector("#slide-status");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const slideIntervalMs = 5000;

let currentIndex = 0;
let autoSlideTimer = null;
let isHovered = false;
let hasFocusWithin = false;

function showSlide(targetIndex) {
  currentIndex = (targetIndex + slides.length) % slides.length;

  for (let i = 0; i < slides.length; i++) {
    const isCurrent = i === currentIndex;
    slides[i].hidden = !isCurrent;
    slides[i].classList.toggle("is-active", isCurrent);
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].setAttribute("aria-pressed", String(i === currentIndex));
  }

  const activeSlide = slides[currentIndex];
  regionText.textContent = activeSlide.dataset.region;
  captionText.textContent = activeSlide.dataset.caption;
  statusText.textContent = `${currentIndex + 1} / ${slides.length}`;
}

function stopAutoSlide() {
  if (autoSlideTimer !== null) {
    clearInterval(autoSlideTimer);
    autoSlideTimer = null;
  }
}

function syncAutoSlide() {
  const shouldPause = isHovered || hasFocusWithin;
  slideshow.classList.toggle("is-paused", shouldPause);
  stopAutoSlide();

  if (shouldPause || reducedMotion.matches || slides.length <= 1) {
    return;
  }

  autoSlideTimer = setInterval(() => {
    showSlide(currentIndex + 1);
  }, slideIntervalMs);
}

prevButton.addEventListener("click", () => {
  showSlide(currentIndex - 1);
  syncAutoSlide();
});

nextButton.addEventListener("click", () => {
  showSlide(currentIndex + 1);
  syncAutoSlide();
});

for (const dot of dots) {
  dot.addEventListener("click", () => {
    showSlide(Number(dot.dataset.index));
    syncAutoSlide();
  });
}

slideshow.addEventListener("mouseenter", () => {
  isHovered = true;
  syncAutoSlide();
});

slideshow.addEventListener("mouseleave", () => {
  isHovered = false;
  syncAutoSlide();
});

slideshow.addEventListener("focusin", () => {
  hasFocusWithin = true;
  syncAutoSlide();
});

slideshow.addEventListener("focusout", (event) => {
  hasFocusWithin = Boolean(
    event.relatedTarget && slideshow.contains(event.relatedTarget)
  );
  syncAutoSlide();
});

if (typeof reducedMotion.addEventListener === "function") {
  reducedMotion.addEventListener("change", syncAutoSlide);
}

showSlide(0);
syncAutoSlide();
