import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../utils/axiosAPI.ts";
import { Phone } from "../../typed";

export const fetchPhonesFromDB = createAsyncThunk<Phone[]>(
  "phones/fetchPhonesFromDB",
  async () => {
    const response = await axiosAPI("/phones.json");
    if (response.data) {
      const phonesArray: Phone[] = Object.keys(response.data).map((key) => ({
        id: key,
        ...response.data[key],
      }));

      return phonesArray;
    } else {
      return [];
    }
  },
);

export const fetchContactById = createAsyncThunk<Phone, string>(
  "phones/fetchContactById",
  async (id: string) => {
    const response = await axiosAPI(`phones/${id}.json`);
    return response.data;
  },
);

export const addNewContact = createAsyncThunk<void, Phone>(
  "phones/addNewContact",
  async (newContact: Phone) => {
    await axiosAPI.post("phones.json", newContact);
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
    await axiosAPI.delete(`phones/${id}.json`);
    await dispatch(fetchPhonesFromDB());
  },
);
