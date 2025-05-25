import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../reducers/bookReducer";

// Här skapar vi vår stora boklåda där vi sparar all information
const store = configureStore({
  reducer: {
    books: bookReducer,  // Vi lägger till vår bokhanterare
  },
});

export default store; 