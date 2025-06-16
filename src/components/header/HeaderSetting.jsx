"use client";

import { setShowPriceGlobal } from "@/features/globalSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HeaderSetting = () => {
  const showPriceGlobal = useSelector(
    (store) => store.globalSlice.showPriceGlobal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchSetting() {
      try {
          const res = await fetch("/api/global");
        const data = await res.json();
        if (res.ok) {
            dispatch(setShowPriceGlobal(data?.data?.showPrice));
        }
        console.log("bing",showPriceGlobal , data?.data?.showPrice)
      } catch (error) {
        console.log(error);
      }
    }
    fetchSetting();
  }, [showPriceGlobal]);
  return null;
};

export default HeaderSetting;
