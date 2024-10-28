import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui.js";
import cartReducer from "./cart.js";

const store = configureStore({
  reducer: { ui: uiReducer, cart: cartReducer },
});

export default store;
