import React, { useState, useEffect } from 'react';
import './App.css';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';

function App() {
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState('');

  // Add a useEffect to track notes changes
  useEffect(() => {
    console.log('Current notes state:', notes);
  }, [notes]);

  useEffect(() => {
    if (username) {
      fetch(`https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${username}`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched notes:', data); // Logga API-svaret
          setNotes(data.notes);
        })
        .catch(error => console.error('Error fetching notes:', error));
    }
  }, [username]);

  const addNote = note => {
    console.log('Adding note:', note); // Log the note being added
    fetch('https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            console.error('Error adding note:', errorData);
            throw new Error('Network response was not ok');
          });
        }
        return response.json();
      })
      .then(newNote => {
        console.log('New note added - Raw response:', newNote); // Log the raw response
        
        // Check if the API returned the created note data
        let noteToAdd;
        
        if (newNote.success && newNote.note) {
          // API returned a note object
          noteToAdd = newNote.note;
        } else if (newNote.success && !newNote.note) {
          // API only returned success but no note data
          // Use the original data we sent, and generate a temporary ID
          noteToAdd = {
            ...note,
            id: 'temp_' + Date.now(),  // Generate a temporary ID
            createdAt: new Date().toLocaleDateString()
          };
        } else {
          // Fallback to whatever the API returned
          noteToAdd = newNote;
        }
        
        console.log('Note to add to state:', noteToAdd); // Log what we're actually adding
        
        // Update the state with the new note
        setNotes(prevNotes => {
          const updatedNotes = [...prevNotes, noteToAdd];
          console.log('Updated notes array:', updatedNotes);
          return updatedNotes;
        });
      })
      .catch(error => console.error('Error adding note:', error));
  };
  
  const handleDelete = id => {
    console.log('Deleting note with ID:', id);
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id)); // Remove note from state
  };

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
        <NoteForm addNote={addNote} username={username} />
        <NotesList notes={notes} onDelete={handleDelete} />
      </div>
    </>
  );
}

export default App;
