import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk för att hämta anteckningar
export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async (username) => {
    const response = await fetch(
      `https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${username}`
    );
    const data = await response.json();
    return data.notes;
  }
);

// Thunk för att lägga till en anteckning
export const addNewNote = createAsyncThunk(
  'notes/addNewNote',
  async (note) => {
    const response = await fetch(
      'https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      }
    );
    const data = await response.json();
    return data.note || {
      ...note,
      id: 'temp_' + Date.now(),
      createdAt: new Date().toLocaleDateString(),
    };
  }
);

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    deleteNote: (state, action) => {
      state.items = state.items.filter(note => note.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewNote.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { deleteNote } = notesSlice.actions;
export default notesSlice.reducer; 