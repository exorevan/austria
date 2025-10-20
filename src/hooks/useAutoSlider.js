import { useState, useEffect, useCallback } from 'react';

const useAutoSlider = (slidesCount, autoPlayInterval = 5000) => {
  const [activeSlideIndex, setCurrentIndex] = useState(0);

  const navigateToPrevious = useCallback(() => {
    const isFirstSlide = activeSlideIndex === 0;
    const newIndex = isFirstSlide ? slidesCount - 1 : activeSlideIndex - 1;
    setCurrentIndex(newIndex);
  }, [activeSlideIndex, slidesCount]);

  const navigateToNext = useCallback(() => {
    const isLastSlide = activeSlideIndex === slidesCount - 1;
    const newIndex = isLastSlide ? 0 : activeSlideIndex + 1;
    setCurrentIndex(newIndex);
  }, [activeSlideIndex, slidesCount]);

  const navigateToSlide = useCallback((slideIndex) => {
    setCurrentIndex(slideIndex);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => navigateToNext(), autoPlayInterval);
    return () => clearInterval(timer);
  }, [navigateToNext, autoPlayInterval]);

  return { activeSlideIndex, navigateToPrevious, navigateToNext, navigateToSlide };
};

export default useAutoSlider;