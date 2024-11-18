import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITVShow, ShowOption, ShowSearchResult } from "../../types";
import axiosAPI from "../../utils/axiosAPI.ts";

export const fetchSearchResults = createAsyncThunk<ShowOption[], string>(
  "tvShows/createAsyncThunk",
  async (title: string) => {
    const response = await axiosAPI<ShowSearchResult[]>(
      `search/shows?q=${title}`,
    );
    return response.data.map((show) => ({
      title: show.show.name,
      id: show.show.id,
    }));
  },
);

export const fetchTVShowDetails = createAsyncThunk<ITVShow, number>(
  "tvShows/fetchTVShowDetails",
  async (id: number) => {
    const response = await axiosAPI(`shows/${id}`);
    return response.data;
  },
);
