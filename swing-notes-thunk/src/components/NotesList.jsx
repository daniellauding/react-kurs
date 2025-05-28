import React from 'react';
import NoteItem from './NoteItem';

const NotesList = ({ notes, onDelete }) => {
  if (!Array.isArray(notes)) {
    return <div>Inga anteckningar att visa</div>;
  }
  return (
    <div>
      {notes.map(note => (
        <NoteItem key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default NotesList;
