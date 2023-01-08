import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    showNotification(state, action) {
      const { message, type, title } = action.payload;
      notification.open({
        message: title,
        type,
        description: message,
      });
    },
  },
});
export const { showNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
