import React, { useState } from 'react';
import Header from './components/Header';
import MobileMenu from './components/SideMenu';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import AppRoutes from './AppRoutes';
import useCardAnimation from './hooks/useScrollAnimation';

/**
 * Компонент, который отслеживает смену URL и запускает хук анимации.
 * Это нужно, чтобы анимация карточек перезапускалась при переходе на новую страницу.
 */
const ScrollAnimationTrigger = () => {
  useCardAnimation();
  return null;
};

function App() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openMobileMenu  = () => setMobileMenuOpen(true);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  
  return (
    <div className="flex flex-col min-h-screen">
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      <Header onMenuOpen={openMobileMenu } />
      <ScrollAnimationTrigger />

      <div className="flex-grow">
        <AppRoutes />
      </div>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App
