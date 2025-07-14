import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  productBrrifItem: null,
  showProductBrif: false,
  menuActiveItem: null,
  dashboardActiveItem: { title: "داشبورد ادمین", link: "mainmanager" },
  dashboardUserActiveItem: { title: "داشبورد", link: "mainmanager" },
  showLoginBox: false,
  showPriceGlobal: false,

  showMenu: false,
  showMenuCategory: false,
};
const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setShowProductBrif: (state, action) => {
      state.showProductBrif = action.payload;
    },
    setShowLoginBox: (state, action) => {
      state.showLoginBox = action.payload;
    },
    setProductBrifItem: (state, action) => {
      state.productBrrifItem = action.payload;
    },
    setMenuActiveItem: (state, action) => {
      state.menuActiveItem = action.payload;
    },
    setDashboardActiveItem: (state, action) => {
      state.dashboardActiveItem = action.payload;
    },
    setUserDashboardActiveItem: (state, action) => {
      state.dashboardUserActiveItem = action.payload;
    },
    setShowPriceGlobal: (state, action) => {
      state.showPriceGlobal = action.payload;
    },
    setShowMenu: (state, action) => {
      state.showMenu = action.payload;
    },
    setShowMenuCategory: (state, action) => {
      state.showMenuCategory = action.payload;
    },
  },
});

export const {
  setShowProductBrif,
  setProductBrifItem,
  setMenuActiveItem,
  setDashboardActiveItem,
  setShowLoginBox,
  setUserDashboardActiveItem,
  setShowPriceGlobal,
  setShowMenuCategory,
  setShowMenu,
} = globalSlice.actions;
export default globalSlice.reducer;
