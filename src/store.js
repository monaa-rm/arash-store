import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import globalSlice from "./features/globalSlice";
import filterSlice from "./features/filterSlice";
import orderSlice from "./features/orderSlice";

const store = (preloadedState) =>
  configureStore({
    reducer: {
      globalSlice: globalSlice,
      filterSlice: filterSlice,
      productSlice: productSlice,
      orderSlice: orderSlice,
    },
    preloadedState,
  });

export default store;
