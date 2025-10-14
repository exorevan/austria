import React, { useState } from 'react';

const ManualSlider = ({ slides, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Динамический стиль для сдвига слайдов
  const slidesWrapperStyle = {
    transform: `translateX(-${currentIndex * 100}%)`,
  };

  return (
    <div className="relative max-w-5xl mx-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 animated-card">
      {title && <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">{title}</h3>}
      
      <div className="overflow-hidden">
        <div className="slides-wrapper transition-transform duration-500" style={slidesWrapperStyle}>
          {slides.map((slide, index) => (
            <div key={index} className="slide flex flex-col md:flex-row items-stretch min-w-full" aria-label={`Слайд ${index + 1} из ${slides.length}`} role="group">
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                {slide.content}
              </div>
              <div className="w-full md:w-1/2 h-72 md:h-80">
                <img loading="lazy" className="w-full h-full object-cover" src={slide.imgSrc} alt={slide.alt || ''} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button onClick={goToPrevious} className="px-4 py-2 rounded-full border bg-slate-300 hover:bg-slate-400 text-slate-800 font-semibold border-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-100 dark:border-slate-600">Назад</button>
        <div className="flex gap-2">
          {slides.map((_, slideIndex) => (
            <button key={slideIndex} onClick={() => goToSlide(slideIndex)} className={`dot ${currentIndex === slideIndex ? 'active' : ''}`} aria-label={`Перейти к слайду ${slideIndex + 1}`}></button>
          ))}
        </div>
        <button onClick={goToNext} className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Вперед</button>
      </div>
    </div>
  );
};

export default ManualSlider;