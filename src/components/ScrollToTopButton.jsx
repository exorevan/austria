import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const SCROLL_THRESHOLD = 500;
  const [shouldShowButton, setShouldShowButton] = useState(false);

  const updateButtonVisibility = () => {
    const hasScrolledEnough = window.pageYOffset > SCROLL_THRESHOLD;
    setShouldShowButton(hasScrolledEnough);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', updateButtonVisibility);
    return () => window.removeEventListener('scroll', updateButtonVisibility);
  }, []);

  return (
    <button onClick={scrollToTop} className={`fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 ${shouldShowButton ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`} aria-label="Наверх">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
    </button>
  );
};

export default ScrollToTopButton;