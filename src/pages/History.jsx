import React from 'react';
import historyPageData from '../data/historyPage.json';

const { timelineData } = historyPageData;

const HistoryPage = () => {
  return (
    <main className="px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section id="history">
        <div className="text-center mb-16">
          <h2 className="section-title">Ключевые эпохи истории</h2>
          <p className="section-subtitle">История Австрии — это сага о превращении пограничной территории в центр
            великой империи и ее трансформации в процветающую нейтральную республику. Население на 2025 год:
            <strong> ~9.2 миллиона человек</strong>.</p>
        </div>
        <div className="timeline-grid-container">
          {timelineData.map((item, index) => (
            <React.Fragment key={index}>
              {/* Год */}
              <div className="text-right pr-4 animated-card">
                <strong 
                  className={`${
                    item.type === 'major' 
                      ? 'text-blue-600 text-xl inline-block pt-[30px]' 
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {item.year}
                </strong>
              </div>
              {/* Линия и точка */}
              <div className="relative flex justify-center">
                <div className={`timeline-line ${index === timelineData.length - 1 ? 'h-1/2' : 'h-full'}`}></div>
                <div className={`timeline-dot ${item.type === 'major' ? 'timeline-dot-major variant-large' : 'timeline-dot-minor'}`}>
                  {/* Фото внутри кружка для major событий */}
                  {item.type === 'major' && item.imgSrc && (
                    <img 
                      loading="lazy"
                      src={item.imgSrc} 
                      alt={item.imgAlt}
                      className="timeline-dot-image"
                    />
                  )}
                </div>
              </div>
              {/* Контент */}
              <div className={`pb-16 pl-2 animated-card ${item.type === 'minor' ? '-mt-2' : ''}`}> 
                <h4 className={`font-bold my-2 ${item.type === 'major' ? 'text-2xl' : 'text-xl'}`}>{item.title}</h4>
                <p className={item.type === 'minor' ? 'text-sm' : ''} dangerouslySetInnerHTML={{ __html: item.description }} />
                
                {item.details && item.details.length > 0 && (
                  <ul className="mt-3 text-slate-700 list-disc list-inside text-sm space-y-1">
                    {item.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                )}
                
                {item.type === 'minor' && item.imgSrc && (
                  <img 
                    loading="lazy"
                    src={item.imgSrc} 
                    alt={item.imgAlt} 
                    className="mt-3 w-40 h-24 object-cover rounded-md border border-slate-200 dark:border-slate-700 bg-white" 
                  />
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>
    </main>
  );
};

export default React.memo(HistoryPage);
