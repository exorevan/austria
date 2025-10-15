import React from 'react';
import { Link } from 'react-router-dom';
import mainPageCards from '../data/mainPageCards.json';

const MainPage = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="hero h-[70vh] flex items-center justify-center text-white text-center" role="banner">
        <div className="px-5 sm:px-6 lg:px-8">
          <h1 className="hero-title">Откройте для себя Австрию</h1>
          <p className="hero-subtitle">Интерактивный путеводитель по стране альпийских вершин, имперского наследия и высокого качества жизни.</p>
        </div>
      </div>

      <main className="px-5 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <h2 className="section-title">Исследуйте Австрию</h2>
        <p className="section-subtitle">Выберите интересующий вас раздел, чтобы узнать больше о стране альпийских вершин, имперского наследия и высокого качества жизни.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainPageCards.map((card) => (
            <Link key={card.href} to={card.href} className="card group animated-card">
              <img loading="lazy" src={card.imgSrc} alt={card.alt} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-slate-800 group-hover:text-blue-600 transition-colors">{card.title}</h3>
                <p className="text-slate-600">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default React.memo(MainPage);