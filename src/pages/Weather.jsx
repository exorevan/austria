import React from 'react';

// TODO: Перенести логику слайдера из app.js с помощью хуков

const WeatherPage = () => {
  return (
    <main className="px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section id="weather">
        <h2 className="section-title">Погода и Климат: Двигатель Жизни</h2>
        <p className="section-subtitle">От альпийских ледников до паннонских равнин — климат Австрии формирует ее
          экономику, культуру и характер. Расположенная в сердце Европы, страна на 70% покрыта Альпами, что
          создает три основные климатические зоны.</p>

        {/* Climate Zones */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="card p-6 text-center animated-card">
            <h3 className="text-xl font-bold mb-2">Альпийский регион</h3>
            <p className="text-slate-600">Обильные осадки, короткое лето и длинные снежные зимы. Основа для
              горнолыжного туризма.</p>
          </div>
          <div className="card p-6 text-center animated-card">
            <h3 className="text-xl font-bold mb-2">Умеренно-континентальный восток</h3>
            <p className="text-slate-600">Влияние Паннонской равнины: жаркое лето и холодная зима. Идеально для
              сельского хозяйства.</p>
          </div>
          <div className="card p-6 text-center animated-card">
            <h3 className="text-xl font-bold mb-2">Переходная зона</h3>
            <p className="text-slate-600">Непредсказуемая погода из-за столкновения атлантических и континентальных
              воздушных масс.</p>
          </div>
        </div>

        {/* TODO: Placeholder for the seasons slider */}
        <div id="seasons-slider-placeholder" className="mb-20">
          <p className="text-center text-amber-600">[Здесь будет слайдер времен года]</p>
        </div>

        {/* Regional Differences */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">Региональные различия</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8 animated-card">
              <h4 className="text-2xl font-bold mb-3">Вена</h4>
              <ul className="space-y-2 text-slate-600">
                <li><strong>Лето:</strong> Теплое, ср. макс. в июле +26°C.</li>
                <li><strong>Зима:</strong> Очень холодная, снежная и ветреная, ср. мин. в январе -3°C.</li>
              </ul>
            </div>
            <div className="card p-8 animated-card">
              <h4 className="text-2xl font-bold mb-3">Инсбрук</h4>
              <ul className="space-y-2 text-slate-600">
                <li><strong>Лето:</strong> Комфортное, ср. темп. +25°C.</li>
                <li><strong>Зима:</strong> Мягче, чем можно ожидать, ср. темп. около +2°C.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="card p-8 mt-20 animated-card bg-slate-50 dark:bg-slate-800/50">
          <h3 className="text-2xl font-bold text-center mb-4">Климат как основа экономики и культуры</h3>
          <p className="text-slate-700 text-center max-w-4xl mx-auto">
            Климатическое разнообразие — это не просто фон, а фундаментальный фактор австрийской модели.
            Наличие двух пиковых туристических сезонов (зимнего горнолыжного и летнего озерно-экскурсионного)
            является прямым следствием этого контраста. Это позволяет диверсифицировать турпотоки и
            поддерживать экономику круглый год. Глубокая укорененность климатических явлений в жизни австрийцев
            проявляется даже в языке: термин "фён" показывает, что погода — это не просто тема для беседы, а
            активный участник повседневной жизни.
          </p>
        </div>
      </section>
    </main>
  );
};

export default WeatherPage;