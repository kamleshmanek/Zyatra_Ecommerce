// src/features/Product/ProductSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ProductSlice = createSlice({
  name: "Product",
  initialState: {
    ProductData: [] as any[],
    ProductLoading: false,
    ProductError: null as string | null,
  },
  reducers: {
    ProductStart: (state) => {
      state.ProductLoading = true;
      state.ProductError = null;
    },
    GetProductSuccess: (state, action) => {
      state.ProductLoading = false;
      state.ProductData = action.payload || [];
      state.ProductError = null;
    },
    GetProductFailure: (state, action) => {
      state.ProductLoading = false;
      state.ProductError = action.payload;
    },
  },
});

export const {
  ProductStart,
  GetProductSuccess,
  GetProductFailure,
} = ProductSlice.actions;

export const GetProductApi = (id: number) => async (dispatch: any) => {
  dispatch(ProductStart());
  try {
    const res = await axios.get(`https://dummyjson.com/products/${id}`);
    dispatch(GetProductSuccess(res.data)); // returns single product object
  } catch (error: any) {
    dispatch(GetProductFailure(error.message || "Something went wrong"));
  }
};

export default ProductSlice.reducer;
