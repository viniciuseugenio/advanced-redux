import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui.js";
import { DB_URL } from "../config.js";

const initialState = { items: [], totalQuantity: 0, upload: false };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.totalQuantity++;
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

export function sendCartData(cart) {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Uploading cart data!",
      }),
    );

    const sendRequest = async () => {
      const response = await fetch(DB_URL, {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart uploaded successfully",
        }),
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart data failed!",
        }),
      );
    }
  };
}

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
