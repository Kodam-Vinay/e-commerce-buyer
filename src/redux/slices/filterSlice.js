import { createSlice } from "@reduxjs/toolkit";
import { SORT_FILTER_OPTIONS } from "../../utils/constants";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    isFilterOpen: false,
    isSortFilterOpen: false,
    category: "",
    subCategory: "",
    brand: "",
    sortBy: SORT_FILTER_OPTIONS.relavance,
  },
  reducers: {
    toggleFilterStatus: (state, action) => {
      state.isFilterOpen = action.payload;
    },
    toggleSortFilterStatus: (state, action) => {
      state.isSortFilterOpen = action.payload;
    },
    storeCategoryFilter: (state, action) => {
      state.category = action.payload;
    },
    storeSubCategoryFilter: (state, action) => {
      state.subCategory = action.payload;
    },
    storeBrandFilter: (state, action) => {
      state.brand = action.payload;
    },
    storeSortFilter: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});
export const {
  storeCategoryFilter,
  storeSubCategoryFilter,
  storeBrandFilter,
  toggleFilterStatus,
  toggleSortFilterStatus,
  storeSortFilter,
} = filterSlice.actions;
export default filterSlice.reducer;
