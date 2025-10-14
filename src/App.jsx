import React, { useState } from 'react';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import AppRoutes from './AppRoutes';

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <SideMenu isOpen={isMenuOpen} onClose={closeMenu} />
      <Header onMenuOpen={openMenu} />

      <div className="flex-grow">
        <AppRoutes />
      </div>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App
