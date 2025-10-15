import { useState, useEffect, useCallback } from 'react';

const useAutoSlider = (slidesCount, interval = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slidesCount - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slidesCount]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slidesCount - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slidesCount]);

  const goToSlide = useCallback((slideIndex) => {
    setCurrentIndex(slideIndex);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => goToNext(), interval);
    return () => clearInterval(timer);
  }, [goToNext, interval]);

  return { currentIndex, goToPrevious, goToNext, goToSlide };
};

export default useAutoSlider;