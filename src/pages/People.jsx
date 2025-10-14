import React, { useState } from 'react';
import Modal from '../components/Modal';

const peopleData = [
  { id: 'mozart', name: 'В. А. Моцарт', description: 'Гениальный композитор', avatarSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Wolfgang-amadeus-mozart_1.jpg/330px-Wolfgang-amadeus-mozart_1.jpg?q=80&w=1964&auto=format&fit=fit' },
  {
    id: 'klimt', name: 'Густав Климт', description: 'Художник, лидер Сецессиона, автор «Поцелуя»', avatarSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Klimt.jpg/330px-Klimt.jpg?q=80&w=1964&auto=format&fit=fit',
    modal: {
      imgSrc: 'https://a3copydesign.com/upload/iblock/61a/r6x6fuhg9km6xbc0h8zlz331okim8is6/f7007b9656a9_SZHATIE.jpg',
      caption: 'Густав Климт — «Поцелуй» (1907–1908)'
    }
  },
  {
    id: 'schiele', name: 'Эгон Шиле', description: 'Яркий представитель экспрессионизма', avatarSrc: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Egon_Schiele_photo.jpg?q=80&w=1964&auto=format&fit=fit',
    modal: {
      imgSrc: 'https://artchive.ru/res/media/img/oy1200/work/cb3/229272@2x.jpg',
      caption: 'Эгон Шиле — «Автопортрет с поднятой рукой» (1910)'
    }
  },
  { id: 'freud', name: 'Зигмунд Фрейд', description: 'Отец психоанализа (теории Id, Ego, Superego)', avatarSrc: 'https://eponym.ru/GaleryImages/IQJFLOIVCN8AEUNUJIO2NG6X1.jpg?q=80&w=1935&auto=format&fit=fit' },
  { id: 'schrodinger', name: 'Эрвин Шрёдингер', description: 'Создатель квантовой механики, нобелевский лауреат', avatarSrc: 'https://scientificrussia.ru/images/i/31di-full.jpg?q=80&w=2070&auto=format&fit=fit' },
  { id: 'wittgenstein', name: 'Людвиг Витгенштейн', description: 'Аналитическая философия; «картина мира» (ранний) и «языковые игры» (поздний); аргумент против частного языка.', avatarSrc: 'https://ruslo.cz/media/k2/items/cache/5003d452a8da016f3ed02a6385cf54e8_XL.jpg?q=80&w=1951&auto=format&fit=fit' },
  { id: 'strauss', name: 'Иоганн Штраус (сын)', description: '«Король вальса»', avatarSrc: 'https://www.timetravel-vienna.at/wp-content/uploads/2025/01/bild-1-ox4mgc8y08-scaled-1.jpg?q=80&w=1974&auto=format&fit=fit' },
  { id: 'mahler', name: 'Густав Малер', description: 'Композитор-симфонист эпохи романтизма', avatarSrc: 'https://www.belcanto.ru/media/images/uploaded/mahler_portret.jpg?q=80&w=2070&auto=format&fit=fit' },
];

const PeoplePage = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (personId) => {
    const person = peopleData.find(p => p.id === personId);
    if (person && person.modal) {
      setActiveModal(person.modal);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <main className="px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <section id="people">
          <div className="text-center mb-16">
            <h2 className="section-title">Гении, изменившие мир</h2>
            <p className="section-subtitle">На протяжении веков Австрия была колыбелью для гениев, чьи работы в музыке,
              искусстве, науке и философии изменили мир. Вена на рубеже XIX-XX веков была одним из главных
              интеллектуальных центров планеты.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
            {peopleData.map((person) => (
              <div
                key={person.id}
                className={`text-center animated-card ${person.modal ? 'cursor-pointer' : ''}`}
                onClick={() => openModal(person.id)}
                role={person.modal ? 'button' : undefined}
                tabIndex={person.modal ? 0 : -1}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openModal(person.id)}
              >
                <img src={person.avatarSrc} alt={`[Портрет ${person.name}]`} className="person-avatar" />
                <h4 className="font-bold text-lg">{person.name}</h4>
                <p className="text-sm text-slate-600">{person.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Modal isOpen={!!activeModal} onClose={closeModal}>
        {activeModal && (
          <>
            <img
              src={activeModal.imgSrc}
              alt={activeModal.caption}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="p-4 text-center text-slate-700 text-sm dark:text-slate-300">
              {activeModal.caption}
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default PeoplePage;