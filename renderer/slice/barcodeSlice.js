import { createSlice } from "@reduxjs/toolkit";

export const barcodeSlice = createSlice({
  name: "barcode",
  initialState: {
    data: {
      isdisableInput: false,
    },
  },
  reducers: {
    disableInput: (state) => {
      state.data.isdisableInput = true;
    },
    enableInput: (state) => {
      state.data.isdisableInput = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { disableInput, enableInput } = barcodeSlice.actions;
export const barcodeValue = (state) => state.barcode.data;
export default barcodeSlice.reducer;
