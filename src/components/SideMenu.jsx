import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { navLinksData } from './navigation';


const SideMenu = ({ isOpen, onClose }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEsc);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            // Эта функция очистки гарантированно сбросит стиль при размонтировании
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    const overlayClasses = isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none';
    const menuClasses = isOpen ? 'translate-x-0' : 'translate-x-full';

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${overlayClasses}`}
                onClick={onClose}
                aria-hidden="true"
            ></div>

            <div
                id="side-menu"
                className={`fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-white dark:bg-slate-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${menuClasses}`}
                role="dialog"
                aria-modal="true"
            >
                <div className="p-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Меню</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Закрыть меню">
                        <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <nav className="p-4 flex flex-col items-stretch space-y-2">
                    {navLinksData.map((link) => (
                        <NavLink
                            key={link.href}
                            to={link.href}
                            onClick={onClose}
                            className={({ isActive }) => `mobile-nav-link ${isActive ? 'mobile-nav-link--active' : ''}`}
                        >
                            {link.text}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default SideMenu;