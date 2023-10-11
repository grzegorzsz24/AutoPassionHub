import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
  theme: string;
}

const initialState: ThemeState = {
  theme: localStorage.getItem("MotoSplotTheme") || "dark",
};

if (initialState.theme === "dark") {
  document.body.classList.add("dark");
}

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
      localStorage.setItem("MotoSplotTheme", action.payload);
      if (action.payload === "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    },
  },
});

export const { setTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
