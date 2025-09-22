"use client";

import { setShowPriceGlobal } from "@/features/globalSlice";
import { setOrderProducts } from "@/features/orderSlice";
import store from "@/store";
import { getFromLocalStorage } from "@/utiles/utils-func";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const NextAuthProvider = ({ children, show_price }) => {

  return <SessionProvider>{children}</SessionProvider>; 
};
