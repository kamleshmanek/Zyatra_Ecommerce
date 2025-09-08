// src/features/Search/SearchSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SearchSlice = createSlice({
  name: "Search",
  initialState: {
    SearchData: [] as any[],
    SearchLoading: false,
    SearchError: null as string | null,
  },
  reducers: {
    SearchStart: (state) => {
      state.SearchLoading = true;
      state.SearchError = null;
    },
    GetSearchSuccess: (state, action) => {
      state.SearchLoading = false;
      state.SearchData = action.payload || [];
      state.SearchError = null;
    },
    GetSearchFailure: (state, action) => {
      state.SearchLoading = false;
      state.SearchError = action.payload;
    },
  },
});

export const {
  SearchStart,
  GetSearchSuccess,
  GetSearchFailure,
} = SearchSlice.actions;

export const GetSearchApi = (query: string) => async (dispatch: any) => {
  dispatch(SearchStart());
  try {
    const res = await axios.get(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
    );

    dispatch(GetSearchSuccess(res.data)); 
  } catch (error: any) {
    dispatch(GetSearchFailure(error));
  }
};

export default SearchSlice.reducer;
