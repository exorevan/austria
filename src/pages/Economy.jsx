import React from 'react';
import ChartWrapper from '../components/ChartWrapper';
import economyPageData from '../data/economyPage.json';

const { 
  statsCards,
  keyIndustries, 
  economicProfile, 
  gdpChartData 
} = economyPageData;
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
            <h3 className="text-2xl font-bold mb-4 text-center">Сравнение ВВП на душу населения (2024)</h3>
            <div className="relative h-[32rem]">
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
                  },
                  datasets: {
                    bar: {
                      categoryPercentage: 0.6, // Уменьшаем процент пространства категории для увеличения расстояния между строками
                      barPercentage: 0.8, // Процент пространства категории для одного бара
                      maxBarThickness: 35 // Ограничиваем максимальную толщину бара для более тонких столбцов
                    }
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

        <div className="card p-8 mt-8 animated-card">
          <h3 className="text-2xl font-bold mb-6 text-center">Виды налогов</h3>
          <div className="space-y-6 text-slate-700">
            <section>
              <h4 className="text-xl font-semibold mb-2">Подоходный налог (Einkommensteuer)</h4>
              <p>
                Для физических лиц применяется прогрессивная шкала налогообложения: чем выше доход, тем выше налоговая ставка.
                Годовой доход до определённого порога (около 13&nbsp;308&nbsp;EUR на 2025 год) налогом не облагается. Далее ставки
                растут ступенчато, достигая 55% для доходов, превышающих 1&nbsp;000&nbsp;000&nbsp;EUR в год. Система предусматривает
                различные налоговые вычеты и кредиты (например, транспортный вычет, «семейный бонус» на детей и льготы для
                пенсионеров), что позволяет снизить эффективную налоговую ставку.
              </p>
            </section>

            <section>
              <h4 className="text-xl font-semibold mb-2">Налог на прибыль корпораций (Körperschaftsteuer)</h4>
              <p>
                Юридические лица уплачивают налог на прибыль по единой ставке 23% (ранее 25%). Прибыль от прироста капитала,
                как правило, облагается по той же ставке. Для компаний также существует минимальный корпоративный налог, который
                необходимо уплачивать даже при отсутствии прибыли.
              </p>
            </section>

            <section>
              <h4 className="text-xl font-semibold mb-2">Налог на добавленную стоимость (Umsatzsteuer — USt)</h4>
              <p>
                Стандартная ставка НДС в Австрии составляет 20%. Для ряда товаров и услуг применяются пониженные ставки: 10%
                — на товары первой необходимости (например, продукты питания и книги), а также на аренду жилья; 13% — на услуги
                в сфере культуры и туризма.
              </p>
            </section>

            <section>
              <h4 className="text-xl font-semibold mb-2">Социальные взносы (Sozialversicherung)</h4>
              <p>
                Это значительный источник доходов бюджета. Взносы уплачиваются совместно работником (около 18,12%) и
                работодателем (около 21,23%). Они покрывают расходы на пенсионное страхование, медицинское обслуживание,
                страхование от безработицы и от несчастных случаев на производстве.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};

export default React.memo(EconomyPage);