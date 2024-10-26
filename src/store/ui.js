import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartIsOpen: false };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleCart(state) {
      state.cartIsOpen = !state.cartIsOpen;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
