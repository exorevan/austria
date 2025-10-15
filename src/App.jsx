import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import MobileMenu from './components/SideMenu';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import AppRoutes from './AppRoutes';
import useCardAnimation from './hooks/useCardAnimation';

/**
 * Компонент, который отслеживает смену URL и запускает хук анимации.
 * Это нужно, чтобы анимация карточек перезапускалась при переходе на новую страницу.
 */
const AnimationController = () => {
  useCardAnimation(); // Хук теперь сам получает location
  return null; // Этот компонент ничего не рендерит
};

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);
  
  return (
    <div className="flex flex-col min-h-screen">
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
      <Header onMenuOpen={openMenu} />
      <AnimationController />

      <div className="flex-grow">
        <AppRoutes />
      </div>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App
