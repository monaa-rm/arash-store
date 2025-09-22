import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showCategory: false,
  headerSearchValue: "",
  headerSearchedItems: [],
  searchedCategory: {},
  searchPrice: [0, 2000000000],
  reloadFilter: -1,
  highestPrice: 2000000000,
  numberCategories: 0,
  totalProducts: 0,
  activeSearchHeaderItem: "default",
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setShowCategory: (state, action) => {
      state.showCategory = action.payload;
    },

    setHeaderSearchValue: (state, action) => {
      state.headerSearchValue = action.payload;
    },
    setHeaderSearchedItems: (state, action) => {
      state.headerSearchedItems = action.payload;
    },
    setSearchedCategory: (state, action) => {
      state.searchedCategory = action.payload;
    },
    setSearchPrice: (state, action) => {
      state.searchPrice = action.payload;
    },
    setNumberCategories: (state, action) => {
      state.numberCategories = action.payload;
    },
    setTotalProducts: (state, action) => {
      state.totalProducts = action.payload;
    },
    setHighestPrice: (state, action) => {
      state.highestPrice = action.payload;
    },
    setActiveSearchHeaderItem: (state, action) => {
      state.activeSearchHeaderItem = action.payload;
    },
    setReloadFilter: (state, action) => {
      state.reloadFilter = state.reloadFilter * -1;
    },
  },
});

export const {
  setShowCategory,
  setSearchedCategory,
  setSearchPrice,
  setHeaderSearchValue,
  setHeaderSearchedItems,
  setReloadFilter,
  setNumberCategories,
  setTotalProducts,
  setHighestPrice,
  setActiveSearchHeaderItem,
} = filterSlice.actions;
export default filterSlice.reducer;
