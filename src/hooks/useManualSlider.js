import { useState, useCallback } from 'react';

const useManualSlider = (slidesCount) => {
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

  return { activeSlideIndex, navigateToPrevious, navigateToNext, navigateToSlide };
};

export default useManualSlider;