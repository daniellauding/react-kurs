import React, { useState } from 'react';
import Header from './components/Header';
import InputGroup from './components/InputGroup';
import CalculateButton from './components/CalculateButton';

const App = () => {
  const [sum, setSum] = useState('');
  const [friends, setFriends] = useState('');
  const [tip, setTip] = useState('');
  const [perPerson, setPerPerson] = useState(null); 

  const handleClick = e => {
    e.preventDefault();
    const total = parseFloat(sum);
    const numFriends = parseInt(friends, 10);
    const tipPercent = parseFloat(tip);

    if (isNaN(total) || isNaN(numFriends) || isNaN(tipPercent) || numFriends === 0) {
      console.log('Fyll i alla fält korrekt!');
      return;
    }

    const totalWithTip = total + total * tipPercent;
    const result = totalWithTip / numFriends;
    setPerPerson(result);
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
          label="Summa"
          value={sum}
          onChange={e => setSum(e.target.value)}
          placeholder="1000"
          color="#4338ca"
        />
        <InputGroup
          label="Antal vänner"
          value={friends}
          onChange={e => setFriends(e.target.value)}
          placeholder="4"
          color="#4338ca"
        />
        <InputGroup
          label="Dricks"
          value={tip}
          onChange={e => setTip(e.target.value)}
          placeholder="0.10"
          color="#4338ca"
        />
        <CalculateButton onClick={handleClick} />
      </form>
      {perPerson !== null && <p>Varje person ska betala: {perPerson.toFixed(2)} kr</p>}
    </div>
  );
};

export default App;