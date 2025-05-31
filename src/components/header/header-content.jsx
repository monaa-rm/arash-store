"use client";
import { setMenuActiveItem } from "@/features/globalSlice";
import { setActive } from "@/features/productSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HeaderContent = () => {
  const active =
    useSelector((store) => store.globalSlice.menuActiveItem);
  const path = usePathname();
  const dispatch = useDispatch();
  const activeHandler = (clickedItem) => {
    dispatch(setMenuActiveItem(clickedItem));
  };
  useEffect(() => {
    if (
      path.startsWith("/blogs") ||
      path.startsWith("/products") ||
      path == "/aboutus"
    ) {
console.log(path)
      dispatch(setMenuActiveItem(path));
    }
  }, [path]);
  return (
    <div className="flex justify-start items-center gap-4 lg:gap-3 xl:gap-4 font-bold text-md ">
      <Link
        href={"/"}
        onClick={() => activeHandler("/")}
        className={` hover:border-blue-700  border-b border-opacity-0 hover:border-opacity-100 border-blue-700 ${
          active == "/" &&
          "text-blue-700 border-b border-blue-700 border-opacity-100"
        } transition-all duration-500 ease-in-out`}
      >
        خانه
      </Link>
      <Link
        onClick={() => activeHandler("/products")}
        href={"/products"}
        className={`hover:text-blue-700 border-b border-opacity-0 hover:border-opacity-100 border-blue-700  ${
          active == "/products" &&
          "text-blue-700 border-b border-blue-700 border-opacity-100"
        } transition-all duration-500 ease-in-out`}
      >
        محصولات
      </Link>
      <Link
        onClick={() => activeHandler("/blogs")}
        href={"/blogs"}
        className={`hover:text-blue-700 border-b border-opacity-0 hover:border-opacity-100 border-blue-700  ${
          active == "/blogs" &&
          "text-blue-700 border-b border-blue-700 border-opacity-100"
        } transition-all duration-500 ease-in-out`}
      >
        وبلاگ
      </Link>
      <div
        // href={"/aboutus"}
        className="hover:text-blue-700 border-b border-opacity-0 hover:border-opacity-100 border-blue-700  cursor-pointer transition-all duration-500 ease-in-out"
      >
        دسته بندی ها
      </div>
      <Link
        onClick={() => activeHandler("/aboutus")}
        href={"/aboutus"}
        className={`hover:text-blue-700 border-b border-opacity-0 hover:border-opacity-100 border-blue-700  ${
          active == "/aboutus" &&
          "text-blue-700 border-b border-blue-700 border-opacity-100"
        } transition-all duration-500 ease-in-out`}
      >
        درباره ما
      </Link>
    </div>
  );
};

export default HeaderContent;
