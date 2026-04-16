import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MockState {
  unreadNotifications: number;
  unreadMessages: number;
  highlightedCity: string;
}

const initialState: MockState = {
  unreadNotifications: 3,
  unreadMessages: 2,
  highlightedCity: "São Paulo, SP",
};

const mockSlice = createSlice({
  name: "mock",
  initialState,
  reducers: {
    setUnreadNotifications(state, action: PayloadAction<number>) {
      state.unreadNotifications = action.payload;
    },
    setUnreadMessages(state, action: PayloadAction<number>) {
      state.unreadMessages = action.payload;
    },
    setHighlightedCity(state, action: PayloadAction<string>) {
      state.highlightedCity = action.payload;
    },
  },
});

export const { setUnreadNotifications, setUnreadMessages, setHighlightedCity } = mockSlice.actions;
export default mockSlice.reducer;
