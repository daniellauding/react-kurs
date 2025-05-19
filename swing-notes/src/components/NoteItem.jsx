import React, { useEffect } from 'react';

const NoteItem = ({ note, onDelete }) => {
    // Add debugging to check what properties are in the note object
    useEffect(() => {
        console.log('NoteItem received note:', note);
    }, [note]);

    const deleteNote = () => {
        // Check if this is a temporary ID (for notes we just added)
        if (note.id && note.id.toString().startsWith('temp_')) {
            console.log('Deleting temporary note:', note.id);
            // For temporary notes, we just need to update the UI state without making an API call
            if (onDelete) {
                onDelete(note.id);
            }
            return;
        }

        // For real notes, delete from the API
        fetch(`https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${note.id}`, {
        method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
            return response.json().then(errorData => {
                console.error('Error deleting note:', errorData);
                throw new Error('Network response was not ok');
            });
            }
            console.log('Note deleted');
            if (onDelete) {
            onDelete(note.id); // Call onDelete to update state
            }
        })
        .catch(error => console.error('Error deleting note:', error));
    };

  return (
    <div className="flex bg-white p-4 flex-col gap-4 rounded-xl shadow-sm mb-8">
      <h2 className='text-lg font-bold text-gray-800'>{note.title || 'No Title'}</h2>
      <p className='text-gray-600'>{note.note || 'No Content'}</p>
      {/* <button onClick={updateNote} className='bg-blue-500 text-white p-2 rounded-md'>Uppdatera</button> */}
      <button onClick={deleteNote} className='bg-red-500 text-white p-2 rounded-md'>Ta bort</button>
    </div>
  );
};

export default NoteItem;
