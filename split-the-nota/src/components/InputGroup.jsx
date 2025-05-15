import React from 'react';

const InputGroup = ({ label, value, onChange, type = 'number', placeholder, color  }) => (
  <div style={{ marginBottom: '2rem' }}>
    <label style={{ color, fontWeight: 'bold' }}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        display: 'block',
        fontSize: '2rem',
        border: 'none',
        borderBottom: `2px solid ${color || '#000'}`,
        width: '100%'
      }}
    />
  </div>
);
export default InputGroup;
