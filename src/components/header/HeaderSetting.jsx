"use client";

import { setOrderProducts } from "@/features/orderSlice";
import { getFromLocalStorage } from "@/utiles/utils-func";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const HeaderSetting = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchSetting() {
      try {

        const orders = getFromLocalStorage("orders");
        if (orders) dispatch(setOrderProducts(orders));
      } catch (error) {
        console.log(error);
      }
    }
    fetchSetting();
  }, [dispatch]);

  return <></>;
};

export default HeaderSetting;
