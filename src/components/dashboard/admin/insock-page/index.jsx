"use client";

import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import AllSocks from "../all-socks";
import { setDashboardActiveItem } from "@/features/globalSlice";

const InsockPage = () => {
  const path = usePathname();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setDashboardActiveItem({title: "مدیریت موجودی و قیمت ها", link: "price-inStock" })
    );
  }, [path]);
  return <div className="w-full ">
    <AllSocks />
  </div>;
};

export default InsockPage;
