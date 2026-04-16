import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { HoteisTabId } from "@/modules/recreador/mocks/hoteis";

type HotelStateFilter = "todos" | "sp" | "rj" | "sc";
type HotelCategoryFilter = "todas" | "resort" | "hotel" | "pousada";

interface RecreadorProfileState {
  fullName: string;
  roleTitle: string;
  city: string;
  shortBio: string;
  portfolioHeadline: string;
  email: string;
  phone: string;
  avatarPreview: string;
  specialties: string[];
}

interface RecreadorUIState {
  topbarSearch: string;
  hotelTab: HoteisTabId;
  hotelStateFilter: HotelStateFilter;
  hotelCategoryFilter: HotelCategoryFilter;
  lastVisualAction: string | null;
}

interface RecreadorState {
  profile: RecreadorProfileState;
  ui: RecreadorUIState;
}

const initialState: RecreadorState = {
  profile: {
    fullName: "Rafael Santos",
    roleTitle: "Recreador profissional",
    city: "São Paulo, SP",
    shortBio:
      "Especialista em recreação infantil e familiar com foco em atividades de engajamento, segurança e experiência positiva dos hóspedes.",
    portfolioHeadline: "Portfólio em construção com experiências recentes e evidências de campo.",
    email: "rafael.santos@recrealink.com",
    phone: "(11) 97777-9090",
    avatarPreview: "RS",
    specialties: [
      "Recreação infantil",
      "Gincanas aquáticas",
      "Eventos temáticos",
      "Atividades para famílias",
    ],
  },
  ui: {
    topbarSearch: "",
    hotelTab: "atuados",
    hotelStateFilter: "todos",
    hotelCategoryFilter: "todas",
    lastVisualAction: null,
  },
};

const recreadorSlice = createSlice({
  name: "recreador",
  initialState,
  reducers: {
    setTopbarSearch(state, action: PayloadAction<string>) {
      state.ui.topbarSearch = action.payload;
    },
    clearTopbarSearch(state) {
      state.ui.topbarSearch = "";
    },
    setHotelTab(state, action: PayloadAction<HoteisTabId>) {
      state.ui.hotelTab = action.payload;
    },
    setHotelStateFilter(state, action: PayloadAction<HotelStateFilter>) {
      state.ui.hotelStateFilter = action.payload;
    },
    setHotelCategoryFilter(state, action: PayloadAction<HotelCategoryFilter>) {
      state.ui.hotelCategoryFilter = action.payload;
    },
    setLastVisualAction(state, action: PayloadAction<string | null>) {
      state.ui.lastVisualAction = action.payload;
    },
    updateProfile(state, action: PayloadAction<Partial<RecreadorProfileState>>) {
      state.profile = {
        ...state.profile,
        ...action.payload,
      };
    },
    setProfileSpecialties(state, action: PayloadAction<string[]>) {
      state.profile.specialties = action.payload;
    },
  },
});

export const {
  setTopbarSearch,
  clearTopbarSearch,
  setHotelTab,
  setHotelStateFilter,
  setHotelCategoryFilter,
  setLastVisualAction,
  updateProfile,
  setProfileSpecialties,
} = recreadorSlice.actions;

export default recreadorSlice.reducer;