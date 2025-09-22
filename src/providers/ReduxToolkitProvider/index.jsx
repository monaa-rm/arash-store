"use client";

import store from "@/store";
import { useRef } from "react";
import { Provider } from "react-redux";

const ReduxToolkitProvider = ({ children, show_price }) => {
  const initialGlobals = {
    productBrrifItem: null,
    showProductBrif: false,
    menuActiveItem: null,
    dashboardActiveItem: { title: "داشبورد ادمین", link: "mainmanager" },
    dashboardUserActiveItem: { title: "داشبورد", link: "mainmanager" },
    showLoginBox: false,
    showPriceGlobal: show_price,

    showMenu: false,
    showMenuCategory: false,
    favorites: [],
  };
  const storeRef = useRef(store({ globalSlice: initialGlobals }));
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxToolkitProvider;
