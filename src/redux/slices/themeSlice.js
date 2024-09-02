import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "theme",
  initialState: {
    isDarkMode: false,
  },
  reducers: {
    toggleThemeMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});
export const { toggleThemeMode } = userSlice.actions;
export default userSlice.reducer;
