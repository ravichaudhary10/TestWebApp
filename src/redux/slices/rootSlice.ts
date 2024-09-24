import { createSlice } from "@reduxjs/toolkit";
import type { Deal } from "../../components/DealListView";
import { SelectItem } from "primereact/selectitem";
import { User } from "../../types/commonTypes";

export interface RootState {
  isLoading: boolean;
  error: string | null;
  deals: { data: Deal[]; totalRecords: number } | null;
  resources: { data: []; totalRecords: number } | null;
  lineFunctions: SelectItem[] | null;
  stages: SelectItem[] | null;
  therapeuticAreas: SelectItem[] | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
}

const initialState: RootState = {
  isLoading: false,
  error: null,
  deals: null,
  resources: null,
  lineFunctions: [],
  stages: [],
  therapeuticAreas: [],
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

export const rootSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {
    // Start loading
    startLoading(state) {
      state.isLoading = true;
    },

    // Stop loading
    stopLoading(state) {
      state.isLoading = false;
    },

    // Has error
    hasError(state, action) {
      state.error = action.payload;
    },

    // Store deals
    storeDeals(state, action) {
      state.deals = action.payload;
    },

    // Store line functions
    storeLineFunctions(state, action) {
      state.lineFunctions = action.payload;
    },

    // Store stages
    storeStages(state, action) {
      state.stages = action.payload;
    },

    // Store therapeutic areas
    storeTherapeuticAreas(state, action) {
      state.therapeuticAreas = action.payload;
    },

    // Store logged in user info
    storeAuthInfo(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    // App initialized
    initialized(state) {
      state.isInitialized = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  startLoading,
  stopLoading,
  hasError,
  storeDeals,
  storeLineFunctions,
  storeStages,
  storeTherapeuticAreas,
  storeAuthInfo,
  initialized,
} = rootSlice.actions;

export default rootSlice.reducer;
