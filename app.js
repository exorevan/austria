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
Chart.defaults.font.family = "'Inter', sans-serif";
function getChartTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    return {
        text: isDark ? '#e2e8f0' : '#374151', // slate-200 vs gray-700
        grid: isDark ? '#334155' : '#e5e7eb', // slate-700 vs gray-200
    };
}
function applyChartDefaults() {
    const { text, grid } = getChartTheme();
    Chart.defaults.color = text;
    Chart.defaults.borderColor = grid;
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

// Großglockner slider (auto-rotate every 3s)
const glocknerSlider = document.querySelector('.glockner-slider');
if (glocknerSlider) {
    const slides = glocknerSlider.querySelectorAll('.slide');
    const dots = glocknerSlider.querySelectorAll('.dot');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((img, i) => {
            img.style.opacity = i === index ? '1' : '0';
        });
        dots.forEach((dot, i) => {
            dot.style.backgroundColor = i === index ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)';
        });
    }

    showSlide(currentIndex);
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }, 3000);
}

// Parks manual slider (6 slides, text left / image right)
const parksSlider = document.querySelector('.parks-slider');
if (parksSlider) {
    const wrapper = parksSlider.querySelector('.slides-wrapper');
    const slides = parksSlider.querySelectorAll('.slide');
    const prevBtn = parksSlider.querySelector('.parks-prev');
    const nextBtn = parksSlider.querySelector('.parks-next');
    const dotsContainer = parksSlider.querySelector('.parks-dots');

    let current = 0;

    // Build dots
    const dots = Array.from({ length: slides.length }, (_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot';
        dot.setAttribute('aria-label', `Перейти к слайду ${i + 1}`);
        dot.addEventListener('click', () => {
            goTo(i);
        });
        dotsContainer.appendChild(dot);
        return dot;
    });

    function update() {
        const offset = -current * 100;
        wrapper.style.transform = `translateX(${offset}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current === slides.length - 1;
        prevBtn.classList.toggle('opacity-50', prevBtn.disabled);
        nextBtn.classList.toggle('opacity-50', nextBtn.disabled);
    }

    function goTo(index) {
        if (index < 0 || index >= slides.length) return;
        current = index;
        update();
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    // Keyboard accessibility
    parksSlider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
    });

    update();
}

// Coffee drinks manual slider (like parks)
const coffeeSlider = document.querySelector('.coffee-slider');
if (coffeeSlider) {
    const wrapper = coffeeSlider.querySelector('.slides-wrapper');
    const slides = coffeeSlider.querySelectorAll('.slide');
    const prevBtn = coffeeSlider.querySelector('.coffee-prev');
    const nextBtn = coffeeSlider.querySelector('.coffee-next');
    const dotsContainer = coffeeSlider.querySelector('.coffee-dots');

    let current = 0;

    const dots = Array.from({ length: slides.length }, (_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot';
        dot.setAttribute('aria-label', `Перейти к напитку ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
        return dot;
    });

    function update() {
        const offset = -current * 100;
        wrapper.style.transform = `translateX(${offset}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current === slides.length - 1;
        prevBtn.classList.toggle('opacity-50', prevBtn.disabled);
        nextBtn.classList.toggle('opacity-50', nextBtn.disabled);
    }

    function goTo(index) {
        if (index < 0 || index >= slides.length) return;
        current = index;
        update();
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));
    coffeeSlider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
    });

    update();
}

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
    const { text, grid } = getChartTheme();
    (window._charts || []).forEach((ch) => {
        const scales = ch.options.scales || {};
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
        ch.options.plugins.legend.labels = Object.assign({}, ch.options.plugins.legend.labels, { color: text });
        ch.update();
    });
}

// (removed) Mozart audio on click
// Klimt modal open/close
(function setupKlimtModal() {
    const trigger = document.getElementById('klimt-card');
    const modal = document.getElementById('klimt-modal');
    const closeBtn = document.getElementById('klimt-modal-close');
    if (!trigger || !modal || !closeBtn) return;

    const open = () => {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        // focus close button for accessibility
        setTimeout(() => closeBtn.focus(), 0);
        document.body.style.overflow = 'hidden';
    };
    const close = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    };
    trigger.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) close();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) close();
    });
})();

// Schiele modal open/close
(function setupSchieleModal() {
    const trigger = document.getElementById('schiele-card');
    const modal = document.getElementById('schiele-modal');
    const closeBtn = document.getElementById('schiele-modal-close');
    if (!trigger || !modal || !closeBtn) return;

    const open = () => {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => closeBtn.focus(), 0);
        document.body.style.overflow = 'hidden';
    };
    const close = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    };
    trigger.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.classList.contains('hidden')) close(); });
})();


