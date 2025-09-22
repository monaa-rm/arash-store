"use client";

import { setShowPriceGlobal } from "@/features/globalSlice";
import { setOrderProducts } from "@/features/orderSlice";
import { getFromLocalStorage } from "@/utiles/utils-func";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const HeaderSetting = () => {
  const dispatch = useDispatch();
  // const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    async function fetchSetting() {
      // setIsClient(true);
      try {
        // const res = await fetch("/api/global");
        // const data = await res.json();
        // if (res.ok) {
        // dispatch(setShowPriceGlobal(show_price));
        // }
        const orders = getFromLocalStorage("orders");
        if (orders) dispatch(setOrderProducts(orders));
      } catch (error) {
        console.log(error);
      }
    }
    fetchSetting();
  }, [dispatch]);
  // if (!isClient) {
  //   return null; // یا یه Placeholder رندر کن
  // }
  return <></>;
};

export default HeaderSetting;
