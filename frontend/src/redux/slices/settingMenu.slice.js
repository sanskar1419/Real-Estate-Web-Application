import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSettingMenu: false,
};

const settingSlice = createSlice({
  name: "settingMenu",
  initialState,
  reducers: {
    showMenu: (state, action) => {
      state.showSettingMenu = true;
    },
    hideMenu: (state, action) => {
      state.showSettingMenu = false;
    },
  },
});

export const settingMenuReducers = settingSlice.reducer;
export const settingMenuActions = settingSlice.actions;

export const getSettingMenu = (state) => state.settingMenu.showSettingMenu;
