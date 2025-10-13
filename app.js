/**
 * ==========================================================================
 *  Core: Component Loader
 * ==========================================================================
 */

/**
 * Asynchronously loads an HTML component from a file and injects it into a specified placeholder.
 * Can also replace placeholders within the loaded content, like a simple template engine.
 * @param {string} componentName - The name of the component file without the .html extension (e.g., '_header').
 * @param {string} placeholderId - The ID of the placeholder element where the component will be inserted.
 * @param {Object} [options] - Optional parameters.
 * @param {Function} [options.callback] - A function to execute after the component is loaded.
 * @param {Object} [options.replacements] - A key-value object for template-like replacements (e.g., {'{{TITLE}}': 'My Page'}).
 */
async function loadComponent(componentName, placeholderId, options = {}) {
    const { callback, replacements } = options;
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    // Determine if the current page is a subpage to adjust the path
    const isSubPage = window.location.pathname.includes('/pages/');
    const componentPath = isSubPage ? `../includes/${componentName}.html` : `includes/${componentName}.html`;

    try {
        const response = await fetch(componentPath);
        if (!response.ok) throw new Error(`Не удалось загрузить компонент: ${componentName}`);
        
        let html = await response.text();

        // Perform replacements if any are provided
        if (replacements) {
            for (const key in replacements) {
                html = html.replace(new RegExp(key, 'g'), replacements[key]);
            }
        }

        placeholder.innerHTML = html;

        // If it's the header on a subpage, correct the navigation and logo paths
        if (componentName === '_header' && isSubPage) {
            const navLinks = placeholder.querySelectorAll('a.nav-link');
            navLinks.forEach(link => {
                link.href = link.href.replace('/pages/', '/');
            });
            const homeLink = placeholder.querySelector('a[href$="index.html"]');
            if (homeLink) {
                homeLink.href = '../index.html';
            }
            // Also fix the path for the logo link
            const logoLink = placeholder.querySelector('a.flex.items-center.shrink-0');
            if (logoLink) {
                logoLink.href = '../index.html';
            }
        }

        // Выполняем колбэк, если он есть
        if (callback) callback();

    } catch (error) {
        console.error(`Ошибка при загрузке компонента '${componentName}':`, error);
        placeholder.innerHTML = `<p class="text-center text-red-500">Ошибка загрузки компонента.</p>`;
    }
}

/**
 * ==========================================================================
 *  UI Module: Handles all user interface interactions.
 * ==========================================================================
 */
const UI = {
    /**
     * Initializes the mobile menu, including cloning links and setting up event listeners.
     */
    initializeMobileMenu() {
        const openButton = document.getElementById('mobile-menu-button');
        const closeButton = document.getElementById('side-menu-close-button');
        const sideMenu = document.getElementById('side-menu');
        const overlay = document.getElementById('menu-overlay');
        const navContainer = document.getElementById('side-menu-nav');
        const desktopNav = document.getElementById('desktop-menu');

        if (!openButton || !closeButton || !sideMenu || !overlay || !navContainer || !desktopNav) {
            console.warn("Mobile menu elements not found. Check HTML structure and IDs.");
            return;
        }

        // Clone desktop links into the mobile menu
        navContainer.innerHTML = desktopNav.innerHTML;
        navContainer.classList.add('mobile-nav-container');

        // Adapt cloned links for mobile view
        navContainer.querySelectorAll('a').forEach(link => {
            link.classList.remove('nav-link');
            link.classList.add('mobile-nav-link');
        });

        // Highlight the active link in the newly created mobile menu
        this.updateActiveNavLinks();

        const openMenu = () => {
            overlay.classList.remove('hidden');
            sideMenu.classList.remove('-translate-x-full');
            document.body.style.overflow = 'hidden';
            openButton.setAttribute('aria-expanded', 'true');
            document.addEventListener('keydown', handleEsc);
        };

        const closeMenu = () => {
            overlay.classList.add('hidden');
            sideMenu.classList.add('-translate-x-full');
            document.body.style.overflow = '';
            openButton.setAttribute('aria-expanded', 'false');
            document.removeEventListener('keydown', handleEsc);
        };

        const handleEsc = (e) => {
            if (e.key === 'Escape') closeMenu();
        };

        openButton.addEventListener('click', openMenu);
        closeButton.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);
        navContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') closeMenu();
        });
    },

    /**
     * Sets up the theme toggle button and applies the correct theme on load.
     */
    initializeThemeToggle() {
        const themeToggleBtn = document.getElementById('theme-toggle');
        const rootEl = document.documentElement;
        if (!themeToggleBtn) return;

        // Set initial theme based on localStorage or system preference
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
            rootEl.classList.add('dark');
        }

        // Add click listener to toggle theme
        themeToggleBtn.addEventListener('click', () => {
            rootEl.classList.toggle('dark');
            localStorage.setItem('theme', rootEl.classList.contains('dark') ? 'dark' : 'light');
            Charts.updateAllTheme(); // Notify charts module to re-theme
        });
    },

    /**
     * Finds all navigation links and adds an 'active' class to the one matching the current page URL.
     */
    updateActiveNavLinks() {
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        const currentPath = window.location.pathname;

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkUrl = new URL(link.href);
            // Check for exact path match or special case for index.html
            if (linkUrl.pathname === currentPath ||
               ((currentPath.endsWith('/') || currentPath.endsWith('/index.html')) && linkUrl.pathname.endsWith('/index.html'))) {
                link.classList.add('active');
            }
        });
    },

    /**
     * Initializes the scroll-to-top button, making it appear on scroll.
     */
    initializeScrollToTop() {
        const toTopButton = document.getElementById("to-top-button");
        if (!toTopButton) return;

        window.addEventListener("scroll", () => {
            toTopButton.classList.toggle("hidden", window.scrollY <= 500);
        });
        toTopButton.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    /**
     * Sets up modal window functionality.
     * @param {string} triggerId - ID of the element that opens the modal.
     * @param {string} modalId - ID of the modal container.
     * @param {string} closeBtnId - ID of the button that closes the modal.
     */
    setupModal(triggerId, modalId, closeBtnId) {
        const trigger = document.getElementById(triggerId);
        const modal = document.getElementById(modalId);
        const closeBtn = document.getElementById(closeBtnId);

        if (!trigger || !modal || !closeBtn) return;

        const modalContent = modal.querySelector('.transform');

        const openModal = () => {
            modal.classList.remove('hidden');
            void modal.offsetWidth; // Force reflow for transition
            modal.classList.remove('opacity-0');
            if (modalContent) modalContent.classList.remove('scale-95');
            setTimeout(() => closeBtn.focus(), 50);
            document.addEventListener('keydown', handleEsc);
        };

        const closeModal = () => {
            modal.classList.add('opacity-0');
            if (modalContent) modalContent.classList.add('scale-95');
            document.removeEventListener('keydown', handleEsc);
            setTimeout(() => {
                modal.classList.add('hidden');
                trigger.focus();
            }, 300); // Must match CSS transition duration
        };

        const handleEsc = (e) => {
            if (e.key === 'Escape') closeModal();
        };

        trigger.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    },

    /**
     * Initializes on-scroll animations for elements with the '.animated-card' class.
     */
    initializeScrollAnimations() {
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
    }
};

/**
 * ==========================================================================
 *  Charts Module: Handles all Chart.js logic.
 * ==========================================================================
 */
const Charts = {
    _instances: [],

    /**
     * Sets global Chart.js defaults based on the current theme.
     */
    applyDefaults() {
        const isDark = document.documentElement.classList.contains('dark');
        const colors = {
            text: isDark ? '#e2e8f0' : '#374151',
            grid: isDark ? '#334155' : '#e5e7eb',
        };
        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.color = colors.text;
        Chart.defaults.borderColor = colors.grid;
    },

    /**
     * Lazily initializes a chart when it becomes visible in the viewport.
     * @param {string} canvasId - The ID of the canvas element.
     * @param {Function} configFactory - A function that returns the chart configuration object.
     */
    lazyInit(canvasId, configFactory) {
        const el = document.getElementById(canvasId);
        if (!el) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const chart = new Chart(el.getContext('2d'), configFactory());
                this._instances.push(chart);
                observer.disconnect();
            }
        }, { threshold: 0.1 });
        observer.observe(el);
    },

    /**
     * Updates the theme for all active chart instances.
     */
    updateAllTheme() {
        this.applyDefaults();
        const isDark = document.documentElement.classList.contains('dark');
        const colors = {
            text: isDark ? '#e2e8f0' : '#374151',
            grid: isDark ? '#334155' : '#e5e7eb',
        };

        this._instances.forEach(chart => {
            // Update colors for scales
            for (const scaleId in chart.config.options.scales) {
                const scale = chart.config.options.scales[scaleId];
                if (scale.ticks) scale.ticks.color = colors.text;
                if (scale.grid) scale.grid.color = colors.grid;
            }
            // Update legend color
            if (chart.config.options.plugins?.legend?.labels) {
                chart.config.options.plugins.legend.labels.color = colors.text;
            }
            chart.update();
        });
    },

    // --- Specific Chart Initializers ---

    initEnergyChart() {
        this.lazyInit('energyChart', () => ({
            type: 'doughnut',
            data: {
                labels: ['Гидроэнергетика', 'Другие ВИЭ', 'Ископаемое топливо'],
                datasets: [{
                    data: [60, 28, 12],
                    backgroundColor: ['#3b82f6', '#10b981', '#64748b'],
                    borderColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#f8fafc',
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
    },

    initGdpChart() {
        this.lazyInit('gdpChart', () => ({
            type: 'bar',
            data: {
                labels: ['Люксембург', 'Ирландия', 'Дания', 'Нидерланды', 'Австрия', 'Германия', 'Среднее по ЕС', 'Франция', 'Италия', 'Испания', 'Россия'],
                datasets: [{
                    label: 'ВВП на душу населения, в тыс. Евро',
                    data: [115, 92, 65, 60, 52.5, 51, 39.7, 44, 35, 31, 13],
                    backgroundColor: (ctx) => {
                        const lbl = ctx.chart.data.labels[ctx.dataIndex];
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
    },

    initObesityChart() {
        this.lazyInit('obesityChart', () => ({
            type: 'bar',
            data: {
                labels: ['Ожирение', 'Избыточный вес', 'Нормальный вес'],
                datasets: [{
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
    },

    initComparisonCharts() {
        const charts = [
            { id: 'happinessTopChart', label: 'Счастье (баллы)', data: [7.8, 7.6, 7.5, 7.4, 7.4, 6.9, 5.6], labels: ['Финляндия', 'Дания', 'Исландия', 'Швеция', 'Нидерланды', 'Австрия', 'Россия'], color: '#3b82f6cc' },
            { id: 'qolTopChart', label: 'Индекс качества жизни (отн.)', data: [99, 98, 96, 95, 94, 93, 75], labels: ['Цюрих', 'Вена', 'Копенгаген', 'Женева', 'Ванкувер', 'Мюнхен', 'Россия'], color: '#10b981cc', highlight: 'Вена' },
            { id: 'safetyTopChart', label: 'Миролюбие (GPI)', data: [95, 93, 92, 90, 89, 88, 70], labels: ['Исландия', 'Ирландия', 'Австрия', 'Новая Зеландия', 'Сингапур', 'Швейцария', 'Россия'], color: '#6366f1cc' },
            { id: 'lifeTopChart', label: 'Годы', data: [84.6, 84.2, 84.0, 83.5, 83.1, 82.4, 72.5], labels: ['Япония', 'Швейцария', 'Сингапур', 'Испания', 'Италия', 'Австрия', 'Россия'], color: '#22c55ecc', startAtZero: false }
        ];

        charts.forEach(chartData => {
            this.lazyInit(chartData.id, () => ({
                type: 'bar',
                data: {
                    labels: chartData.labels,
                    datasets: [{
                        label: chartData.label,
                        data: chartData.data,
                        backgroundColor: (ctx) => {
                            const lbl = ctx.chart.data.labels[ctx.dataIndex];
                            if (lbl === (chartData.highlight || 'Австрия')) return '#ef4444';
                            if (lbl === 'Россия') return '#f59e0b';
                            return chartData.color;
                        },
                        borderRadius: 5,
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: chartData.startAtZero !== false } }
                }
            }));
        });
    }
};

/**
 * ==========================================================================
 *  Sliders Module: Handles all slider/carousel logic.
 * ==========================================================================
 */
const Sliders = {
    /**
     * Sets up a manual slider with navigation buttons and dots.
     * @param {HTMLElement} sliderRoot - The root DOM element of the slider.
     * @param {string} dotAriaLabelPrefix - Prefix for the aria-label of the dots.
     */
    setupManual(sliderRoot, dotAriaLabelPrefix) {
        if (!sliderRoot) return;

        const wrapper = sliderRoot.querySelector('.slides-wrapper');
        const slides = sliderRoot.querySelectorAll('.slide');
        const prevBtn = sliderRoot.querySelector('.slider-prev');
        const nextBtn = sliderRoot.querySelector('.slider-next');
        const dotsContainer = sliderRoot.querySelector('.slider-dots');
        let current = 0;

        if (!wrapper || slides.length === 0 || !dotsContainer) return;

        const dots = Array.from({ length: slides.length }, (_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'dot';
            dot.setAttribute('aria-label', `${dotAriaLabelPrefix} ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
            return dot;
        });

        function update() {
            wrapper.style.transform = `translateX(${-current * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
            if (prevBtn) prevBtn.disabled = current === 0;
            if (nextBtn) nextBtn.disabled = current === slides.length - 1;
        }

        function goTo(index) {
            if (index < 0 || index >= slides.length) return;
            current = index;
            update();
        }

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

        sliderRoot.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') goTo(current - 1);
            if (e.key === 'ArrowRight') goTo(current + 1);
        });

        update();
    },

    /**
     * Sets up an automatic image slider with fade transitions.
     * @param {string} rootSelector - CSS selector for the slider's root element.
     * @param {number} interval - Time in milliseconds between slide changes.
     */
    setupAuto(rootSelector, interval = 3000) {
        const slider = document.querySelector(rootSelector);
        if (!slider) return;

        const slides = slider.querySelectorAll('.slide');
        const dots = slider.querySelectorAll('.dot');
        let currentIndex = 0;
        let timerId = null;

        function showSlide(index) {
            currentIndex = index;
            slides.forEach((img, i) => img.style.opacity = i === currentIndex ? '1' : '0');
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
        }

        const nextSlide = () => showSlide((currentIndex + 1) % slides.length);
        const start = () => { if (!timerId) timerId = setInterval(nextSlide, interval); };
        const stop = () => { clearInterval(timerId); timerId = null; };

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stop();
                showSlide(index);
                start();
            });
        });

        slider.addEventListener('mouseenter', stop);
        slider.addEventListener('mouseleave', start);

        showSlide(0);
        start();
    },

    /**
     * Loads a slider template, injects content, and initializes it.
     * @param {string} placeholderId - ID of the element for the slider.
     * @param {string} titleHtml - HTML for the slider's title.
     * @param {string} slidesHtml - HTML for all the slides.
     * @param {string} dotAriaLabelPrefix - ARIA label prefix for dots.
     */
    async loadAndSetup(placeholderId, titleHtml, slidesHtml, dotAriaLabelPrefix) {
        const placeholder = document.getElementById(placeholderId);
        if (!placeholder) return;

        await loadComponent('_manual_slider_template', placeholderId, {
            callback: () => {
                const titleSlot = placeholder.querySelector('#slider-title-slot');
                const slidesSlot = placeholder.querySelector('#slides-slot');
                if (titleSlot) titleSlot.innerHTML = titleHtml;
                if (slidesSlot) slidesSlot.innerHTML = slidesHtml;

                const sliderRoot = placeholder.querySelector('.manual-slider');
                if (sliderRoot) this.setupManual(sliderRoot, dotAriaLabelPrefix);
            }
        });
    }
};

/**
 * ==========================================================================
 *  Dynamic Content Module: Renders data into HTML.
 * ==========================================================================
 */
const Content = {
    /**
     * Renders a list of items into a target container using a template function.
     * @param {string} containerId - The ID of the container element.
     * @param {Array} data - An array of data objects.
     * @param {Function} templateFn - A function that takes a data item and returns an HTML string.
     */
    render(containerId, data, templateFn) {
        const container = document.getElementById(containerId);
        if (!container || !data) return;
        container.innerHTML = data.map(templateFn).join('');
    }
};

/**
 * ==========================================================================
 *  App Router & Initializer
 * ==========================================================================
 */
const App = {
    // Определяем, на какой мы странице
    page: window.location.pathname.split('/').pop().replace('.html', '') || 'index',
    isSubPage: window.location.pathname.includes('/pages/'),

    // Данные для карточек на главной странице
    mainPageCards: [
        { href: 'pages/nature.html', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Grossglockner_from_SW.jpg/1280px-Grossglockner_from_SW.jpg?q=80&w=1964&auto=format&fit=crop', alt: 'Величественные Альпы', title: 'Природа', description: 'Альпы, национальные парки и кристально чистые озера.' },
        { href: 'pages/weather.html', imgSrc: 'https://wallpapers.com/images/hd/4k-mountain-pictures-6f41bj9mg1fu6lhv.jpg', alt: 'Горный пейзаж Австрии в разное время года', title: 'Погода', description: 'Климатические зоны, времена года и их влияние.' },
        { href: 'pages/economy.html', imgSrc: 'https://avatars.mds.yandex.net/i?id=7acd60614c79efc259f4625465c335bb_l-10917798-images-thumbs&n=13', alt: 'Деловой район Вены', title: 'Экономика', description: 'Высокий ВВП, инновации и ключевые отрасли.' },
        { href: 'pages/transport.html', imgSrc: 'https://presse-oebb.at/Content/747422/cd4dce8d-9fa3-44a6-ab66-fa93eaeab727/1200/2400/.jpg?q=80&w=2070&auto=format&fit=fit', alt: 'Скоростной поезд Railjet', title: 'Транспорт', description: 'Эффективность, пунктуальность и KlimaTicket.' },
        { href: 'pages/culture.html', imgSrc: 'https://magazineart.art/wp-content/uploads/opernball_2019_117295-c-michael-poehn.jpg?q=80&w=1965&auto=format&fit=fit', alt: 'Венский оперный бал', title: 'Культура', description: 'От балов и фестивалей до альпийских традиций.' },
        { href: 'pages/food.html', imgSrc: 'https://img.taste.com.au/AUE-WXuq/taste/2016/11/sachertorte-88202-1.jpeg?q=80&w=1974&auto=format&fit=fit', alt: 'Торт Захер', title: 'Еда', description: 'Кулинарное наследие: от шницеля до венских кофеен.' },
        { href: 'pages/history.html', imgSrc: 'https://www.bpb.de/cache/images/7/309807_teaser_widh_800.jpg?4CD99', alt: 'Подписание Государственного договора в 1955', title: 'История', description: 'Ключевые эпохи: от империи Габсбургов до Второй республики.' },
        { href: 'pages/people.html', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Wolfgang-amadeus-mozart_1.jpg/330px-Wolfgang-amadeus-mozart_1.jpg?q=80&w=1964&auto=format&fit=fit', alt: 'Портрет Моцарта', title: 'Личности', description: 'Гении, изменившие мир: от Моцарта до Фрейда.' },
        { href: 'pages/misc.html', imgSrc: 'https://pic.rutubelist.ru/video/8e/79/8e7900ba6ac2adad9e75b77ea60e75bc.jpg', alt: 'Вена, Карлскирхе', title: 'Разное', description: 'Качество жизни, общество и интересные факты.' }
    ],

    /**
     * Рендерит карточки для главной страницы
     */
    renderMainPage() {
        const cardTemplate = card => `
            <a href="${card.href}" class="card group">
                <img src="${card.imgSrc}" alt="${card.alt}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-2 text-slate-800 group-hover:text-blue-600 transition-colors">${card.title}</h3>
                    <p class="text-slate-600">${card.description}</p>
                </div>
            </a>`;
        Content.render('main-cards-grid', this.mainPageCards, cardTemplate);
    },

    /**
     * Главная функция инициализации
     */
    async init() {
        // 2. Загружаем общие компоненты
        const headerPromise = loadComponent('_header', 'header-placeholder');
        const sideMenuPromise = loadComponent('_side_menu', 'side-menu-placeholder');

        // 3. Дожидаемся загрузки базовых компонентов UI
        await Promise.all([headerPromise, sideMenuPromise]);

        // 4. Инициализируем базовый UI
        UI.initializeThemeToggle();
        UI.initializeMobileMenu();

        // 5. Загружаем остальные компоненты асинхронно
        const footerPromise = loadComponent('_footer', 'footer-placeholder');
        const scrollTopPromise = loadComponent('_scroll_to_top', 'scroll-to-top-placeholder', { callback: UI.initializeScrollToTop });
        const modalsPromise = loadComponent('_modals', 'modals-placeholder', {
            callback: () => {
                UI.setupModal('klimt-card', 'klimt-modal', 'klimt-modal-close');
                UI.setupModal('schiele-card', 'schiele-modal', 'schiele-modal-close');
            }
        });

        // 6. Инициализируем виджеты и статический контент
        UI.initializeScrollAnimations(); // Первый запуск для статических элементов
        Charts.applyDefaults();
        Sliders.setupAuto('.glockner-slider', 3000);
        Charts.initEnergyChart();
        Charts.initGdpChart();
        Charts.initObesityChart();
        Charts.initComparisonCharts();

        // 7. Рендерим динамические блоки, дожидаясь завершения каждого
        if (this.page === 'index') this.renderMainPage();
        if (this.page === 'history') this.renderHistoryTimeline();
        if (this.page === 'weather') await this.renderSeasonsSlider();
        if (this.page === 'food') await this.renderCoffeeSlider();
        if (this.page === 'nature') this.renderParksSlider();

        // 8. Повторно запускаем анимации для динамически добавленных элементов
        UI.initializeScrollAnimations();
    },

    /**
     * Рендерит таймлайн на странице истории
     */
    renderHistoryTimeline() {
        const timelineData = [
            { year: 'до 996 г.', title: 'Ранние эпохи и становление регионов', description: 'Территория современной Австрии формируется на перекрёстке кельтского, римского и германо‑славянского миров.', details: ['Кельты (Норикум): горное дело, торговля.', 'Римская эпоха: провинция Noricum, дороги, форты.', 'Великие переселения: германцы, славяне и аваpы.', 'Франкская «Восточная марка» Каролингов.'] },
            { year: '996 г.', title: 'Рождение имени', description: 'Первое упоминание названия <em>Ostarrîchi</em> («Восточное государство») в документе для Нойхофен-ан-дер-Ибс.', details: ['Укрепление марки Бабенбергами.', 'Подъём Вены как центра.', 'Развитие монастырей (Мельк).'] },
            { year: '1278 г.', title: 'Эпоха Габсбургов', description: 'Начало правления династии, продлившегося более 600 лет и превратившего Австрию в центр могущественной империи.', details: ['Контроль над Дунайской торговлей.', 'Горнорудная база Богемии и Альп.', 'Вена — финансовый и культурный центр.'] },
            { year: '1867 г.', title: 'Австро-Венгрия', description: 'После поражения от Пруссии империя реорганизована в дуалистическую монархию, сложное многонациональное государство.', details: [] },
            { year: '1918 г.', title: 'Первая Австрийская Республика', description: 'Рождение республики после распада Австро-Венгрии, тяжелый экономический и политический старт.', details: [] },
            { year: '1938 г.', title: 'Аншлюс', description: 'Утрата суверенитета и аннексия нацистской Германией.', details: [] },
            { year: '1955 г.', title: 'Вторая Республика и Нейтралитет', description: 'Подписание Государственного договора, возвращение полного суверенитета и провозглашение постоянного нейтралитета.', details: [] }
        ];
        const timelineTemplate = item => `
            <div class="mb-12 relative timeline-item animated-card">
                <strong class="text-blue-600 text-xl block">${item.year}</strong>
                <h4 class="text-2xl font-bold my-2">${item.title}</h4>
                <p><strong class="text-slate-800">${item.description}</strong></p>
                ${item.details.length > 0 ? `
                <ul class="mt-3 text-slate-700 list-disc list-inside text-sm space-y-1">
                    ${item.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>` : ''}
            </div>`;
        Content.render('timeline-container', timelineData, timelineTemplate);
    },

    /**
     * Рендерит слайдер времен года на странице погоды
     */
    async renderSeasonsSlider() {
        const seasonsTitle = `<h3 class="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-8 text-center">Времена года: игра контрастов</h3>`;
        const seasonsSlides = `
            <div class="slide min-w-full p-8"> <h4 class="text-2xl font-bold mb-3">Зима</h4> <p class="text-slate-600 dark:text-slate-300">Зима в Австрии двойственна. На равнинах, включая Вену, она относительно мягкая (около -2°C), тогда как в альпийских регионах (Тироль) — холодная и снежная (до -14°C). Снежный покров в горах держится до 8 месяцев, обеспечивая горнолыжный сезон с ноября по апрель, что является ключевой отраслью экономики.</p> <div class="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"> <p class="text-sm text-red-600 dark:text-red-400"><strong class="font-semibold">Риски:</strong> повышенная лавиноопасность и временное перекрытие транспортных путей.</p> </div> </div>
            <div class="slide min-w-full p-8"> <h4 class="text-2xl font-bold mb-3">Весна</h4> <p class="text-slate-600 dark:text-slate-300">Переходный период, характеризующийся таянием снегов. Важным явлением для альпийских долин является <strong class="text-slate-800 dark:text-slate-100">"фён"</strong> — теплый и сухой ветер с гор, который ускоряет приход весны и созревание урожая осенью, что демонстрирует глубокую интеграцию погоды в сельскохозяйственный цикл.</p> <div class="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"> <p class="text-sm text-red-600 dark:text-red-400"><strong class="font-semibold">Риски:</strong> сход лавин и оползней в горах, наводнения на равнинах.</p> </div> </div>
            <div class="slide min-w-full p-8"> <h4 class="text-2xl font-bold mb-3">Лето</h4> <p class="text-slate-600 dark:text-slate-300">На большей части территории лето теплое, но не знойное. На равнинах средние температуры колеблются от +20°C до +25°C, в горах — значительно прохладнее (+12°C до +18°C), что делает их популярным направлением для пешего туризма. Июль и август — пик сезона отдыха на озерах, где вода прогревается до +26°C.</p> </div>
            <div class="slide min-w-full p-8"> <h4 class="text-2xl font-bold mb-3">Осень</h4> <p class="text-slate-600 dark:text-slate-300">Осень начинается с ясного и сухого сентября, который считается идеальным временем для экскурсионного и культурного туризма. Однако уже в ноябре погода становится преимущественно облачной и дождливой, что делает этот месяц наименее привлекательным для путешествий.</p> </div>
        `;
        await Sliders.loadAndSetup('seasons-slider-placeholder', seasonsTitle, seasonsSlides, 'Перейти к сезону');
    },

    /**
     * Рендерит слайдер с видами кофе на странице еды
     */
    async renderCoffeeSlider() {
        const coffeeTitle = `<h3 class="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6 text-center">Меню венских кофейных напитков</h3>`;
        const coffeeSlides = `
            <div class="slide flex flex-col md:flex-row items-stretch min-w-full"> <div class="w-full md:w-1/2 p-6 flex flex-col justify-center"> <h4 class="text-2xl font-bold mb-2">Melange</h4> <p class="text-slate-600 dark:text-slate-300 mb-3">Венский аналог капучино (обычно с меньшим количеством пены).</p> <ul class="text-slate-600 dark:text-slate-300 list-disc list-inside space-y-1 text-sm"> <li><strong class="text-slate-700 dark:text-slate-200">Состав:</strong> эспрессо, молоко, пена</li> </ul> </div> <div class="w-full md:w-1/2 h-[28rem] md:h-[34rem]"> <img class="w-full h-full object-contain" src="https://mardonicafe.hu/wp-content/uploads/2023/07/melange.jpg?q=80&w=1974&auto=format&fit=fit" alt="Melange"> </div> </div>
            <div class="slide flex flex-col md:flex-row items-stretch min-w-full"> <div class="w-full md:w-1/2 p-6 flex flex-col justify-center"> <h4 class="text-2xl font-bold mb-2">Einspänner</h4> <p class="text-slate-600 dark:text-slate-300 mb-3">Двойной эспрессо в стеклянном стакане с крупной шапкой сливок.</p> <ul class="text-slate-600 dark:text-slate-300 list-disc list-inside space-y-1 text-sm"> <li><strong class="text-slate-700 dark:text-slate-200">Состав:</strong> двойной эспрессо, взбитые сливки</li> </ul> </div> <div class="w-full md:w-1/2 h-[28rem] md:h-[34rem]"> <img class="w-full h-full object-contain" src="https://img.freepik.com/premium-vector/different-types-coffee-drinks-including-viennese-coffee-einspanner_100803-110.jpg?q=80&w=1974&auto=format&fit" alt="Einspänner"> </div> </div>
            <div class="slide flex flex-col md:flex-row items-stretch min-w-full"> <div class="w-full md:w-1/2 p-6 flex flex-col justify-center"> <h4 class="text-2xl font-bold mb-2">Verlängerter</h4> <p class="text-slate-600 dark:text-slate-300 mb-3">Австрийский американо: эспрессо, разбавленный горячей водой.</p> <ul class="text-slate-600 dark:text-slate-300 list-disc list-inside space-y-1 text-sm"> <li><strong class="text-slate-700 dark:text-slate-200">Состав:</strong> эспрессо, горячая вода</li> </ul> </div> <div class="w-full md:w-1/2 h-[28rem] md:h-[34rem]"> <img class="w-full h-full object-contain" src="https://rauwolf-coffee.at/media/image/11/d8/60/verlaengerter_1920x1920.png?q=80&w=1974&auto=format&fit" alt="Verlängerтер"> </div> </div>
            <div class="slide flex flex-col md:flex-row items-stretch min-w-full"> <div class="w-full md:w-1/2 p-6 flex flex-col justify-center"> <h4 class="text-2xl font-bold mb-2">Kleiner/Großer Brauner</h4> <p class="text-slate-600 dark:text-slate-300 mb-3">Эспрессо с молоком/сливками, подаваемыми отдельно.</p> <ul class="text-slate-600 dark:text-slate-300 list-disc list-inside space-y-1 text-sm"> <li><strong class="text-slate-700 dark:text-slate-200">Состав:</strong> эспрессо, сливки/молоко</li> </ul> </div> <div class="w-full md:w-1/2 h-[28rem] md:h-[34rem]"> <img class="w-full h-full object-contain" src="https://media-cdn.tripadvisor.com/media/photo-s/15/11/27/56/the-kleiner-brauner.jpg?q=80&w=1974&auto=format&fit" alt="Brauner"> </div> </div>
            <div class="slide flex flex-col md:flex-row items-stretch min-w-full"> <div class="w-full md:w-1/2 p-6 flex flex-col justify-center"> <h4 class="text-2xl font-bold mb-2">Kapuziner</h4> <p class="text-slate-600 dark:text-slate-300 mb-3">Мокко с несколькими каплями сливок (цвет рясы капуцина).</p> <ul class="text-slate-600 dark:text-slate-300 list-disc list-inside space-y-1 text-sm"> <li><strong class="text-slate-700 dark:text-slate-200">Состав:</strong> мокко, капля сливок</li> </ul> </div> <div class="w-full md:w-1/2 h-[28rem] md:h-[34rem]"> <img class="w-full h-full object-contain" src="https://cdn.tasteatlas.com//images/ingredients/fef72fc04df94f539ad7525076221247.jpg?width=320&height=205?q=80&w=1974&auto=format&fit" alt="Kapuziner"> </div> </div>
        `;
        await Sliders.loadAndSetup('coffee-slider-placeholder', coffeeTitle, coffeeSlides, 'Перейти к напитку');
    },

    /**
     * Рендерит слайдер парков на странице природы
     */
    renderParksSlider() {
        const sliderRoot = document.querySelector('.parks-slider');
        if (sliderRoot) Sliders.setupManual(sliderRoot, 'Перейти к парку');
    }
};

/**
 * ==========================================================================
 *  App Initialization
 * ==========================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    // Запускаем инициализацию приложения
    App.init();
});
