import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], totalQuantity: 0, changed: false };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },

    addItem(state, action) {
      state.totalQuantity++;
      state.changed = true;

      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (!existingItem) {
        state.items.push(action.payload);
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
    },

    removeItem(state, action) {
      state.totalQuantity--;
      state.changed = true;

      const existingItem = state.items.find(
        (item) => item.id === action.payload,
      );

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }

      if (existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
