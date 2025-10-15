import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { navLinksData } from './navigation';

const Header = ({ onMenuOpen }) => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm sticky top-0 z-30 header-fade">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white dark:text-slate-100 shrink-0">Austria Guide</Link>
        <nav id="desktop-menu" className="hidden lg:flex items-center gap-1">
          {navLinksData.map(link => <NavLink key={link.href} to={link.href} className="nav-link">{link.text}</NavLink>)}
        </nav>
        <div className="flex items-center">
          <ThemeToggle />
          <button onClick={onMenuOpen} className="lg:hidden p-2 ml-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Открыть меню"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg></button>
        </div>
      </div>
    </header>
  );
};

export default Header;