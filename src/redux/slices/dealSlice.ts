import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  id: number;
  name: string;
}

export interface Deal {
  id: number;
  name?: string | null;
  therapeuticArea?: Item | null;
  stage?: Item | null;
  modifiedBy?: Item | null;
  dateModified?: number | null;
  leads?: Item[] | null;
}

const initialState: Deal[] = [];

export const dealSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = dealSlice.actions;

export default dealSlice.reducer;
