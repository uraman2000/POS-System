import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
  },
  reducers: {
    setInfo: (state) => {
      state.data = JSON.parse(localStorage.getItem("User"));
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInfo } = userSlice.actions;
export const usertValue = (state) => state.user.data;
export default userSlice.reducer;
