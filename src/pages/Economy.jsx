import React from 'react';
import ChartWrapper from '../components/ChartWrapper';
import economyPageData from '../data/economyPageData.json';

const { statsCards, keyIndustries, economicProfile, gdpChartData } = economyPageData;
const EconomyPage = () => {
  return (
    <main className="px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section id="economy">
        <h2 className="section-title">Процветающая Экономика</h2>
        <p className="section-subtitle">Австрия обладает высокоразвитой, диверсифицированной и экспортно-ориентированной
          социальной рыночной экономикой, прочно входя в число самых богатых стран мира.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {statsCards.map(card => (
            <div key={card.title} className="card p-6 animated-card">
              <h3 className="text-lg font-semibold mb-2 text-slate-600">{card.title}</h3>
              <p className="text-4xl font-extrabold my-2 text-blue-600">{card.value}</p>
              <p className="text-slate-500 mt-2">{card.description}</p>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card lg:col-span-1 p-8 animated-card">
            <h3 className="text-2xl font-bold mb-4 text-center">Ключевые отрасли промышленности</h3>
            <ul className="space-y-3 list-disc list-inside text-slate-700">
              {keyIndustries.map(industry => (
                <li key={industry.name}>
                  <strong>{industry.name}:</strong> {industry.description}
                </li>
              ))}
            </ul>
          </div>
          <div className="card lg:col-span-1 p-8 animated-card">
            <h3 className="text-2xl font-bold mb-4 text-center">Сравнение ВВП на душу населения в ЕС (2024)</h3>
            <div className="relative h-96">
              <ChartWrapper
                type="bar"
                chartId="gdpChart"
                data={gdpChartData.data}
                colorize={{ lowerIsBetter: false }}
                options={{
                  indexAxis: 'y', // Возвращаем горизонтальный вид для лучшей читаемости
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {}, // Добавляем пустой объект scales
                  plugins: {
                    legend: { display: false }
                  }
                }} />
            </div>
          </div>
        </div>
        <div className="card p-8 mt-8 animated-card">
          <h3 className="text-2xl font-bold mb-4 text-center">Экономический профиль</h3>
          <div className="grid md:grid-cols-2 gap-6 text-slate-700">
            <div>
              <ul className="list-disc list-inside space-y-2">
                {economicProfile.details.map(detail => <li key={detail}>{detail}</li>)}
              </ul>
            </div>
            <div>
              <p>{economicProfile.summary}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default React.memo(EconomyPage);