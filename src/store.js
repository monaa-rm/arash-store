import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import globalSlice from "./features/globalSlice";
import filterSlice from "./features/filterSlice";
import blogSlice from "./features/blogSlice";
const store = configureStore({
  reducer: {
    globalSlice: globalSlice,
    filterSlice: filterSlice,
    productSlice: productSlice,
    blogSlice : blogSlice
  },
});

export default store;
