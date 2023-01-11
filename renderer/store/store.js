import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slice/counterSlice";
import cartReducer from "../slice/cartSlice";
import inventoryReducer from "../slice/inventorySlice";
import notificationReducer from "../slice/notificationSlice";
import barcodeReducer from "../slice/barcodeSlice";
import userReducer from "../slice/userSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    inventory: inventoryReducer,
    notification: notificationReducer,
    barcode: barcodeReducer,
    user: userReducer,
  },
});
