"use client";

import { useDispatch } from "react-redux";
import AllProducts from "../all-products";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { setDashboardActiveItem } from "@/features/globalSlice";

const EditProductPage = () => {
  const path = usePathname();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setDashboardActiveItem({ title: "محصولات", link: "edit-product" })
    );
    console.log("new product changed");
  }, [path]);
  return (
    <div>
      <AllProducts />
    </div>
  );
};

export default EditProductPage;
