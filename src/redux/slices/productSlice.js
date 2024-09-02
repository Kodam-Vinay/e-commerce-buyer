import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    activeProduct: {},
    productsList: [],
  },
  reducers: {
    storeActiveProduct: (state, action) => {
      state.activeProduct = action.payload;
    },
    storeProductsList: (state, action) => {
      state.productsList = action.payload;
    },
  },
});
export const { storeActiveProduct, storeProductsList } = productSlice.actions;
export default productSlice.reducer;
