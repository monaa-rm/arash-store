"use client";

import { setShowPriceGlobal } from "@/features/globalSlice";
import { setOrderProducts } from "@/features/orderSlice";
import { getFromLocalStorage } from "@/utiles/utils-func";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const HeaderSetting = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchSetting() {
      try {
          const res = await fetch("/api/global");
        const data = await res.json();
        if (res.ok) {
            dispatch(setShowPriceGlobal(data?.data?.showPrice));
        }
        const orders = getFromLocalStorage("orders");
        dispatch(setOrderProducts(orders))
      } catch (error) {
        console.log(error);
      }
    }
    fetchSetting();
  }, []);
  return <></>;
};

export default HeaderSetting;
