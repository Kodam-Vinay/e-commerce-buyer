import { createSlice } from "@reduxjs/toolkit";

const allFiltersSlice = createSlice({
  name: "allFilters",
  initialState: {
    categoriesList: [],
    brandsList: [],
    subCategoriesList: [],
  },
  reducers: {
    storeCategoriesList: (state, action) => {
      state.categoriesList = action.payload;
    },
    storeBrandsList: (state, action) => {
      state.brandsList = action.payload;
    },
    storeSubCategoriesList: (state, action) => {
      state.subCategoriesList = action.payload;
    },
  },
});
export const { storeCategoriesList, storeBrandsList, storeSubCategoriesList } =
  allFiltersSlice.actions;
export default allFiltersSlice.reducer;
