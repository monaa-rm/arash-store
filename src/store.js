import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import globalSlice from "./features/globalSlice";
import filterSlice from "./features/filterSlice";
import orderSlice from "./features/orderSlice";
const store = configureStore({
  reducer: {
    globalSlice: globalSlice,
    filterSlice: filterSlice,
    productSlice: productSlice,
    orderSlice: orderSlice,
  },
});

export default store;
