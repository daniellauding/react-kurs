import React from 'react';

const InputGroup = ({
  label,
  value,
  onChange,
  type = 'number',
  placeholder,
  color,
  options = []
}) => (
  <div style={{ marginBottom: '2rem' }}>
    <label style={{ color, fontWeight: 'bold' }}>{label}</label>

    {type === 'select' ? (
      <select
        value={value}
        onChange={onChange}
        style={{
          display: 'block',
          fontSize: '2rem',
          border: 'none',
          borderBottom: `2px solid ${color || '#000'}`,
          width: '100%'
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    ) : type === 'radio' ? (
      <div>
        {options.map(opt => (
          <label key={opt.value} style={{ marginRight: '1rem' }}>
            <input
              type="radio"
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
              name={label}
            />
            {opt.label}
          </label>
        ))}
      </div>
    ) : (
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
    )}
  </div>
);
export default InputGroup;
