import React, { useState } from 'react';

const NoteForm = ({ addNote, username }) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!username) {
      setError('Användarnamn krävs');
      return;
    }
    if (title.length < 5) {
      setError('Titeln måste vara minst 5 tecken lång');
      return;
    }
    if (note.length < 5) {
      setError('Anteckningen måste vara minst 5 tecken lång');
      return;
    }
    setError('');
    addNote({ username, title, note });
    setTitle('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full block">
      <div className="flex bg-white p-4 flex-col gap-4 rounded-xl shadow-sm mb-8">
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Anteckning"
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={6}
        />
        <button type="submit" className='bg-blue-500 text-white p-2 rounded-md'>Lägg till anteckning</button>
      </div>
    </form>
  );
};

export default NoteForm;
