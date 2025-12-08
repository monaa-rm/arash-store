"use client";
import {
  setMenuActiveItem,
  setShowMenu,
  setShowMenuCategory,
} from "@/features/globalSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const HeaderContent = () => {
  const active = useSelector((store) => store.globalSlice.menuActiveItem);
  const showMenuCategory = useSelector(
    (store) => store.globalSlice.showMenuCategory
  );
  const path = usePathname();
  const dispatch = useDispatch();
  const activeHandler = (clickedItem) => {
    dispatch(setMenuActiveItem(clickedItem));
  };
  useEffect(() => {
    if (
      path.startsWith("/blogs") ||
      path.startsWith("/search") ||
      path == "/aboutus"
    ) {
      console.log(path);
      dispatch(setMenuActiveItem(path));
      dispatch(setShowMenuCategory(false));
    }
  }, [path]);
  return (
    <div className="flex flex-col text-gray-700 lg:flex-row justify-start items-start lg:items-center gap-4 lg:gap-3 xl:gap-4 lg:font-bold text-md ">
      <Link
        href={"/"}
        onClick={() => {
          activeHandler("/");
          dispatch(setShowMenu(false));
          dispatch(setShowMenuCategory(false));
        }}
        className={` hover:text-blue-700 group flex justify-start gap-2 lg:justify-center items-center border-b border-opacity-0 hover:border-opacity-100 border-blue-700 ${
          active == "/" &&
          !showMenuCategory &&
          "text-blue-700 border-b border-blue-700 border-opacity-100"
        } transition-all duration-500 ease-in-out`}
      >
        <svg className="lg:hidden w-5 h-4 text-inherit ">
          <use href="/sprite.svg#home_icon" />
        </svg>
        خانه
      </Link>
      <Link
        onClick={() => {
          activeHandler("/products");
          dispatch(setShowMenu(false));
          dispatch(setShowMenuCategory(false));
        }}
        href={"/products"}
        className={`hover:text-blue-700 group flex justify-start gap-2 lg:justify-center items-center border-b border-opacity-0 hover:border-opacity-100 border-blue-700  ${
          active == "/products" &&
          !showMenuCategory &&
          "text-blue-700 border-b border-blue-700 border-opacity-100"
        } transition-all duration-500 ease-in-out`}
      >

        <svg className="lg:hidden w-5 h-4 text-inherit ">
          <use href="/sprite.svg#products_icon" />
        </svg>
        محصولات
      </Link>
      <Link
        onClick={() => {
          activeHandler("/blogs");
          dispatch(setShowMenu(false));
          dispatch(setShowMenuCategory(false));
        }}
        href={"/blogs"}
        className={`hover:text-blue-700 group flex justify-start gap-2 lg:justify-center items-center border-b border-opacity-0 hover:border-opacity-100 border-blue-700  ${
          active == "/blogs" &&
          !showMenuCategory &&
          "text-blue-700 border-b border-blue-700 border-opacity-100"
        } transition-all duration-500 ease-in-out`}
      >
        <svg className="lg:hidden  w-5 h-4 text-inherit ">
          <use href="/sprite.svg#blog_icon" />
        </svg>
        وبلاگ
      </Link>
      <div
        onClick={() => {
          dispatch(setShowMenuCategory(true));
        }}
        className={` hover:text-blue-700 flex group justify-start gap-2 lg:justify-center items-center border-b
           border-opacity-0 hover:border-opacity-100 border-blue-700  cursor-pointer transition-all duration-500
            ease-in-out ${
              (showMenuCategory || active == "/category") &&
              "text-blue-700 border-b border-blue-700 border-opacity-100"
            }`}
      >
        <svg className="lg:hidden w-5 h-4 text-inherit ">
          <use href="/sprite.svg#categories_icon" />
        </svg>
        دسته بندی ها
      </div>
      <Link
        onClick={() => {
          activeHandler("/aboutus");
          dispatch(setShowMenu(false));
          dispatch(setShowMenuCategory(false));
        }}
        href={"/about-us"}
        className={`hover:text-blue-700  flex group justify-start gap-2 lg:justify-center items-center border-b border-opacity-0 hover:border-opacity-100 border-blue-700  ${
          active == "/aboutus" &&
          !showMenuCategory &&
          "text-blue-700 border-b border-blue-700 border-opacity-100"
        } transition-all duration-500 ease-in-out`}
      >
        <svg className="lg:hidden w-5 h-4 text-inherit ">
          <use href="/sprite.svg#menu_info_icon" />
        </svg>
        درباره ما
      </Link>
    </div>
  );
};

export default HeaderContent;
