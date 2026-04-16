import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isSidebarCollapsed: boolean;
  isMobileMenuOpen: boolean;
}

const initialState: UIState = {
  isSidebarCollapsed: false,
  isMobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebarCollapsed(state) {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.isSidebarCollapsed = action.payload;
    },
    setMobileMenuOpen(state, action: PayloadAction<boolean>) {
      state.isMobileMenuOpen = action.payload;
    },
  },
});

export const { toggleSidebarCollapsed, setSidebarCollapsed, setMobileMenuOpen } = uiSlice.actions;
export default uiSlice.reducer;
