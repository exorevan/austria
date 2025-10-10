// On-scroll card animations
const animatedElements = document.querySelectorAll('.animated-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
animatedElements.forEach(el => observer.observe(el));

// Scroll to top button logic
const toTopButton = document.getElementById("to-top-button");
window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        toTopButton.classList.remove("hidden");
    } else {
        toTopButton.classList.add("hidden");
    }
});
toTopButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href').substring(1) === entry.target.id);
            });
        }
    });
}, { rootMargin: '-50% 0px -50% 0px' });
sections.forEach(section => observerNav.observe(section));

// Theme toggle (dark mode)
const themeToggleBtn = document.getElementById('theme-toggle');
const rootEl = document.documentElement;
if (themeToggleBtn) {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        rootEl.classList.add('dark');
    }
    themeToggleBtn.addEventListener('click', () => {
        rootEl.classList.toggle('dark');
        localStorage.setItem('theme', rootEl.classList.contains('dark') ? 'dark' : 'light');
        if (typeof updateAllChartsTheme === 'function') updateAllChartsTheme();
    });
}

// Chart configurations (theme-aware)
Chart.defaults.font.family = "'Inter', sans-serif"; // Set default font for charts

function getThemeColors() {
    const isDark = document.documentElement.classList.contains('dark');
    return {
        chartText: isDark ? '#e2e8f0' : '#374151', // slate-200 vs gray-700
        chartGrid: isDark ? '#334155' : '#e5e7eb', // slate-700 vs gray-200
    };
}

function applyChartDefaults() {
    const { chartText, chartGrid } = getThemeColors();
    Chart.defaults.color = chartText;
    Chart.defaults.borderColor = chartGrid;
}
applyChartDefaults();
window._charts = window._charts || [];
function registerChart(instance) {
    window._charts.push(instance);
}

// Lazy init charts when they enter viewport
function lazyInitChart(canvasId, configFactory) {
    const el = document.getElementById(canvasId);
    if (!el) return;
    let inited = false;
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !inited) {
                inited = true;
                const ctx = el.getContext('2d');
                // eslint-disable-next-line no-new
                const chart = new Chart(ctx, configFactory());
                registerChart(chart);
                io.disconnect();
            }
        });
    }, { threshold: 0.1 });
    io.observe(el);
}

// Chart for Renewable Energy
lazyInitChart('energyChart', () => ({
    type: 'doughnut',
    data: {
        labels: ['Гидроэнергетика', 'Другие ВИЭ', 'Ископаемое топливо'],
        datasets: [{
            label: 'Источники энергии',
            data: [60, 28, 12],
            backgroundColor: ['#3b82f6', '#10b981', '#64748b'],
            borderColor: '#f8fafc',
            borderWidth: 4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
            tooltip: { callbacks: { label: (c) => `${c.label}: ${c.raw}%` } }
        }
    }
}));

// Chart for GDP comparison
lazyInitChart('gdpChart', () => ({
    type: 'bar',
    data: {
        labels: ['Люксембург', 'Ирландия', 'Дания', 'Нидерланды', 'Австрия', 'Германия', 'Среднее по ЕС', 'Франция', 'Италия', 'Испания', 'Россия'],
        datasets: [{
            label: 'ВВП на душу населения, в тыс. Евро',
            data: [115, 92, 65, 60, 52.5, 51, 39.7, 44, 35, 31, 13],
            backgroundColor: (context) => {
                const lbl = context.chart.data.labels[context.dataIndex];
                if (lbl === 'Австрия') return '#ef4444';
                if (lbl === 'Россия') return '#f59e0b';
                return '#3b82f6cc';
            },
            borderRadius: 5,
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
    }
}));

// Chart for Obesity Rates
lazyInitChart('obesityChart', () => ({
    type: 'bar',
    data: {
        labels: ['Ожирение', 'Избыточный вес', 'Нормальный вес'],
        datasets: [{
            label: 'Процент населения',
            data: [16.6, 34.5, 48.9],
            backgroundColor: ['#ef4444cc', '#f97316cc', '#10b981cc'],
            borderRadius: 5,
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { x: { ticks: { callback: (v) => v + '%' } } }
    }
}));

// Flipping cards logic
// Removed for parks slider replacement

/**
 * Sets up a manual slider with navigation buttons and dots.
 * @param {string} rootElementSelector - CSS selector for the slider's root element.
 * @param {string} buttonPrefix - Prefix for navigation button classes (e.g., 'parks' for '.parks-prev').
 * @param {string} dotAriaLabelPrefix - Prefix for the aria-label of the dots (e.g., 'Перейти к слайду').
 */
function setupManualSlider(rootElementSelector, buttonPrefix, dotAriaLabelPrefix) {
    const slider = document.querySelector(rootElementSelector);
    if (!slider) return;

    const wrapper = slider.querySelector('.slides-wrapper');
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector(`.${buttonPrefix}-prev`);
    const nextBtn = slider.querySelector(`.${buttonPrefix}-next`);
    const dotsContainer = slider.querySelector(`.${buttonPrefix}-dots`);

    // Current slide index
    let current = 0;

    // Create and append dots
    const dots = Array.from({ length: slides.length }, (_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot';
        dot.setAttribute('aria-label', `${dotAriaLabelPrefix} ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
        return dot;
    });

    /** Updates the slider's visual state based on the current slide. */
    function update() {
        const offset = -current * 100;
        wrapper.style.transform = `translateX(${offset}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        if (prevBtn) { // Check if buttons exist before manipulating
            prevBtn.disabled = current === 0;
            prevBtn.classList.toggle('opacity-50', prevBtn.disabled);
        }
        if (nextBtn) {
            nextBtn.disabled = current === slides.length - 1;
            nextBtn.classList.toggle('opacity-50', nextBtn.disabled);
        }
    }

    /**
     * Navigates the slider to a specific index.
     * @param {number} index - The target slide index.
     */
    function goTo(index) {
        if (index < 0 || index >= slides.length) return;
        current = index;
        update();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Keyboard accessibility for the slider container
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
    });

    update();
}

/**
 * Sets up an automatic image slider with fade transitions and dots.
 * @param {string} rootElementSelector - CSS selector for the slider's root element.
 * @param {number} interval - The time in milliseconds between slide changes.
 */
function setupAutoSlider(rootElementSelector, interval = 3000) {
    const slider = document.querySelector(rootElementSelector);
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    let currentIndex = 0;
    let timerId = null; // Для хранения ID таймера

    /**
     * Отображает слайд по указанному индексу и обновляет таймер.
     * @param {number} index - Индекс слайда для отображения.
     */
    function showSlide(index) {
        // Проверяем, чтобы индекс был в допустимых границах
        if (index < 0 || index >= slides.length) return;

        currentIndex = index;

        slides.forEach((img, i) => {
            img.style.opacity = i === currentIndex ? '1' : '0'; // Handles image fade
        });
        dots.forEach((dot, i) => {
            // Use classes for dot styling, handled by CSS
            // Добавляем/убираем класс для стилизации и доступности
            dot.classList.toggle('active', i === currentIndex);
            dot.setAttribute('aria-current', i === currentIndex);
        });
    }

    /** Переключает на следующий слайд. */
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    /** Запускает автоматическое переключение. */
    function startSlider() {
        if (timerId) clearInterval(timerId); // Предотвращаем запуск нескольких таймеров
        timerId = setInterval(nextSlide, interval);
    }

    /** Останавливает автоматическое переключение. */
    const stopSlider = () => clearInterval(timerId);

    // Добавляем обработчики кликов на точки
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            // Перезапускаем таймер, чтобы следующий слайд показался через полный интервал
            stopSlider();
            startSlider();
        });
    });

    slider.addEventListener('mouseenter', stopSlider);
    slider.addEventListener('mouseleave', startSlider);

    showSlide(0); // Показываем первый слайд при инициализации
    startSlider(); // Начинаем авто-прокрутку
}

// Initialize sliders
// Note: glockner-slider dots are now styled via CSS classes and variables,
// so the JS only needs to toggle the 'active' class.
// The 'glockner-dots' container was added to HTML for easier selection.
setupAutoSlider('.glockner-slider', 3000);
setupManualSlider('.parks-slider', 'parks', 'Перейти к слайду');
setupManualSlider('.coffee-slider', 'coffee', 'Перейти к напитку');

// Top charts: happiness, quality of life, safety, life expectancy
(() => {
    const happinessEl = document.getElementById('happinessTopChart');
    const qolEl = document.getElementById('qolTopChart');
    const safetyEl = document.getElementById('safetyTopChart');
    const lifeEl = document.getElementById('lifeTopChart');

    // Helper to safely init chart if element exists
    const initChart = (el, config) => {
        if (!el) return;
        const ctx = el.getContext('2d');
        // eslint-disable-next-line no-new
        new Chart(ctx, config);
    };

    // Note: Demo datasets; replace with latest when available
    initChart(happinessEl, {
        type: 'bar',
        data: {
            labels: ['Финляндия', 'Дания', 'Исландия', 'Швеция', 'Нидерланды', 'Австрия', 'Россия'],
            datasets: [{
                label: 'Счастье (баллы)',
                data: [7.8, 7.6, 7.5, 7.4, 7.4, 6.9, 5.6],
                backgroundColor: (ctx) => {
                    const lbl = ctx.chart.data.labels[ctx.dataIndex];
                    if (lbl === 'Австрия') return '#ef4444';
                    if (lbl === 'Россия') return '#f59e0b';
                    return '#3b82f6cc';
                },
                borderRadius: 5,
            }]
        },
        options: { plugins: { legend: { display: false } }, responsive: true, scales: { y: { beginAtZero: true } } }
    });

    initChart(qolEl, {
        type: 'bar',
        data: {
            labels: ['Цюрих', 'Вена', 'Копенгаген', 'Женева', 'Ванкувер', 'Мюнхен', 'Россия'],
            datasets: [{
                label: 'Индекс качества жизни (отн.)',
                data: [99, 98, 96, 95, 94, 93, 75],
                backgroundColor: (ctx) => {
                    const lbl = ctx.chart.data.labels[ctx.dataIndex];
                    if (lbl === 'Вена') return '#ef4444';
                    if (lbl === 'Россия') return '#f59e0b';
                    return '#10b981cc';
                },
                borderRadius: 5,
            }]
        },
        options: { plugins: { legend: { display: false } }, responsive: true, scales: { y: { beginAtZero: true } } }
    });

    initChart(safetyEl, {
        type: 'bar',
        data: {
            labels: ['Исландия', 'Ирландия', 'Австрия', 'Новая Зеландия', 'Сингапур', 'Швейцария', 'Россия'],
            datasets: [{
                label: 'Миролюбие (чем выше, тем лучше)',
                data: [95, 93, 92, 90, 89, 88, 70],
                backgroundColor: (ctx) => {
                    const lbl = ctx.chart.data.labels[ctx.dataIndex];
                    if (lbl === 'Австрия') return '#ef4444';
                    if (lbl === 'Россия') return '#f59e0b';
                    return '#6366f1cc';
                },
                borderRadius: 5,
            }]
        },
        options: { plugins: { legend: { display: false } }, responsive: true, scales: { y: { beginAtZero: true } } }
    });

    initChart(lifeEl, {
        type: 'bar',
        data: {
            labels: ['Япония', 'Швейцария', 'Сингапур', 'Испания', 'Италия', 'Австрия', 'Россия'],
            datasets: [{
                label: 'Годы',
                data: [84.6, 84.2, 84.0, 83.5, 83.1, 82.4, 72.5],
                backgroundColor: (ctx) => {
                    const lbl = ctx.chart.data.labels[ctx.dataIndex];
                    if (lbl === 'Австрия') return '#ef4444';
                    if (lbl === 'Россия') return '#f59e0b';
                    return '#22c55ecc';
                },
                borderRadius: 5,
            }]
        },
        options: { plugins: { legend: { display: false } }, responsive: true, scales: { y: { beginAtZero: false } } }
    });
})();

// Re-theme existing charts on theme toggle
function updateAllChartsTheme() {
    applyChartDefaults();
    const { chartText, chartGrid } = getThemeColors();
    (window._charts || []).forEach((ch) => {
        const scales = ch.options.scales || {}; // Ensure scales object exists
        if (scales.x) {
            scales.x.ticks = Object.assign({}, scales.x.ticks, { color: text });
            scales.x.grid = Object.assign({}, scales.x.grid, { color: grid });
        }
        if (scales.y) {
            scales.y.ticks = Object.assign({}, scales.y.ticks, { color: text });
            scales.y.grid = Object.assign({}, scales.y.grid, { color: grid });
        }
        ch.options.plugins = ch.options.plugins || {};
        ch.options.plugins.legend = ch.options.plugins.legend || {};
        ch.options.plugins.legend.labels = Object.assign({}, ch.options.plugins.legend.labels, { color: chartText });
        ch.update();
    });
}

/**
 * Sets up a modal window with open/close functionality.
 * @param {string} triggerId - The ID of the element that opens the modal.
 * @param {string} modalId - The ID of the modal container.
 * @param {string} closeBtnId - The ID of the button that closes the modal.
 */
function setupModal(triggerId, modalId, closeBtnId) {
    const trigger = document.getElementById(triggerId);
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeBtnId);

    // Выбираем внутренний контейнер шапки, чтобы избежать его сдвига
    const headerNav = document.querySelector('header nav');

    if (!trigger || !modal || !closeBtn || !headerNav) return;

    const modalContent = modal.querySelector('.transform');

    const openModal = () => {
        // 1. Сделать модальное окно видимым (display: flex)
        modal.classList.remove('hidden');
        // 2. Принудительно перерисовать, чтобы браузер применил display: flex до начала анимации opacity
        void modal.offsetWidth; 
        // 3. Запустить анимацию появления (opacity: 0 -> 1, scale: 0.95 -> 1)
        modal.classList.remove('opacity-0');
        if (modalContent) modalContent.classList.remove('scale-95');
        // Focus the close button for accessibility
        setTimeout(() => closeBtn.focus(), 50);
        document.addEventListener('keydown', handleEsc);
    };

    const closeModal = () => {
        // 1. Запустить анимацию исчезновения (opacity: 1 -> 0, scale: 1 -> 0.95)
        modal.classList.add('opacity-0');
        if (modalContent) modalContent.classList.add('scale-95');
        document.removeEventListener('keydown', handleEsc);

        // 2. Дождаться завершения анимации. После этого:
        //    - полностью скрыть модальное окно
        //    - убрать отступы и вернуть скролл
        //    - вернуть фокус на кнопку
        setTimeout(() => {
            modal.classList.add('hidden');
            trigger.focus(); // Return focus to the element that opened the modal
        }, 300); // Длительность должна соответствовать transition-duration в CSS (duration-300 = 300ms)
    };

    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    };

    trigger.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Initialize modals
setupModal('klimt-card', 'klimt-modal', 'klimt-modal-close');
setupModal('schiele-card', 'schiele-modal', 'schiele-modal-close');
