import { configureStore } from "@reduxjs/toolkit";
import { phoneBookReducer } from "../store/slices/phoneBookSlice.ts";

export const store = configureStore({
  reducer: {
    phones: phoneBookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
