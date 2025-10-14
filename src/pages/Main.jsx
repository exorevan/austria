import React from 'react';
import { Link } from 'react-router-dom';

// Данные для карточек, взятые из вашего app.js
const mainPageCards = [
    { href: '/nature', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Grossglockner_from_SW.jpg/1280px-Grossglockner_from_SW.jpg?q=80&w=1964&auto=format&fit=crop', alt: 'Величественные Альпы', title: 'Природа', description: 'Альпы, национальные парки и кристально чистые озера.' },
    { href: '/weather', imgSrc: 'https://wallpapers.com/images/hd/4k-mountain-pictures-6f41bj9mg1fu6lhv.jpg', alt: 'Горный пейзаж Австрии в разное время года', title: 'Погода', description: 'Климатические зоны, времена года и их влияние.' },
    { href: '/economy', imgSrc: 'https://avatars.mds.yandex.net/i?id=7acd60614c79efc259f4625465c335bb_l-10917798-images-thumbs&n=13', alt: 'Деловой район Вены', title: 'Экономика', description: 'Высокий ВВП, инновации и ключевые отрасли.' },
    { href: '/transport', imgSrc: 'https://presse-oebb.at/Content/747422/cd4dce8d-9fa3-44a6-ab66-fa93eaeab727/1200/2400/.jpg?q=80&w=2070&auto=format&fit=fit', alt: 'Скоростной поезд Railjet', title: 'Транспорт', description: 'Эффективность, пунктуальность и KlimaTicket.' },
    { href: '/culture', imgSrc: 'https://magazineart.art/wp-content/uploads/opernball_2019_117295-c-michael-poehn.jpg?q=80&w=1965&auto=format&fit=fit', alt: 'Венский оперный бал', title: 'Культура', description: 'От балов и фестивалей до альпийских традиций.' },
    { href: '/food', imgSrc: 'https://img.taste.com.au/AUE-WXuq/taste/2016/11/sachertorte-88202-1.jpeg?q=80&w=1974&auto=format&fit=fit', alt: 'Торт Захер', title: 'Еда', description: 'Кулинарное наследие: от шницеля до венских кофеен.' },
    { href: '/history', imgSrc: 'https://www.bpb.de/cache/images/7/309807_teaser_widh_800.jpg?4CD99', alt: 'Подписание Государственного договора в 1955', title: 'История', description: 'Ключевые эпохи: от империи Габсбургов до Второй республики.' },
    { href: '/people', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Wolfgang-amadeus-mozart_1.jpg/330px-Wolfgang-amadeus-mozart_1.jpg?q=80&w=1964&auto=format&fit=fit', alt: 'Портрет Моцарта', title: 'Личности', description: 'Гении, изменившие мир: от Моцарта до Фрейда.' },
    { href: '/misc', imgSrc: 'https://pic.rutubelist.ru/video/8e/79/8e7900ba6ac2adad9e75b77ea60e75bc.jpg', alt: 'Вена, Карлскирхе', title: 'Разное', description: 'Качество жизни, общество и интересные факты.' }
];

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
              <img src={card.imgSrc} alt={card.alt} className="w-full h-48 object-cover" />
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

export default MainPage;