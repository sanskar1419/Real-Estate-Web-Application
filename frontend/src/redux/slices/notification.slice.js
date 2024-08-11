import { createSlice } from "@reduxjs/toolkit";
import { userActions } from "./user.slice";
import { propertyActions } from "./propertySlice";

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
      })
      .addCase(userActions.updateSuccess, (state, action) => {
        state.message = "Hurray 🙌🙌🙌, Your detailed has been updated";
      })
      .addCase(userActions.updateError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(userActions.deleteSuccess, (state, action) => {
        state.message = "😔😔😔Sad to see you go 😔😔😔";
      })
      .addCase(userActions.deleteError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(userActions.logoutSuccess, (state, action) => {
        state.message = "🙌🙌Logout Successfully🙌🙌";
      })
      .addCase(userActions.logoutError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(propertyActions.addSuccess, (state, action) => {
        state.message = "🙌🙌New property has been added successfully🙌🙌";
      })
      .addCase(propertyActions.addError, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const notificationReducer = notificationSlice.reducer;
export const notificationAction = notificationSlice.actions;

export const getError = (state) => state.notification.error;
export const getMessage = (state) => state.notification.message;
