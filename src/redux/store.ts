import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices/rootSlice";

const store = configureStore({
  reducer: rootReducer,
});

// Get the type of our store variable
export type AppStore = typeof store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default store;
