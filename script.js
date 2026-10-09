const slides = document.querySelectorAll(".carousel-slide");
const indicators = document.querySelectorAll(".carousel-indicator");
const previousButton = document.querySelector("#carouselPrev");
const nextButton = document.querySelector("#carouselNext");
const carousel = document.querySelector(".carousel");

let currentSlide = 0;
let autoplay;

function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === currentSlide;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
    });

    indicators.forEach((indicator, indicatorIndex) => {
        const isActive = indicatorIndex === currentSlide;
        indicator.classList.toggle("is-active", isActive);
        indicator.setAttribute("aria-current", isActive ? "true" : "false");
    });
}

function startAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(() => showSlide(currentSlide + 1), 5000);
}

function stopAutoplay() {
    clearInterval(autoplay);
}

previousButton.addEventListener("click", () => {
    showSlide(currentSlide - 1);
    startAutoplay();
});

nextButton.addEventListener("click", () => {
    showSlide(currentSlide + 1);
    startAutoplay();
});

indicators.forEach((indicator, indicatorIndex) => {
    indicator.addEventListener("click", () => {
        showSlide(indicatorIndex);
        startAutoplay();
    });
});

carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", startAutoplay);
carousel.addEventListener("focusin", stopAutoplay);
carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) {
        startAutoplay();
    }
});

showSlide(0);
startAutoplay();
