import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../store/notesSlice';
import NoteItem from './NoteItem';

function NotesList({ notes }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };

  return (
    <div className="flex flex-col gap-4">
      {notes.map(note => (
        <NoteItem key={note.id} note={note} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default NotesList; 