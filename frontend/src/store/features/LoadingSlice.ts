import { createSlice } from "@reduxjs/toolkit";

export interface LoadingState {
  loading: boolean;
}

const initialState: LoadingState = {
  loading: false,
};

const ThemeSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
  },
});

export const { startLoading, stopLoading } = ThemeSlice.actions;
export default ThemeSlice.reducer;
