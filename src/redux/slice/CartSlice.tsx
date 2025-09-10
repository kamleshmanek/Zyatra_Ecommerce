
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastAndroid } from "react-native";


type CartState = {
  CartData: any
};

const initialState: CartState = {
  CartData: [],
};

const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      const product = action.payload;
      const existing = state.CartData.find((item) => item.id === product.id);
      console.log(product,"product----------")

      if (existing) {
        // ToastAndroid.show("Qty Update",2000)
        existing.qty += 1;
      } else {
        // ToastAndroid.show("Added in cart",2000)
        state.CartData.push({ ...product, qty: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string | number>) => {
      state.CartData = state.CartData.filter((item) => item.id !== action.payload);
    },
   updateQty: (
  state,
  action: PayloadAction<{ id: string | number; qty: number }>
) => {
  const itemIndex = state.CartData.findIndex(
    (i) => i.id === action.payload.id
  );

  if (itemIndex !== -1) {
    if (action.payload.qty <= 0) {
      state.CartData.splice(itemIndex, 1);
    } else {
      state.CartData[itemIndex].qty = action.payload.qty;
    }
  }
},
    clearCart: (state) => {
      state.CartData = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } =
  CartSlice.actions;

 

export default CartSlice.reducer;
