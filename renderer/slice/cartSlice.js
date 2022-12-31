import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    total: 0,
    status: "", // pending,, fulfulied
    error: [], //error
  },
  reducers: {
    addCart: (state, action) => {
      const payload = action.payload;
      const data = state.data;

      const existingProduct = data.find((item) => item.product_id === payload.product_id);
      if (existingProduct) {
        const updatedData = data.map((item) => {
          if (item.product_id === payload.product_id) {
            const qty = item.qty + 1;
            return {
              ...item,
              total_price: payload.price * qty,
              qty,
            };
          }
          return item;
        });
        // Calculate the total price of all products in the cart
        const total = updatedData.reduce((acc, item) => acc + item.total_price, 0);
        return {
          ...state,
          data: updatedData,
          total,
        };
      }
      const total = state.total + payload.price;
      return {
        ...state,
        data: [...data, { ...payload, qty: 1, total_price: payload.price }],
        total,
      };
    },
    clearCart: (state) => {
      return {
        ...state,
        data: [],
        total: 0,
      };
    },
    removeItem: (state, action) => {
      const payload = action.payload;
      const data = state.data;

      const updatedData = data.filter((item) => item.product_id !== payload.product_id);

      // Calculate the total price of all products in the cart
      let total = 0;

      updatedData.forEach((item) => {
        total += item.total_price;
      });

      return {
        ...state,
        data: updatedData,
        total,
      };
    },
    removeQty: (state, action) => {
      const payload = action.payload;
      const data = state.data;
      const updatedData = data.map((item) => {
        if (item.product_id === payload.product_id) {
          const qty = item.qty - 1;
          return {
            ...item,
            total_price: payload.price * qty,
            qty,
          };
        }
        return item;
      });
      // Remove items with a qty of 0
      const filteredData = updatedData.filter((item) => item.qty > 0);
      // Calculate the total price of all products in the cart
      const total = filteredData.reduce((acc, item) => acc + item.total_price, 0);
      return {
        ...state,
        data: filteredData,
        total,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCart, clearCart, removeItem, removeQty } = cartSlice.actions;

export const cartValue = (state) => state.cart;

export default cartSlice.reducer;
