import { createSlice } from "@reduxjs/toolkit";

interface phoneBookState {
  fetchLoading: boolean;
  error: boolean;
}

const initialState: phoneBookState = {
  fetchLoading: false,
  error: false,
};

export const phoneBookSlice = createSlice({
  name: "phones",
  initialState,
  reducers: {},
});

export const phoneBookReducer = phoneBookSlice.reducer;
