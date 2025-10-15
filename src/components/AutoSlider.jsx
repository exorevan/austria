import React from 'react';
import useAutoSlider from '../hooks/useAutoSlider';

const AutoSlider = ({ slides, title, interval = 20000 }) => {
  const { currentIndex, goToPrevious, goToNext, goToSlide } = useAutoSlider(slides.length, interval);

  return (
    <div className="relative max-w-5xl mx-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 animated-card">
      {title && <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">{title}</h3>}
      <div className="overflow-hidden relative h-80">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={index !== currentIndex}
          >
            <div className="flex flex-col md:flex-row items-stretch h-full">
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                {slide.content}
              </div>
              <div className="w-full md:w-1/2 h-full">
                <img
                  loading="lazy"
                  className="w-full h-full object-cover rounded-xl"
                  src={slide.imgSrc}
                  alt={slide.alt || ''}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4">
        <button onClick={goToPrevious} className="px-4 py-1.5 rounded-full bg-slate-500 hover:bg-slate-600 text-white font-semibold transition-colors dark:bg-slate-600 dark:hover:bg-slate-500" aria-label="Предыдущий слайд">Назад</button>
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button key={index} onClick={() => goToSlide(index)} className={`dot ${currentIndex === index ? 'active' : ''}`} aria-label={`Перейти к слайду ${index + 1}`}></button>
          ))}
        </div>
        <button onClick={goToNext} className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors" aria-label="Следующий слайд">Вперёд</button>
      </div>
    </div>
  );
};

export default AutoSlider;