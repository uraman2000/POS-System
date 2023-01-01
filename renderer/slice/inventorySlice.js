import { createSlice } from "@reduxjs/toolkit";

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    data: [],
    search_data: [],
  },
  reducers: {
    addInventory: (state, action) => {
      const payload = action.payload;
      state.data = payload;
      state.search_data = payload;
    },
    search: (state, action) => {
      const payload = action.payload;

      if (payload) {
        // const searchResults = state.data.filter((product) => product.name.includes(payload));

        const searchResults = state.data.filter(
          (product) =>
            product.name.toLowerCase().includes(payload.toLowerCase()) ||
            product.id.toLowerCase().includes(payload.toLowerCase())
        );

        state.search_data = searchResults;
      } else {
        state.search_data = state.data;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addInventory, search } = inventorySlice.actions;
export const inventoryValue = (state) => state.inventory;
export default inventorySlice.reducer;
