import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ RN storage
import homeReducer from "./slice/homeSlice";
import CatgeoryReducer from "./slice/CatgeorySlice";
import CollectionReducer from "./slice/CollectionSlice";
import SearchReducer from "./slice/SearchSlice";
import ProductReducer from "./slice/ProductSlice";
import CartReducer from "./slice/CartSlice";
import wishlistReducer from "./slice/WishlistSlice";

// persist config
const persistConfig = {
  key: "root",
  storage: AsyncStorage, // RN AsyncStorage
  whitelist: ["Cart", "wishlist"], // only persist these slices
};

// combine reducers
const rootReducer = combineReducers({
  home: homeReducer,
  category: CatgeoryReducer,
  Collection: CollectionReducer,
  Search: SearchReducer,
  Product: ProductReducer,
  Cart: CartReducer,
  wishlist: wishlistReducer,
});

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

// persistor
export const persistor = persistStore(store);

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
