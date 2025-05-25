import { configureStore } from "@reduxjs/toolkit";
import nameReducer from "../reducers/nameReducer";

// Här skapar vi vår store (stora låda) där allt ska sparas
const store = configureStore({
  reducer: {
    name: nameReducer,  // Vi lägger till vår namnhanterare
  },
});

export default store;
