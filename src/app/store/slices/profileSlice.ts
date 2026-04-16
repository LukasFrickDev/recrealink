import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AccessProfile = "recreador" | "hotelaria" | "empresa" | "pais";

const ACCESS_PROFILE_STORAGE_KEY = "recrealink.selected-access-profile";

const isAccessProfile = (value: string): value is AccessProfile => {
  return value === "recreador" || value === "hotelaria" || value === "empresa" || value === "pais";
};

const normalizeStoredAccessProfile = (value: string): AccessProfile | null => {
  if (value === "eventos") {
    return "empresa";
  }

  return isAccessProfile(value) ? value : null;
};

const readStoredAccessProfile = (): AccessProfile | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(ACCESS_PROFILE_STORAGE_KEY);
    if (!stored) {
      return null;
    }

    return normalizeStoredAccessProfile(stored);
  } catch {
    return null;
  }
};

const writeStoredAccessProfile = (profile: AccessProfile) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(ACCESS_PROFILE_STORAGE_KEY, profile);
  } catch {
    // Ignore storage write issues to keep visual flow functional.
  }
};

interface ProfileState {
  selectedVisualArea: AccessProfile | null;
  selectedAccessProfile: AccessProfile | null;
}

const storedAccessProfile = readStoredAccessProfile();

const initialState: ProfileState = {
  selectedVisualArea: storedAccessProfile ?? "recreador",
  selectedAccessProfile: storedAccessProfile,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setSelectedVisualArea(state, action: PayloadAction<AccessProfile>) {
      state.selectedVisualArea = action.payload;
    },
    setSelectedAccessProfile(state, action: PayloadAction<AccessProfile>) {
      state.selectedAccessProfile = action.payload;
      state.selectedVisualArea = action.payload;
      writeStoredAccessProfile(action.payload);
    },
  },
});

export const { setSelectedVisualArea, setSelectedAccessProfile } = profileSlice.actions;
export default profileSlice.reducer;
