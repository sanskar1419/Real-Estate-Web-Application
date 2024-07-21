import { createSlice } from "@reduxjs/toolkit";
import { userActions } from "./user.slice";

const initialState = {
  message: null,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    resetMessage: (state, action) => {
      state.message = null;
    },
    resetError: (state, action) => {
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userActions.signInSuccess, (state, action) => {
        state.message = "Hurray 🙌🙌🙌, You have logged in";
      })
      .addCase(userActions.signInError, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const notificationReducer = notificationSlice.reducer;
export const notificationAction = notificationSlice.actions;

export const getError = (state) => state.notification.error;
export const getMessage = (state) => state.notification.message;
