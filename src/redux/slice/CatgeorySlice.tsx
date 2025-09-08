// src/features/home/homeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CatgeorySlice = createSlice({
  name: "category",
  initialState: {
    Topcategories: [],   
    Toploading: false,
    Toperror: null,
  },
  reducers: {
    fetchTopStart: (state) => {
      state.Toploading = true;
      state.Toperror = null;
    },
    fetchTopSuccess: (state, action) => {
      state.Toploading = false;
      state.Topcategories = action.payload || [];
      state.Toperror = null;
    },
    fetchTopFailure: (state, action) => {
      state.Toploading = false;
      state.Toperror = action.payload;
    },
  },
});

export const { fetchTopStart, fetchTopSuccess, fetchTopFailure } = CatgeorySlice.actions;

export const TopCategoryCategories = () => async (dispatch: any) => {
  dispatch(fetchTopStart());
  try {
    const res = await axios.get("https://dummyjson.com/products/categories");
    const categories: string[] = res.data;

    const categoryWithImages = await Promise.all(
      categories.map(async (cat:any) => {
        const resChild = await axios.get(
        cat?.url
        );
        return {
          name:cat?.name,
          image: resChild.data?.products?.[0]?.thumbnail || null,
          slug:cat?.slug,
          url:cat?.url,
          images:resChild.data?.products?.[0]?.images || [],
        };
      })
    );

    dispatch(fetchTopSuccess(categoryWithImages));
  } catch (error) {
    dispatch(fetchTopFailure(error));
  }
};


export default CatgeorySlice.reducer;
