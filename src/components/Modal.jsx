import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] transition-opacity duration-300 opacity-100"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-content bg-white rounded-xl overflow-hidden shadow-2xl max-w-xl w-[88%] relative transform transition-transform duration-300 scale-100" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Закрыть" className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white dark:bg-slate-700/80 dark:hover:bg-slate-700 dark:text-slate-100 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;