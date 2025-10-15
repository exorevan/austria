import React from 'react';
import { useLocation } from 'react-router-dom';
import useCharts from '../hooks/useCharts';
import miscPageData from '../data/miscPageData.json';

const { statsCards, comparisonChartsData } = miscPageData;

const MiscPage = () => {
  const location = useLocation();
  // Вызываем хук для отрисовки графиков, передавая ID нужных для этой страницы.
  // Передаем location, чтобы графики перерисовывались при навигации,
  // учитывая возможную смену темы (dark/light).
  useCharts(location, ['obesityChart', 'happinessChart']);
  return (
    <main className="px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section id="misc">
        <h2 className="section-title">Качество жизни и общество</h2>
        <p className="section-subtitle">Австрия регулярно занимает верхние строчки в мировых рейтингах по качеству
          жизни, безопасности и благополучию, что основано на продуманной социальной политике.</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {statsCards.map(card => (
            <div key={card.title} className="card p-6 text-center animated-card">
              <h3 className="font-semibold text-slate-600">{card.title}</h3>
              <p className="text-4xl font-extrabold my-2 text-blue-600">{card.value}</p>
              <p className="text-sm text-slate-500">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="card p-8 md:col-span-3 animated-card">
            <h3 className="font-bold text-center mb-4 text-xl">Охрана детей и животных</h3>
            <ul className="space-y-4 text-base list-disc list-inside">
              <li><strong>SOS Children's Villages:</strong> Глобальная организация, основанная в Австрии в
                1949 г., стала мировым образцом опеки, ориентированной на семейные формы воспитания, а не
                крупные интернаты.</li>
              <li><strong>Защита животных:</strong> Одно из самых строгих законодательств в мире. Статус
                "животные - не вещи" закреплен в Гражданском кодексе, а за жестокое обращение предусмотрены
                крупные штрафы и тюремное заключение.</li>
            </ul>
          </div>
          <div className="card p-6 md:col-span-2 animated-card">
            <h3 className="text-lg font-semibold mb-2 text-center">Вес населения (ИМТ)</h3>
            <p className="text-center text-sm mb-4 text-slate-500">(Данные Статистического управления Австрии за
              2019)</p>
            <canvas id="obesityChart"></canvas>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {comparisonChartsData.map((chart) => (
            <div key={chart.id} className="card p-6 animated-card">
              <h3 className="text-lg font-semibold mb-2 text-center">{chart.title}</h3>
              <canvas id={chart.id}></canvas>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default React.memo(MiscPage);