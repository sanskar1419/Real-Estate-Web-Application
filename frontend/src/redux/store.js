import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user.slice.js";
import { notificationReducer } from "./slices/notification.slice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
  },
});
