import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slice/counterSlice";
import cartReducer from "../slice/cartSlice";
import inventoryReducer from "../slice/inventorySlice";
import notificationReducer from "../slice/notificationSlice";
import barcodeReducer from "../slice/barcodeSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    inventory: inventoryReducer,
    notification: notificationReducer,
    barcode: barcodeReducer,
  },
});
