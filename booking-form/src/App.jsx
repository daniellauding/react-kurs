import React, { useState } from 'react';
import Header from './components/Header';
import InputGroup from './components/InputGroup';
import Button from './components/Button';

const App = () => {
  const [klass, setKlass] = useState('2');
  const [titel, setTitle] = useState('');
  const [qty, setQty] = useState('1');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [confirmation, setConfirmation] = useState('');

  const handleFieldChange = (setter, label) => e => {
    setter(e.target.value);
    console.log(`${label}:`, e.target.value);
  };

  const handleCheckboxChange = (setter, label) => e => {
    setter(e.target.checked);
    console.log(`${label}:`, e.target.checked);
  };

  const handleClick = e => {
    e.preventDefault();
    const message = `
      Tack! Din bokning:
      Klass: ${klass}
      Antal biljetter: ${qty}
      Titel: ${titel}
      Förnamn: ${firstname}
      Efternamn: ${lastname}
      Godkänner villkoren: ${confirm ? 'Ja' : 'Nej'}
    `;
    setConfirmation(message);
    console.log(message);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Header />
      <form
        style={{
          border: '2px solid #4338ca',
          borderRadius: '1rem',
          padding: '2rem',
          minWidth: '320px',
          boxShadow: '0 4px 24px #ddd'
        }}
      >
        <InputGroup
          label="Klass"
          value={klass}
          onChange={handleFieldChange(setKlass, 'Klass')}
          type="radio"
          color="#4338ca"
          options={[
            { label: '2:a cklass', value: '2' },
            { label: '1:a klass', value: '1' }
          ]}
        />
        <InputGroup
          label="Antal biljetter"
          value={qty}
          onChange={handleFieldChange(setQty, 'Antal biljetter')}
          placeholder="1"
          color="#4338ca"
          type="select"
          options={[
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' }
          ]}
        />
        <InputGroup
          label="Titel"
          value={titel}
          onChange={handleFieldChange(setTitle, 'Titel')}
          placeholder="Ms."
          color="#4338ca"
          type="select"
          options={[
            { label: 'Ms.', value: 'Ms.' },
            { label: 'Mrs.', value: 'Mrs.' },
            { label: 'Mr.', value: 'Mr.' },
            { label: 'Dr.', value: 'Dr.' }
          ]}
        />
        <InputGroup
          label="Förnamn"
          value={firstname}
          onChange={handleFieldChange(setFirstname, 'Förnamn')}
          placeholder="Greta"
          color="#4338ca"
          type="text"
        />
        <InputGroup
          label="Efternamn"
          value={lastname}
          onChange={handleFieldChange(setLastname, 'Efternamn')}
          placeholder="Thunberg"
          color="#4338ca"
          type="text"
        />
        <InputGroup
          label="Godkänner villkoren"
          value={confirm}
          onChange={handleCheckboxChange(setConfirm, 'Godkänner villkoren')}
          color="#4338ca"
          type="checkbox"
        />
        <Button onClick={handleClick} />
      </form>
      {confirmation && <div style={{ color: 'green', marginTop: '1rem' }}>{confirmation}</div>}
    </div>
  );
};

export default App;