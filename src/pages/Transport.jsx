import React from 'react';

const TransportPage = () => {
  return (
    <main className="px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section id="transport">
        <h2 className="section-title">Инновационный Транспорт</h2>
        <p className="section-subtitle">Транспортная система Австрии отражает ключевые ценности страны: эффективность,
          пунктуальность и глубокую приверженность устойчивому развитию.</p>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="card animated-card">
            <img loading="lazy" src="https://presse-oebb.at/Content/747422/cd4dce8d-9fa3-44a6-ab66-fa93eaeab727/1200/2400/.jpg?q=80&w=2070&auto=format&fit=fit"
              alt="[Изображение поезда ÖBB Railjet]" className="w-full h-72 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3">ÖBB Railjet (RJ/RJX)</h3>
              <p className="text-slate-600">Флагманский высокоскоростной поезд (до <strong>230 км/ч</strong>). Соединяет Австрию с Прагой, Будапештом, Мюнхеном, Цюрихом и Венецией. Предлагает 3 класса: эконом, первый и бизнес (кожаные кресла, больше пространства, приветственный напиток).</p>
            </div>
          </div>
          <div className="card animated-card">
            <img loading="lazy" src="https://www.studentagencybus.com/u/images/News_pix3/News_pix4/westbahn(1).jpg?w=1200&h=1200&s=1?q=80&w=1974&auto=format&fit=fit" alt="[WESTbahn поезд]" className="w-full h-72 object-cover" />
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3">WESTbahn – частный оператор</h3>
              <p className="text-slate-600">Конкурент ÖBB на магистрали Западной Австрии (Вена – Зальцбург – Инсбрук).</p>
              <ul className="text-slate-700 list-disc list-inside mt-3 space-y-1 text-sm">
                <li>Совместимость с региональными версиями KlimaTicket</li>
                <li>Розетки, Wi‑Fi, места для велосипедов</li>
              </ul>
            </div>
          </div>
          <div className="card animated-card">
            <img loading="lazy" src="https://www.theflashpacker.net/wp-content/uploads/2024/10/railjet-train-1st-class-6.jpg?q=80&w=1974&auto=format&fit=fit" alt="[Railjet Business Class]" className="w-full h-72 object-cover" />
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3">Railjet – классы обслуживания</h3>
              <ul className="text-slate-700 list-disc list-inside space-y-2">
                <li><strong>Business:</strong> кожаные кресла, тишина, приветственный напиток</li>
                <li><strong>First:</strong> больше пространства, обслуживание у места</li>
                <li><strong>Economy:</strong> удобные кресла, розетки, Wi‑Fi</li>
              </ul>
            </div>
          </div>
          <div className="card animated-card">
            <img loading="lazy" src="https://protectourwinters.at/wp-content/uploads/2021/03/U-Bahnstation-%C2%A9-Wiener-Linien.jpg?q=80&w=1974&auto=format&fit=fit" alt="[Wiener Linien U‑Bahn]" className="w-full h-72 object-cover" />
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3">Wiener Linien – Jahreskarte €365</h3>
              <p className="text-slate-600">Годовой проездной на весь городской транспорт Вены: метро (U-Bahn),
                трамваи, автобусы и S-Bahn в границах города. Модель «€1 в день» сделала ОТ сверхпопулярным
                и стала прототипом для KlimaTicket.</p>
            </div>
          </div>
          <div className="card animated-card">
            <img loading="lazy" src="https://www.alpenverein.at/salzburg_wAssets/img/newsletter/NL-1-2022/klimaticket-salzburg-map.jpg?q=80&w=1974&auto=format&fit=crop" alt="[KlimaTicket карта]" className="w-full h-72 object-cover" />
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3">KlimaTicket (Климатический билет)</h3>
              <p className="text-slate-600 mb-4">Революционный проект, запущенный в октябре 2021 года. Это единый
                годовой абонемент на весь общественный транспорт страны. Идее предшествовал успешный
                проездной <strong className="text-slate-800">Jahreskarte</strong> в Вене стоимостью €365.</p>
              <div className="text-4xl font-extrabold text-green-600">€1300</div>
              <p className="text-sm text-slate-500">(цена на август 2025, планируется повышение до €1400 в 2026)</p>
              <p className="text-sm text-slate-500 mt-2">Существуют льготные тарифы для молодежи/пенсионеров и региональные версии.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default React.memo(TransportPage);