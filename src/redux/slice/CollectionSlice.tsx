// src/features/collection/collectionSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CollectionSlice = createSlice({
  name: "Collection",
  initialState: {
    collectionData: [] as any[],
    collectionLoading: false,
    collectionError: null as string | null,
  },
  reducers: {
    GetCollectionStart: (state) => {
      state.collectionLoading = true;
      state.collectionError = null;
    },
    GetCollectionSuccess: (state, action) => {
      state.collectionLoading = false;
      state.collectionData = action.payload || [];
      state.collectionError = null;
    },
    GetCollectionFailure: (state, action) => {
      state.collectionLoading = false;
      state.collectionError = action.payload;
    },
  },
});

export const {
  GetCollectionStart,
  GetCollectionSuccess,
  GetCollectionFailure,
} = CollectionSlice.actions;


export const GetCollectionApi = (category: string) => async (dispatch: any) => {
  dispatch(GetCollectionStart());
  try {
    const res = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );

    const products = res.data
    dispatch(GetCollectionSuccess(products));
  } catch (error: any) {
    dispatch(GetCollectionFailure(error.message || "Something went wrong"));
  }
};

export default CollectionSlice.reducer;
