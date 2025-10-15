import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Хук для анимации элементов с классом .animated-card при их появлении в области видимости.
 */
const useCardAnimation = () => {
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const animatedCards = document.querySelectorAll('.animated-card');
    animatedCards.forEach(card => observer.observe(card));

    return () => animatedCards.forEach(card => observer.unobserve(card));
  }, [location]); // Перезапускаем эффект при смене URL
};

export default useCardAnimation;