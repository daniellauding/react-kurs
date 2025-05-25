import { createSlice } from "@reduxjs/toolkit";

// Vår startlåda - här sparar vi information om böcker
const initialState = {
  selectedBook: null,  // Ingen bok vald från början
  books: [],          // Tom lista med böcker från början
};

// Vår "bokhanterare" - som en bibliotekarie som håller koll på böckerna
const bookSlice = createSlice({
  name: "books",      // Namnet på vår slice (som en hylla i biblioteket)
  initialState,       // Vår startlåda från ovan
  reducers: {
    // När någon väljer en bok
    setSelectedBook(state, action) {
      // action.payload är den bok som någon valde
      state.selectedBook = action.payload;
    },
    
    // När vi får nya böcker från API:et
    setBooks(state, action) {
      // action.payload är listan med alla böcker
      state.books = action.payload;
    },
    
    // När någon vill "lämna tillbaka" boken (avmarkera)
    clearSelectedBook(state) {
      state.selectedBook = null;
    }
  }
});

// Här packar vi ihop våra actions så andra kan använda dem
export const { setSelectedBook, setBooks, clearSelectedBook } = bookSlice.actions;

// Här exporterar vi hela bokhanteraren
export default bookSlice.reducer; 