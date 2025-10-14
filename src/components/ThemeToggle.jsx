import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  // Определяем начальную тему, избегая мигания
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle-button" aria-label={`Переключить на ${theme === 'dark' ? 'светлую' : 'темную'} тему`}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;