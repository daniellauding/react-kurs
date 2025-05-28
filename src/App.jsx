import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import { fetchNotes } from './store/notesSlice';

function App() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.items);
  const status = useSelector((state) => state.notes.status);

  useEffect(() => {
    if (username) {
      dispatch(fetchNotes(username));
    }
  }, [username, dispatch]);

  return (
    <>
      <div className="App w-full">
        <h1>swing-notes</h1>
        <div className="flex bg-white p-4 flex-col gap-4 rounded-xl shadow-sm mb-8">
          <input
            type="text"
            placeholder="Användarnamn"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full"
          />
        </div>
        <NoteForm username={username} />
        {status === 'loading' ? (
          <p>Laddar anteckningar...</p>
        ) : (
          <NotesList notes={notes} />
        )}
      </div>
    </>
  );
}

export default App; 