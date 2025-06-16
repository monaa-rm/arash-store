import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import globalSlice from "./features/globalSlice";
import filterSlice from "./features/filterSlice";
const store = configureStore({
  reducer: {
    globalSlice: globalSlice,
    filterSlice: filterSlice,
    productSlice: productSlice,
  },
});

export default store;
