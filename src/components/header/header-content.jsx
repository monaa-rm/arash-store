"use client";
import {
  setMenuActiveItem,
  setShowMenu,
  setShowMenuCategory,
} from "@/features/globalSlice";
import { setActive } from "@/features/productSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { BiSolidInfoSquare } from "react-icons/bi";
import { BsInfoSquareFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { RiBloggerFill } from "react-icons/ri";
import { TbLayoutListFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

const HeaderContent = () => {
  const active = useSelector((store) => store.globalSlice.menuActiveItem);
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
          "text-blue-700 border-b border-blue-700 border-opacity-100"
        } transition-all duration-500 ease-in-out`}
      >
        <FaHome className="lg:hidden w-5 h-5 " />
        خانه
      </Link>
      <Link
        onClick={() => {
          activeHandler("/search");
          dispatch(setShowMenu(false));
          dispatch(setShowMenuCategory(false));
        }}
        href={"/search"}
        className={`hover:text-blue-700  flex justify-start gap-2 lg:justify-center items-center border-b border-opacity-0 hover:border-opacity-100 border-blue-700  ${
          active == "/search" &&
          "text-blue-700 border-b border-blue-700 border-opacity-100"
        } transition-all duration-500 ease-in-out`}
      >
        <AiFillProduct className="lg:hidden w-5 h-5 " />
        محصولات
      </Link>
      <Link
        onClick={() => {
          activeHandler("/blogs");
          dispatch(setShowMenu(false));
          dispatch(setShowMenuCategory(false));
        }}
        href={"/blogs"}
        className={`hover:text-blue-700  flex justify-start gap-2 lg:justify-center items-center border-b border-opacity-0 hover:border-opacity-100 border-blue-700  ${
          active == "/blogs" &&
          "text-blue-700 border-b border-blue-700 border-opacity-100"
        } transition-all duration-500 ease-in-out`}
      >
        <RiBloggerFill className="lg:hidden w-5 h-5 " />
        وبلاگ
      </Link>
      <div
        onClick={() => {
          dispatch(setShowMenuCategory(true));
        }}
        className=" hover:text-blue-700  flex justify-start gap-2 lg:justify-center items-center border-b border-opacity-0 hover:border-opacity-100 border-blue-700  cursor-pointer transition-all duration-500 ease-in-out"
      >
        <TbLayoutListFilled className="lg:hidden w-5 h-5 " />
        دسته بندی ها
      </div>
      <Link
        onClick={() => {
          activeHandler("/aboutus");
          dispatch(setShowMenu(false));
          dispatch(setShowMenuCategory(false));
        }}
        href={"/aboutus"}
        className={`hover:text-blue-700  flex justify-start gap-2 lg:justify-center items-center border-b border-opacity-0 hover:border-opacity-100 border-blue-700  ${
          active == "/aboutus" &&
          "text-blue-700 border-b border-blue-700 border-opacity-100"
        } transition-all duration-500 ease-in-out`}
      >
        <BiSolidInfoSquare className="lg:hidden w-5 h-5 " />
        درباره ما
      </Link>
    </div>
  );
};

export default HeaderContent;
