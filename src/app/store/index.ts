import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import profileReducer from "./slices/profileSlice";
import mockReducer from "./slices/mockSlice";
import recreadorReducer from "./slices/recreadorSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    profile: profileReducer,
    mock: mockReducer,
    recreador: recreadorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
