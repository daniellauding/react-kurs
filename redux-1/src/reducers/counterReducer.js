import { createSlice } from "@reduxjs/toolkit";

// Här bestämmer vi allt som vi vill spara i vårt state, kan vara ett objekt med flera olika egenskaper
const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state, action) {
      // Första parametern är nuvarande state och andra parametern är ett objekt som innehåller det vi vill spara till vårt state
      console.log("State är: ", state);
      console.log("Action är: ", action);
      state.value += action.payload;
    },
    decrement(state, action) {
      console.log("State är: ", state);
      console.log("Action är: ", action);
      state.value -= action.payload;
    }
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
