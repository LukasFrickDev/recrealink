import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ChatVisiblePresence = "online" | "away" | "busy" | "offline";
export type ChatPresenceModuleKey = "recreador" | "hotelaria" | "empresa" | "pais";

type ChatPresenceByModule = Record<ChatPresenceModuleKey, ChatVisiblePresence>;
type UnreadByModule = Record<ChatPresenceModuleKey, number>;

interface MockState {
  unreadNotifications: number;
  unreadMessages: number;
  unreadNotificationsByModule: UnreadByModule;
  unreadMessagesByModule: UnreadByModule;
  highlightedCity: string;
  chatPresenceByModule: ChatPresenceByModule;
}

const initialState: MockState = {
  unreadNotifications: 3,
  unreadMessages: 2,
  unreadNotificationsByModule: {
    recreador: 3,
    hotelaria: 8,
    empresa: 6,
    pais: 4,
  },
  unreadMessagesByModule: {
    recreador: 2,
    hotelaria: 9,
    empresa: 5,
    pais: 3,
  },
  highlightedCity: "São Paulo, SP",
  chatPresenceByModule: {
    recreador: "online",
    hotelaria: "busy",
    empresa: "away",
    pais: "offline",
  },
};

const mockSlice = createSlice({
  name: "mock",
  initialState,
  reducers: {
    setUnreadNotifications(state, action: PayloadAction<number>) {
      state.unreadNotifications = action.payload;
      state.unreadNotificationsByModule.recreador = action.payload;
    },
    setUnreadMessages(state, action: PayloadAction<number>) {
      state.unreadMessages = action.payload;
      state.unreadMessagesByModule.recreador = action.payload;
    },
    setUnreadNotificationsForModule(
      state,
      action: PayloadAction<{ moduleKey: ChatPresenceModuleKey; count: number }>,
    ) {
      const count = Math.max(0, Math.trunc(action.payload.count));

      state.unreadNotificationsByModule[action.payload.moduleKey] = count;

      if (action.payload.moduleKey === "recreador") {
        state.unreadNotifications = count;
      }
    },
    setUnreadMessagesForModule(
      state,
      action: PayloadAction<{ moduleKey: ChatPresenceModuleKey; count: number }>,
    ) {
      const count = Math.max(0, Math.trunc(action.payload.count));

      state.unreadMessagesByModule[action.payload.moduleKey] = count;

      if (action.payload.moduleKey === "recreador") {
        state.unreadMessages = count;
      }
    },
    setHighlightedCity(state, action: PayloadAction<string>) {
      state.highlightedCity = action.payload;
    },
    setChatVisiblePresence(
      state,
      action: PayloadAction<{ moduleKey: ChatPresenceModuleKey; presence: ChatVisiblePresence }>,
    ) {
      state.chatPresenceByModule[action.payload.moduleKey] = action.payload.presence;
    },
  },
});

export const {
  setUnreadNotifications,
  setUnreadMessages,
  setUnreadNotificationsForModule,
  setUnreadMessagesForModule,
  setHighlightedCity,
  setChatVisiblePresence,
} = mockSlice.actions;
export default mockSlice.reducer;
