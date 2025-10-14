import React from 'react';

// TODO: Перенести логику графика из app.js с помощью хуков

const EconomyPage = () => {
  return (
    <main className="px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section id="economy">
        <h2 className="section-title">Процветающая Экономика</h2>
        <p className="section-subtitle">Австрия обладает высокоразвитой, диверсифицированной и экспортно-ориентированной
          социальной рыночной экономикой, прочно входя в число самых богатых стран мира.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="card p-6 animated-card">
            <h3 className="text-lg font-semibold mb-2 text-slate-600">ВВП на душу населения</h3>
            <p className="text-5xl font-extrabold text-blue-600">€52,500</p>
            <p className="text-slate-500 mt-2">6-е место в ЕС (данные 2024)</p>
          </div>
          <div className="card p-6 animated-card">
            <h3 className="text-lg font-semibold mb-2 text-slate-600">Безработица</h3>
            <p className="text-5xl font-extrabold text-blue-600">7.0%</p>
            <p className="text-slate-500 mt-2">Низкий показатель (август 2025)</p>
          </div>
          <div className="card p-6 animated-card">
            <h3 className="text-lg font-semibold mb-2 text-slate-600">Сектор Услуг</h3>
            <p className="text-5xl font-extrabold text-blue-600">~66%</p>
            <p className="text-slate-500 mt-2">Доминирующая роль в ВВП</p>
          </div>
          <div className="card p-6 animated-card">
            <h3 className="text-lg font-semibold mb-2 text-slate-600">Промышленность</h3>
            <p className="text-5xl font-extrabold text-blue-600">~32%</p>
            <p className="text-slate-500 mt-2">Сильный и высокотехнологичный сектор</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card lg:col-span-1 p-8 animated-card">
            <h3 className="text-2xl font-bold mb-4 text-center">Ключевые отрасли промышленности</h3>
            <ul className="space-y-3 list-disc list-inside text-slate-700">
              <li><strong>Машиностроение и металлообработка:</strong> Производство оборудования, станков и
                металлоконструкций.</li>
              <li><strong>Автомобильная промышленность:</strong> Важный центр по производству двигателей,
                трансмиссий и автокомпонентов.</li>
              <li><strong>Химическая и электронная промышленность:</strong> Производство широкого спектра
                продукции от пластмасс до микросхем.</li>
            </ul>
          </div>
          <div className="card lg:col-span-1 p-8 animated-card">
            <h3 className="text-2xl font-bold mb-4 text-center">Сравнение ВВП на душу населения в ЕС (2024)</h3>
            <canvas id="gdpChart"></canvas>
            <p className="text-center text-amber-600 mt-4">[Здесь будет график ВВП]</p>
          </div>
        </div>
        <div className="card p-8 mt-8 animated-card">
          <h3 className="text-2xl font-bold mb-4 text-center">Экономический профиль</h3>
          <div className="grid md:grid-cols-2 gap-6 text-slate-700">
            <div>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Структура:</strong> услуги ~66%, промышленность ~32%.</li>
                <li><strong>Благосостояние домохозяйств:</strong> 6-е место в ЕС по фактическому индивидуальному потреблению.</li>
                <li><strong>Безработица (авг. 2025):</strong> 7.0%.</li>
              </ul>
            </div>
            <div>
              <p>Австрия сочетает историческое наследие с инновациями, опираясь на устойчивое развитие
                и «зеленую» энергетику. Туризм, чистая энергия и высокое качество воды — ключевые активы.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EconomyPage;