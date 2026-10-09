
const cafeteriaDatabase = {
    menu: [
        { name: "Expresso", category: "Cafés", price: "R$ 6,00", description: "Intenso, encorpado e extraído na hora.", icon: "coffee" },
        { name: "Cappuccino", category: "Cafés", price: "R$ 12,00", description: "Café, leite vaporizado e espuma cremosa.", icon: "cup" },
        { name: "Latte de baunilha", category: "Cafés", price: "R$ 14,00", description: "Leite cremoso, expresso e um toque de baunilha.", icon: "latte" },
        { name: "Bolo de chocolate", category: "Doces", price: "R$ 11,00", description: "Massa fofinha com cobertura de chocolate.", icon: "cake" },
        { name: "Cheesecake de frutas", category: "Doces", price: "R$ 13,00", description: "Cheesecake leve servido com frutas da estação.", icon: "cake" },
        { name: "Cookie artesanal", category: "Doces", price: "R$ 8,00", description: "Cookie crocante por fora e macio por dentro.", icon: "cookie" },
        { name: "Croissant de queijo", category: "Salgados", price: "R$ 12,00", description: "Massa folhada dourada com queijo derretido.", icon: "croissant" },
        { name: "Quiche de alho-poró", category: "Salgados", price: "R$ 16,00", description: "Recheio cremoso em uma massa leve e crocante.", icon: "quiche" },
        { name: "Sanduíche natural", category: "Salgados", price: "R$ 18,00", description: "Pão artesanal, frango, folhas e molho da casa.", icon: "sandwich" }
    ]
};

const menuItems = cafeteriaDatabase.menu;

const menuIcons = {
    coffee: '<svg viewBox="0 0 64 64" role="img" aria-label="Café"><path d="M14 25h31v13a12 12 0 0 1-12 12H26a12 12 0 0 1-12-12V25Z"/><path d="M45 29h4a8 8 0 0 1 0 16h-5M20 18c-3-4 3-5 0-9M31 18c-3-4 3-5 0-9M42 18c-3-4 3-5 0-9"/></svg>',
    cup: '<svg viewBox="0 0 64 64" role="img" aria-label="Cappuccino"><path d="M15 25h34v13a12 12 0 0 1-12 12H27a12 12 0 0 1-12-12V25Z"/><path d="M49 29h3a8 8 0 0 1 0 16h-4M20 19h24M24 14h16"/></svg>',
    latte: '<svg viewBox="0 0 64 64" role="img" aria-label="Latte"><path d="M19 13h26l-3 38H22l-3-38Z"/><path d="M17 20h30M25 7c-3 4 4 5 0 9M36 7c-3 4 4 5 0 9"/></svg>',
    cake: '<svg viewBox="0 0 64 64" role="img" aria-label="Bolo"><path d="M12 28h40v23H12z"/><path d="M12 28c0-6 9-6 13 0 4-6 10-6 14 0 4-6 13-6 13 0M12 39h40"/></svg>',
    cookie: '<svg viewBox="0 0 64 64" role="img" aria-label="Cookie"><path d="M49 30a17 17 0 1 1-16-16 8 8 0 0 0 16 16Z"/><circle cx="25" cy="35" r="2"/><circle cx="35" cy="44" r="2"/><circle cx="39" cy="29" r="2"/></svg>',
    croissant: '<svg viewBox="0 0 64 64" role="img" aria-label="Croissant"><path d="M10 44c5-20 39-28 44-10-8 1-11 8-13 17-7-5-15-7-31-7Z"/><path d="M24 39c4-7 9-12 16-14M34 44c3-7 7-11 13-13"/></svg>',
    quiche: '<svg viewBox="0 0 64 64" role="img" aria-label="Quiche"><path d="M12 29h40v8a20 20 0 0 1-40 0v-8Z"/><path d="M12 29c4-9 36-9 40 0M21 37h22M26 27v-7M38 27v-7"/></svg>',
    sandwich: '<svg viewBox="0 0 64 64" role="img" aria-label="Sanduíche"><path d="m12 25 40-8-3 12-34 8-3-12ZM15 37l34-8 3 12-34 8-3-12Z"/><path d="m19 36 3-5M29 34l3-5M39 32l3-5"/></svg>'
};

function renderMenuIcon(iconName) {
    return menuIcons[iconName] || menuIcons.coffee;
}

const select = (selector) => document.querySelector(selector);

function setupCarousel() {
    const slides = document.querySelectorAll(".carousel-slide");
    const indicators = document.querySelectorAll(".carousel-indicator");
    const previousButton = select("#carouselPrev");
    const nextButton = select("#carouselNext");
    const carousel = select(".carousel");

    if (!carousel || !slides.length) return;

    let currentSlide = 0;
    let autoplay;
    const showSlide = (index) => {
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
    };
    const startAutoplay = () => {
        clearInterval(autoplay);
        autoplay = setInterval(() => showSlide(currentSlide + 1), 5000);
    };

    previousButton?.addEventListener("click", () => { showSlide(currentSlide - 1); startAutoplay(); });
    nextButton?.addEventListener("click", () => { showSlide(currentSlide + 1); startAutoplay(); });
    indicators.forEach((indicator, index) => indicator.addEventListener("click", () => {
        showSlide(index);
        startAutoplay();
    }));
    carousel.addEventListener("mouseenter", () => clearInterval(autoplay));
    carousel.addEventListener("mouseleave", startAutoplay);
    showSlide(0);
    startAutoplay();
}

function setupMenu() {
    const grid = select("#menuGrid");
    const filters = select("#menuFilters");
    if (!grid || !filters) return;

    const categories = ["Todos", ...new Set(menuItems.map((item) => item.category))];
    let activeCategory = "Todos";
    const render = () => {
        const items = activeCategory === "Todos"
            ? menuItems
            : menuItems.filter((item) => item.category === activeCategory);
        grid.innerHTML = items.map((item) => `
            <article class="menu-item">
                <div class="menu-item-icon">${renderMenuIcon(item.icon)}</div>
                <div class="menu-item-content">
                    <div class="menu-item-title"><h3>${item.name}</h3><strong>${item.price}</strong></div>
                    <p>${item.description}</p>
                    <div class="menu-category">${item.category}</div>
                </div>
            </article>
        `).join("");
    };
    filters.innerHTML = categories.map((category) =>
        `<button class="filter-button${category === activeCategory ? " is-active" : ""}" type="button">${category}</button>`
    ).join("");
    filters.querySelectorAll(".filter-button").forEach((button) => button.addEventListener("click", () => {
        activeCategory = button.textContent;
        filters.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("is-active", item === button));
        render();
    }));
    render();
}

function setupNavigation() {
    const toggle = select("#menuToggle");
    const nav = select("#nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("active");
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });
}

function setupContactForm() {
    const form = select("#contactForm");
    const feedback = select("#formFeedback");
    if (!form || !feedback) return;
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        feedback.textContent = "Mensagem enviada! Responderemos em breve.";
        form.reset();
    });
}

function setupBackToTop() {
    const button = select("#backToTop");
    if (!button) return;
    window.addEventListener("scroll", () => button.classList.toggle("visible", window.scrollY > 300));
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

setupCarousel();
setupMenu();
setupNavigation();
setupContactForm();
setupBackToTop();
