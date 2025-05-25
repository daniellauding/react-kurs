import { createSlice } from "@reduxjs/toolkit";

// Här är vår startlåda där vi sparar namnet!
const initialState = {
  name: "",  // Vi börjar med ett tomt namn
};

// Här skapar vi vår "namnhanterare"
const nameSlice = createSlice({
  name: "name",  // Vi ger vår slice ett namn
  initialState,  // Här är vår startlåda
  reducers: {
    // När någon vill ändra namnet
    setName(state, action) {
      state.name = action.payload;  // Vi sparar det nya namnet
    },
    // Om någon vill nollställa namnet
    clearName(state) {
      state.name = "";  // Vi tömmer namnet
    },
  },
});

// Här exporterar vi våra actions så vi kan använda dem
export const { setName, clearName } = nameSlice.actions;

// Här exporterar vi hela reducern
export default nameSlice.reducer; 