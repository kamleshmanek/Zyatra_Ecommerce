// src/features/home/homeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    categories: {},   // store multiple categories
    loading: false,
    error: null,

    BrandData:[],
      Brandloading: false,
    Branderror: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.categories = { ...state.categories, ...action.payload }; // merge new category
      state.error = null;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

     fetchBrandStart: (state) => {
      state.Brandloading = true;
      state.Branderror = null;
    },
    fetchBrandSuccess: (state, action) => {
      state.Brandloading = false;
      state.BrandData =  action.payload 
      state.Branderror = null;
    },
    fetchBrandFailure: (state, action) => {
      state.Brandloading = false;
      state.Branderror = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure,fetchBrandStart,fetchBrandSuccess,fetchBrandFailure } = homeSlice.actions;


export const fetchMultipleCategories = () => async (dispatch: any) => {
  dispatch(fetchStart());
  try {
    const beautyResponse = await axios.get(
      "https://dummyjson.com/products/category/beauty"
    );
    const beautyData = {
      beauty: {
        ...beautyResponse.data,
        name: "Beauty",
        handle: "beauty",
      },
    };


    const womensBagsResponse = await axios.get(
      "https://dummyjson.com/products/category/womens-bags"
    );
    const womensBagsData = {
      "womensbag": {
        ...womensBagsResponse.data,
        name: "Womens Bags",
        handle: "womens-bags",
      },
    };

    // Merge both manually
    const mergedData = {
      ...beautyData,
      ...womensBagsData,
    };

    dispatch(fetchSuccess(mergedData));
  } catch (error) {
    console.error("Error fetching categories:", error);
    dispatch(fetchFailure(error));
  }
};

export const fetchBrands = () => async (dispatch: any) => {
  dispatch(fetchBrandStart());
  try {
    const res = await axios.get("https://testbrand.free.beeceptor.com/favicon.ico");

    dispatch(fetchBrandSuccess(res?.data));
  } catch (error: any) {
    console.error("Error fetching brands:", error);
    dispatch(fetchBrandFailure(error.message));
  }
};

export default homeSlice.reducer;
