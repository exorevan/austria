import { useState, useEffect, useCallback } from 'react';

const useAutoSlider = (slidesCount, autoPlayInterval = 5000) => {
  const [activeSlideIndex, setCurrentIndex] = useState(0);

  const navigateToPrevious = useCallback(() => {
    if (slidesCount <= 0) return;
    const isFirstSlide = activeSlideIndex === 0;
    const newIndex = isFirstSlide ? slidesCount - 1 : activeSlideIndex - 1;
    setCurrentIndex(newIndex);
  }, [activeSlideIndex, slidesCount]);

  const navigateToNext = useCallback(() => {
    if (slidesCount <= 0) return;
    const isLastSlide = activeSlideIndex === slidesCount - 1;
    const newIndex = isLastSlide ? 0 : activeSlideIndex + 1;
    setCurrentIndex(newIndex);
  }, [activeSlideIndex, slidesCount]);

  const navigateToSlide = useCallback((slideIndex) => {
    if (slidesCount <= 0) return;
    setCurrentIndex(slideIndex);
  }, []);

  useEffect(() => {
    if (slidesCount <= 1) return undefined;
    const timerId = setInterval(() => navigateToNext(), autoPlayInterval);
    return () => clearInterval(timerId);
  }, [navigateToNext, autoPlayInterval, slidesCount]);

  return { activeSlideIndex, navigateToPrevious, navigateToNext, navigateToSlide };
};

export default useAutoSlider;