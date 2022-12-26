import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slice/counterSlice";
import cartReducer from "../slice/cartSlice";
import inventoryReducer from "../slice/inventorySlice";

export default configureStore({
  reducer: { counter: counterReducer, cart: cartReducer, inventory: inventoryReducer },
});
