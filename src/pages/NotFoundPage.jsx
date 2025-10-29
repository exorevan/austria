import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      textAlign: 'center'
    }}>
      <h1 style={{ margin: 0, fontSize: '56px' }}>404</h1>
      <p style={{ margin: 0, fontSize: '18px' }}>Страница не найдена</p>
      <Link to="/" style={{ marginTop: '8px', textDecoration: 'underline' }}>
        На главную
      </Link>
    </div>
  );
};

export default NotFoundPage;


