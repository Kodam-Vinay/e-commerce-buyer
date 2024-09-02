import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchInput: "",
    isSearchClicked: false,
  },
  reducers: {
    storeSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    toggleSearchClick: (state, action) => {
      state.isSearchClicked = action.payload;
    },
  },
});
export const { storeSearchInput, toggleSearchClick } = searchSlice.actions;
export default searchSlice.reducer;
