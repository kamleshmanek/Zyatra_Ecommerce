import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./slice/homeSlice";
import CatgeoryReducer from "./slice/CatgeorySlice";
import CollectionReducer from "./slice/CollectionSlice";
import SearchReducer from "./slice/SearchSlice";
import ProductReducer from "./slice/ProductSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    category:CatgeoryReducer,
    Collection:CollectionReducer,
    Search:SearchReducer,
    Product:ProductReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;