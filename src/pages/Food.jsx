import React from 'react';
import ManualSlider from '../components/ManualSlider';

const coffeeSlidesData = [
  {
    imgSrc: 'https://static-sl.insales.ru/files/1/3223/17050775/original/6.png?q=80&w=1974&auto=format&fit=fit', alt: 'Melange',
    content: <>
      <h4 className="text-2xl font-bold mb-2">Melange</h4>
      <p className="text-slate-600 mb-3">Венский аналог капучино (обычно с меньшим количеством пены).</p>
      <ul className="text-slate-600 list-disc list-inside space-y-1 text-sm"><li><strong className="text-slate-700">Состав:</strong> эспрессо, молоко, пена</li></ul>
    </>
  },
  {
    imgSrc: 'https://cafecentral.wien/wp-content/uploads/einspaenner_cafecentral.jpg?q=80&w=1974&auto=format&fit', alt: 'Einspänner',
    content: <>
      <h4 className="text-2xl font-bold mb-2">Einspänner</h4>
      <p className="text-slate-600 mb-3">Двойной эспрессо в стеклянном стакане с крупной шапкой сливок.</p>
      <ul className="text-slate-600 list-disc list-inside space-y-1 text-sm"><li><strong className="text-slate-700">Состав:</strong> двойной эспрессо, взбитые сливки</li></ul>
    </>
  },
  {
    imgSrc: 'https://rauwolf-coffee.at/media/image/11/d8/60/verlaengerter_1920x1920.png?q=80&w=1974&auto=format&fit', alt: 'Verlängerter',
    content: <>
      <h4 className="text-2xl font-bold mb-2">Verlängerter</h4>
      <p className="text-slate-600 mb-3">Австрийский американо: эспрессо, разбавленный горячей водой.</p>
      <ul className="text-slate-600 list-disc list-inside space-y-1 text-sm"><li><strong className="text-slate-700">Состав:</strong> эспрессо, горячая вода</li></ul>
    </>
  },
  {
    imgSrc: 'https://media-cdn.tripadvisor.com/media/photo-s/15/11/27/56/the-kleiner-brauner.jpg?q=80&w=1974&auto=format&fit', alt: 'Kleiner/Großer Brauner',
    content: <>
      <h4 className="text-2xl font-bold mb-2">Kleiner/Großer Brauner</h4>
      <p className="text-slate-600 mb-3">Эспрессо с молоком/сливками, подаваемыми отдельно.</p>
      <ul className="text-slate-600 list-disc list-inside space-y-1 text-sm"><li><strong className="text-slate-700">Состав:</strong> эспрессо, сливки/молоко</li></ul>
    </>
  },
  {
    imgSrc: 'https://www.coffeeness.de/wp-content/uploads/2024/06/kapuziner-kaffee-rezept.jpg?width=320&height=205?q=80&w=1974&auto=format&fit', alt: 'Kapuziner',
    content: <>
      <h4 className="text-2xl font-bold mb-2">Kapuziner</h4>
      <p className="text-slate-600 mb-3">Мокко с несколькими каплями сливок (цвет рясы капуцина).</p>
      <ul className="text-slate-600 list-disc list-inside space-y-1 text-sm"><li><strong className="text-slate-700">Состав:</strong> мокко, капля сливок</li></ul>
    </>
  },
];

const FoodPage = () => {
  return (
    <main className="px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section id="food">
        <div className="text-center mb-16">
          <h2 className="section-title">Кулинарное Наследие Империи</h2>
          <p className="section-subtitle">Австрийская кухня, особенно венская, впитала в себя традиции Богемии,
            Венгрии, Италии и Балкан. Она отличается сытностью, изысканностью и глубокой историей.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="card animated-card">
            <img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Wiener-Schnitzel02.jpg?q=80&w=1964&auto=format&fit=fit"
              alt="[Изображение венского шницеля]" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="font-bold text-lg">Wiener Schnitzel</h3>
              <p className="text-sm text-slate-600">Настоящий по закону – только из телятины. Блюдо из свинины
                называется «Schnitzel Wiener Art».</p>
            </div>
          </div>
          <div className="card animated-card">
            <img loading="lazy" src="https://img.taste.com.au/AUE-WXuq/taste/2016/11/sachertorte-88202-1.jpeg?q=80&w=1974&auto=format&fit=fit"
              alt="[Изображение торта Захер]" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="font-bold text-lg">Sachertorte</h3>
              <p className="text-sm text-slate-600">Легендарный торт, созданный в 1832 году 16-летним Францем
                Захером для князя фон Меттерниха. Рецепт – строго охраняемый секрет отеля "Захер".</p>
            </div>
          </div>
          <div className="card animated-card">
            <img loading="lazy" src="https://www.einfachkochen.de/sites/einfachkochen.de/files/styles/full_width_tablet_4_3/public/2021-05/tafelspitz_mit_meerrettichsosse_1_0.jpg?h=4521fff0&itok=vjkcAuyq?q=80&w=1974&auto=format&fit=fit"
              alt="[Изображение Тафельшпиц]" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="font-bold text-lg">Tafelspitz</h3>
              <p className="text-sm text-slate-600">Отварная говядина в бульоне. Любимое блюдо императора Франца
                Иосифа I.</p>
            </div>
          </div>
          <div className="card animated-card">
            <img loading="lazy" src="https://cookingqueens.nl/wp-content/uploads/2023/01/fe1561ef-4b86-45d2-bde9-61127f55156d-975x1300.jpg?q=80&w=1964&auto=format&fit=fit"
              alt="[Изображение тирольского грёстля]" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="font-bold text-lg">Tiroler Gröstl</h3>
              <p className="text-sm text-slate-600">Сытное блюдо из остатков жаркого, картофеля и мяса,
                традиционно подается с яичницей-глазуньей.</p>
            </div>
          </div>
          <div className="card animated-card">
            <img loading="lazy" src="https://www.fioreoliveoils.com/cdn/shop/files/StyrianPumpkinSeedOliveOIlPGI.png?v=1698084448?q=80&w=1974&auto=format&fit=fit"
              alt="[Изображение тыквенного масла]" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="font-bold text-lg">Steirischer Ölkürbis</h3>
              <p className="text-sm text-slate-600">«Зеленое золото» Штирии (продукт PGI). Густое масло с ореховым
                вкусом для салатов и даже ванильного мороженого.</p>
            </div>
          </div>
          <div className="card animated-card">
            <img loading="lazy" src="https://wine-and-spirits.md/wp-content/uploads/2024/10/WV-1.jpg?q=80&w=2070&auto=format&fit=fit"
              alt="[Изображение виноградников Вахау]" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="font-bold text-lg">Виноделие в Вахау</h3>
              <p className="text-sm text-slate-600">Регион наследия ЮНЕСКО (35 км между Мельком и Кремсом),
                известный белыми винами Рислинг и Грюнер Вельтлинер.</p>
            </div>
          </div>
        </div>

        <div className="card p-8 animated-card mt-12">
          <div className="rounded-xl overflow-hidden mb-6 h-60">
            <img loading="lazy" src="https://czaswina.pl/upload/photos/article/5995/144126603921.jpg?q=80&w=1974&auto=format&fit=fit" alt="[Интерьер венской кофейни]" className="w-full h-full object-cover object-center" />
          </div>
          <h3 className="text-2xl font-bold text-center mb-6">Венская кофейня (Нематериальное наследие ЮНЕСКО)</h3>
          <p className="text-center mb-4 max-w-3xl mx-auto">Это не просто место, а социальный институт. Атрибуты: мраморные столики, стулья Thonet, держатели газет (Zeitungsständер).</p>
          <p className="text-center mb-6 max-w-3xl mx-auto">К каждому кофе подается стакан воды, который официант пополняет в течение визита.</p>
        </div>

        <div className="mt-12">
          <ManualSlider slides={coffeeSlidesData} title="Гид по венским кофейным напиткам" />
        </div>
      </section>
    </main>
  );
};

export default React.memo(FoodPage);