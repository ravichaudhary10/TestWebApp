import { createSlice } from "@reduxjs/toolkit";
import { SelectItem } from "primereact/selectitem";
import { User } from "../../types/commonTypes";

export interface RootState {
  lineFunctions: SelectItem[] | null;
  stages: SelectItem[] | null;
  therapeuticAreas: SelectItem[] | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
  toastInfo: { severity: string; message: string } | null;
}

const initialState: RootState = {
  lineFunctions: [],
  stages: [],
  therapeuticAreas: [],
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  toastInfo: null,
};

export const rootSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {
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

    // Show toast message
    showToast(state, action) {
      state.toastInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  storeLineFunctions,
  storeStages,
  storeTherapeuticAreas,
  storeAuthInfo,
  initialized,
  showToast,
} = rootSlice.actions;

export default rootSlice.reducer;
