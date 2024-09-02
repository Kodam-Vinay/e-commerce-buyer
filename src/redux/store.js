import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeSlice from "./slices/themeSlice";
import userSlice from "./slices/userSlice";
import pathSlice from "./slices/pathSlice";
import forgetPasswordSlice from "./slices/forgetPasswordSlice";
import imageSlice from "./slices/imageSlice";
import allFiltersSlice from "./slices/allFiltersSlice";
import filterSlice from "./slices/filterSlice";
import productSlice from "./slices/productSlice";
import searchSlice from "./slices/searchSlice";

const persistConfig = {
  key: "vk_mart_data",
  storage,
};

const reducers = combineReducers({
  theme: themeSlice,
  user: userSlice,
  path: pathSlice,
  image: imageSlice,
});

const persistSliceReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: {
    persistSliceReducer,
    forgetPassword: forgetPasswordSlice,
    allFilters: allFiltersSlice,
    filter: filterSlice,
    product: productSlice,
    search: searchSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
persistStore(store);
export default store;
