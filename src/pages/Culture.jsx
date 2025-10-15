import React from 'react';

// TODO: Перенести логику модальных окон из app.js

const CulturePage = () => {
  return (
    <main className="px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section id="culture">
        <div className="text-center mb-16">
          <h2 className="section-title">Культура: От Демонов до Дебютанток</h2>
          <p className="section-subtitle">Австрийская культура – это уникальное сочетание утонченного имперского
            наследия и древних, порой пугающих народных традиций, особенно ярких в зимний период.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="card animated-card">
            <img loading="lazy" src="https://ethnomir.ru/upload/medialibrary/d52/krampus1140.jpg?q=80&w=1964&auto=format&fit=fit"
              alt="[Изображение Крампуса]" className="w-full h-80 object-cover" />
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3">Крампус и Перхтен</h3>
              <p className="text-slate-600">Древние альпийские традиции с дохристианскими корнями. Кульминация –
                шествия <strong className="text-slate-800">Krampuslauf</strong> 5-6 декабря: рогатые существа
                наказывают непослушных детей. Несмотря на попытки запрета в прошлом, сегодня традиция
                переживает мощное возрождение.</p>
            </div>
          </div>
          <div className="card animated-card">
            <img loading="lazy" src="https://newsroom.leibnitz.at/wp-content/uploads/2024/10/IMG_2434.jpeg?q=80&w=1974&auto=format&fit=fit" alt="[Перхтен / альпийские маски]" className="w-full h-80 object-cover" />
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3">Perchtenlauf</h3>
              <p className="text-slate-600">Шествие ряженых, изображающих добрых (Schönperchten) и злых
                (Schiachperchten) духов. Цель – изгнать призраков зимы и принести плодородие в новом году.</p>
            </div>
          </div>
          <div className="card animated-card">
            <img loading="lazy" src="https://magazineart.art/wp-content/uploads/opernball_2019_117295-c-michael-poehn.jpg?q=80&w=1965&auto=format&fit=fit"
              alt="[Изображение Венского оперного бала]" className="w-full h-80 object-cover" />
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3">Венский Бальный Сезон</h3>
              <p className="text-slate-600">Прямое наследие двора Габсбургов. Более 450 балов в Вене с ноября по
                февраль. Вершина – <strong className="text-slate-800">Венский оперный бал</strong> со строжайшим
                дресс-кодом: черный фрак (Frack) с белой бабочкой для мужчин и длинное платье для женщин
                (белый цвет – только для дебютанток).</p>
            </div>
          </div>
          <div className="card animated-card md:col-span-2 lg:col-span-1">
            <img loading="lazy" src="https://www.salzburg.info/deskline/infrastruktur/objekte/grosses-festspielhaus_13214/image-thumb__665981__slider-main/Blick%20auf%20die%20B%C3%BChne_13216.jpg?q=80&w=1974&auto=format&fit=fit"
              alt="[Изображение концертного зала в Зальцбурге]" className="w-full h-80 object-cover" />
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3">Зальцбургский фестиваль</h3>
              <p className="text-slate-600">Один из самых престижных в мире фестивалей музыки и драмы, основанный
                в 1920 году на родине Моцарта. Проходит каждое лето в течение пяти недель и является
                краеугольным камнем мировой классической музыкальной культуры.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default React.memo(CulturePage);