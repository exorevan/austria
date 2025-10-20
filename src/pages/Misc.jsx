import React from 'react';
import ChartWrapper from '../components/ChartWrapper';
import miscPageData from '../data/miscPage.json';

const { statsCards, comparisonChartsData, chartData: miscChartData, societyInfo } = miscPageData;
const MiscPage = () => {
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
            <ul className="space-y-4 text-base list-disc list-inside text-slate-700">
              <li><strong>{societyInfo.children.title}:</strong> {societyInfo.children.description}</li>
              <li><strong>{societyInfo.animals.title}:</strong> {societyInfo.animals.description}</li>
            </ul>
          </div>
          <div className="card p-6 md:col-span-2 animated-card">
            <h3 className="text-lg font-semibold mb-2 text-center">Вес населения (ИМТ)</h3>
            <p className="text-center text-sm mb-4 text-slate-500">(Данные Статистического управления Австрии за
              2019)</p>
            <div className="relative h-64">
              <ChartWrapper
                type="doughnut"
                data={miscChartData.obesityChart.data}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '60%',
                  plugins: { legend: { display: true, position: 'bottom' } }
                }}
                chartId="obesityChart"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {comparisonChartsData.map((chart) => {
            return (
              <div key={chart.chartId} className="card p-6 animated-card">
                <h3 className="text-lg font-semibold mb-2 text-center">{chart.chartTitle}</h3>
                <div className="relative h-96">
                  <ChartWrapper
                    type="bar"
                    chartId={chart.chartId}
                    data={miscChartData[chart.chartId].data}
                    options={{ responsive: true, maintainAspectRatio: false }}
                    colorize={{ isLowerBetter: chart.isLowerBetter }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default React.memo(MiscPage);