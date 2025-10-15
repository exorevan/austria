import React from 'react';
import AutoSlider from '../components/AutoSlider';

const seasonsSlidesData = [
  {
    imgSrc: 'https://media.istockphoto.com/id/2172016195/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B7%D0%B8%D0%BC%D0%BD%D0%B8%D0%B9-%D0%B2%D0%B8%D0%B4-%D0%BD%D0%B0-%D0%B8%D1%81%D1%82%D0%BE%D1%80%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9-%D0%B3%D0%BE%D1%80%D0%BE%D0%B4-%D0%B7%D0%B0%D0%BB%D1%8C%D1%86%D0%B1%D1%83%D1%80%D0%B3-%D1%81%D0%BE-%D0%B7%D0%BD%D0%B0%D0%BC%D0%B5%D0%BD%D0%B8%D1%82%D1%8B%D0%BC-festung-hohensalzburg-%D0%B8-%D1%80%D0%B5%D0%BA%D0%BE%D0%B9-%D0%B7%D0%B0%D0%BB%D1%8C%D1%86%D0%B0%D1%85.jpg?s=612x612&w=0&k=20&c=juPYW37-seF4TZ1Rjg4gFRnExY4uZrhrhUVQ2uIrXhA=',
    alt: 'Зима в австрийских Альпах',
    content: (
      <>
        <h4 className="text-2xl font-bold mb-2">Зима</h4>
        <p className="text-slate-600 text-sm">Двойственна: от мягких -2°C в Вене до -14°C в альпийских регионах. Обильные снегопады обеспечивают горнолыжный сезон с ноября по апрель, но несут риски лавин. Снежный покров в горах может держаться до восьми месяцев.</p>
      </>
    )
  },
  {
    imgSrc: 'https://i.pinimg.com/originals/6c/c3/52/6cc352a0ff9dc9658fc938add384975f.jpg',
    alt: 'Весна в Австрии, таяние снегов',
    content: (
      <>
        <h4 className="text-2xl font-bold mb-2">Весна</h4>
        <p className="text-slate-600 text-sm">Переходный период с таянием снегов, что увеличивает риск лавин и наводнений. Важную роль играет "фён" – теплый сухой ветер с гор, ускоряющий таяние снега и влияющий на сельское хозяйство.</p>
      </>
    )
  },
  {
    imgSrc: 'https://kidpassage.com/images/publications/images/246_Wolfgangsee.jpeg',
    alt: 'Лето на озере в Австрии',
    content: (
      <>
        <h4 className="text-2xl font-bold mb-2">Лето</h4>
        <p className="text-slate-600 text-sm">Теплое, но не знойное. Средние температуры на равнинах +20...+25°C, в горах прохладнее (+12...+18°C). Пик летнего туризма приходится на июль-август, когда температура воды в озерах достигает +26°C.</p>
      </>
    )
  },
  {
    imgSrc: 'https://ak9.picdn.net/shutterstock/videos/32738839/thumb/1.jpg',
    alt: 'Осень в австрийской деревне',
    content: (
      <>
        <h4 className="text-2xl font-bold mb-2">Осень</h4>
        <p className="text-slate-600 text-sm">Начинается с ясного и сухого сентября, идеального для экскурсий. Однако уже в ноябре погода становится преимущественно облачной и дождливой, что делает этот месяц менее привлекательным для путешествий.</p>
      </>
    )
  }
];

const WeatherPage = () => {
  return (
    <main className="px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section id="weather">
        <h2 className="section-title">Погода и Климат: Двигатель Жизни</h2>
        <p className="section-subtitle">От альпийских ледников до паннонских равнин – климат Австрии формирует ее
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

        <div className="mb-20">
          <AutoSlider slides={seasonsSlidesData} title="Времена года" />
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
            Климатическое разнообразие – это не просто фон, а фундаментальный фактор австрийской модели.
            Наличие двух пиковых туристических сезонов (зимнего горнолыжного и летнего озерно-экскурсионного)
            является прямым следствием этого контраста. Это позволяет диверсифицировать турпотоки и
            поддерживать экономику круглый год. Глубокая укорененность климатических явлений в жизни австрийцев
            проявляется даже в языке: термин "фён" показывает, что погода – это не просто тема для беседы, а
            активный участник повседневной жизни.
          </p>
        </div>
      </section>
    </main>
  );
};

export default React.memo(WeatherPage);