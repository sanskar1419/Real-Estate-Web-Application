import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user.slice.js";
import { notificationReducer } from "./slices/notification.slice.js";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { settingMenuReducers } from "./slices/settingMenu.slice.js";
import { propertyReducer } from "./slices/propertySlice.js";

const rootReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  settingMenu: settingMenuReducers,
  property: propertyReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persister = persistStore(store);
