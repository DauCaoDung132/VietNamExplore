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

function startAutoSlide() {
  stopAutoSlide();

  if (reducedMotion.matches || slides.length <= 1) {
    return;
  }

  autoSlideTimer = setInterval(() => {
    showSlide(currentIndex + 1);
  }, slideIntervalMs);
}

prevButton.addEventListener("click", () => {
  showSlide(currentIndex - 1);
  startAutoSlide();
});

nextButton.addEventListener("click", () => {
  showSlide(currentIndex + 1);
  startAutoSlide();
});

for (const dot of dots) {
  dot.addEventListener("click", () => {
    showSlide(Number(dot.dataset.index));
    startAutoSlide();
  });
}

slideshow.addEventListener("mouseenter", () => {
  slideshow.classList.add("is-paused");
  stopAutoSlide();
});

slideshow.addEventListener("mouseleave", () => {
  slideshow.classList.remove("is-paused");
  startAutoSlide();
});

slideshow.addEventListener("focusin", () => {
  slideshow.classList.add("is-paused");
  stopAutoSlide();
});

slideshow.addEventListener("focusout", (event) => {
  if (!slideshow.contains(event.relatedTarget)) {
    slideshow.classList.remove("is-paused");
    startAutoSlide();
  }
});

showSlide(0);
startAutoSlide();
