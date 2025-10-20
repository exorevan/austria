import React from 'react';
import useManualSlider from '../hooks/useManualSlider';

const ManualSlider = ({ slides, title }) => {
  const { activeSlideIndex, navigateToPrevious, navigateToNext, navigateToSlide } = useManualSlider(slides.length);

  // Динамический стиль для сдвига слайдов
  const slidesWrapperStyle = {
    transform: `translateX(-${activeSlideIndex * 100}%)`,
  };

  return (
    <div className="relative max-w-5xl mx-auto animated-card">
      {title && <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">{title}</h3>}
      
      <div className="rounded-2xl border border-slate-200 bg-slate-50">
        <div className="overflow-hidden">
          <div className="slides-wrapper whitespace-nowrap transition-transform duration-500" style={slidesWrapperStyle}>
            {slides.map((slide, index) => (
              <div key={index} className="slide inline-flex flex-col md:flex-row items-stretch w-full" aria-label={`Слайд ${index + 1} из ${slides.length}`} role="group">
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center whitespace-normal">
                  {slide.content}
                </div>
                <div className="w-full md:w-1/2 p-4 md:py-6 md:pr-6 h-80 md:h-96">
                  <img loading="lazy" className="w-full h-full object-cover object-center rounded-xl" src={slide.imgSrc} alt={slide.alt || ''} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Навигация */}
        <div className="flex items-center justify-between p-4">
          <button onClick={navigateToPrevious} className="px-4 py-1.5 rounded-full bg-slate-500 hover:bg-slate-600 text-white font-semibold transition-colors dark:bg-slate-600 dark:hover:bg-slate-500" aria-label="Предыдущий слайд">Назад</button>
          <div className="flex gap-2">
            {slides.map((_, slideIndex) => (
              <button key={slideIndex} onClick={() => navigateToSlide(slideIndex)} className={`dot ${activeSlideIndex === slideIndex ? 'active' : ''}`} aria-label={`Перейти к слайду ${slideIndex + 1}`}></button>
            ))}
          </div>
          <button onClick={navigateToNext} className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors" aria-label="Следующий слайд">Вперёд</button>
        </div>
      </div>
    </div>
  );
};

export default ManualSlider;