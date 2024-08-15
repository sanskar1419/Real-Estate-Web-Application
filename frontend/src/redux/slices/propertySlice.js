import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    addStart: (state, action) => {
      state.loading = true;
    },
    addSuccess: (state, action) => {
      state.loading = false;
    },
    addError: (state, action) => {
      state.loading = false;
    },
    updateSuccess: (state, action) => {
      state.loading = false;
    },
  },
});

export const propertyReducer = propertySlice.reducer;
export const propertyActions = propertySlice.actions;

export const getPropertyLoadingState = (state) => state.property.loading;
