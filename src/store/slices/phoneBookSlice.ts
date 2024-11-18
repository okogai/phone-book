import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Phone } from "../../typed";
import {
  addNewContact,
  deleteContact,
  fetchContactById,
  fetchPhonesFromDB,
  updateContact,
} from "../thunks/phoneBookThunk.ts";

interface phoneBookState {
  phones: Phone[];
  contactToEdit: Phone | null;
  fetchLoading: boolean;
  addingLoading: boolean;
  updatingLoading: boolean;
  deletingLoading: boolean;
  error: boolean;
}

const initialState: phoneBookState = {
  phones: [],
  contactToEdit: null,
  fetchLoading: false,
  addingLoading: false,
  updatingLoading: false,
  deletingLoading: false,
  error: false,
};

export const phoneBookSlice = createSlice({
  name: "phones",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhonesFromDB.pending, (state) => {
        state.fetchLoading = true;
        state.error = false;
      })
      .addCase(
        fetchPhonesFromDB.fulfilled,
        (state, action: PayloadAction<Phone[]>) => {
          state.fetchLoading = false;
          state.phones = action.payload;
        },
      )
      .addCase(fetchPhonesFromDB.rejected, (state) => {
        state.fetchLoading = false;
        state.error = true;
      })
      .addCase(fetchContactById.pending, (state) => {
        state.fetchLoading = true;
        state.error = false;
      })
      .addCase(
        fetchContactById.fulfilled,
        (state, action: PayloadAction<Phone | null>) => {
          state.fetchLoading = false;
          state.contactToEdit = action.payload;
        },
      )
      .addCase(fetchContactById.rejected, (state) => {
        state.fetchLoading = false;
        state.error = true;
      })
      .addCase(addNewContact.pending, (state) => {
        state.addingLoading = true;
        state.error = false;
      })
      .addCase(addNewContact.fulfilled, (state) => {
        state.addingLoading = false;
      })
      .addCase(addNewContact.rejected, (state) => {
        state.addingLoading = false;
        state.error = true;
      })
      .addCase(updateContact.pending, (state) => {
        state.updatingLoading = true;
        state.error = false;
      })
      .addCase(updateContact.fulfilled, (state) => {
        state.updatingLoading = false;
      })
      .addCase(updateContact.rejected, (state) => {
        state.updatingLoading = false;
        state.error = true;
      })
      .addCase(deleteContact.pending, (state) => {
        state.deletingLoading = true;
        state.error = false;
      })
      .addCase(deleteContact.fulfilled, (state) => {
        state.deletingLoading = false;
      })
      .addCase(deleteContact.rejected, (state) => {
        state.deletingLoading = false;
        state.error = true;
      });
  },
});

export const phoneBookReducer = phoneBookSlice.reducer;
