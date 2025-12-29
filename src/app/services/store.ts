import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./productSlice"; // mahsulotlar slice

const rootReducer = combineReducers({
  products: productsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// TypeScript uchun
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
