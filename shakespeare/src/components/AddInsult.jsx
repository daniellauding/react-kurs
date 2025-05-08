import React, { useState } from 'react'

const AddInsult = () => {
  const [insult, setInsult] = useState('');
  const [play, setPlay] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log({
      insult: insult,
      play: play
    });

    setInsult('');
    setPlay('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Insult"
          value={insult}
          onChange={e => setInsult(e.target.value)}
        />
        <input
          type="text"
          placeholder="Play"
          value={play}
          onChange={e => setPlay(e.target.value)}
        />
        <button type="submit">Add Insult</button>
      </form>
    </>
  );
}

export default AddInsult;