import { configureStore } from "@reduxjs/toolkit";
import mockReducer from "@/app/store/slices/mockSlice";
import profileReducer from "@/app/store/slices/profileSlice";
import recreadorFlowReducer from "@/app/store/slices/recreadorFlowSlice";
import recreadorReducer from "@/app/store/slices/recreadorSlice";
import uiReducer from "@/app/store/slices/uiSlice";

export const createTestStore = () => {
  return configureStore({
    reducer: {
      ui: uiReducer,
      profile: profileReducer,
      mock: mockReducer,
      recreador: recreadorReducer,
      recreadorFlow: recreadorFlowReducer,
    },
  });
};

export type TestStore = ReturnType<typeof createTestStore>;
export type TestRootState = ReturnType<TestStore["getState"]>;
