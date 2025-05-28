import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewNote } from '../store/notesSlice';

function NoteForm({ username }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !username) return;

    const newNote = {
      title,
      content,
      username
    };

    dispatch(addNewNote(newNote));
    
    // Rensa formuläret
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-4 rounded-xl shadow-sm mb-8">
      <input
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full"
      />
      <textarea
        placeholder="Innehåll"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full"
      />
      <button 
        type="submit"
        disabled={!username}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        Lägg till anteckning
      </button>
    </form>
  );
}

export default NoteForm; 