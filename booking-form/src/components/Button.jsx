import React from 'react';

const Button = ( { onClick } ) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      background: '#4338ca',
      color: '#fff',
      fontSize: '2rem',
      fontWeight: 'bold',
      padding: '1rem',
      border: 'none',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 0 #c7d2fe',
      cursor: 'pointer'
    }}
  >
    Räkna
  </button>
);
export default Button;
