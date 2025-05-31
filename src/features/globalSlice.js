import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  productBrifItem: null,
  showProductBrif: false,
  menuActiveItem: null,
  dashboardActiveItem: { title: "داشبورد ادمین", link: "mainmanager" },
  dashboardUserActiveItem: { title: "داشبورد", link: "mainmanager" },
  showLoginBox : false
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
      state.sideSetting = action.payload;
    },
    setMenuActiveItem: (state, action) => {
      state.menuActiveItem = action.payload;
    },
    setDashboardActiveItem: (state, action) => {
      state.dashboardActiveItem = action.payload;
    },
    },
    setUserDashboardActiveItem: (state, action) => {
      state.dashboardUserActiveItem = action.payload;
    },
});

export const {
  setShowProductBrif,
  setProductBrifItem,
  setMenuActiveItem,
  setDashboardActiveItem,
  setShowLoginBox,
  setUserDashboardActiveItem,
} = globalSlice.actions;
export default globalSlice.reducer;
