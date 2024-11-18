import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../utils/axiosAPI.ts";
import { Phone } from "../../typed";

export const fetchPhonesFromDB = createAsyncThunk<Phone[]>(
  "phones/fetchPhonesFromDB",
  async () => {
    const response = await axiosAPI("phones.json");
    return response.data;
  },
);

export const addNewContact = createAsyncThunk<void, Phone>(
  "phones/addNewContact",
  async () => {
    await axiosAPI.post("phones.json");
  },
);

export const updateContact = createAsyncThunk<void, Phone>(
  "phones/updateContact",
  async (updatedContact) => {
    await axiosAPI.put(`phones/${updatedContact.id}.json`, updatedContact);
  },
);

export const deleteContact = createAsyncThunk<void, string>(
  "contacts/deleteContact",
  async (id: string, { dispatch }) => {
    await axiosAPI.delete(`phones/${id}`);
    await dispatch(fetchPhonesFromDB());
  },
);
