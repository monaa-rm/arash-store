"use client";
import Image from "next/image";
import Link from "next/link";
import { LuBoxes, LuShoppingCart } from "react-icons/lu";
import { FaArrowRightLong, FaCartShopping } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import { formatNumberToPersian } from "@/utiles/utils-func";
import { useEffect, useState } from "react";
import { FaArrowRight, FaEdit } from "react-icons/fa";
import ProductAddToCart from "@/components/elements/product-add-to-cart";
import SearchItemAddToCart from "@/components/elements/search-item-add-to-cart";
import { RiDeleteBin5Fill } from "react-icons/ri";

const DashboardProductItem = ({ item }) => {


  return (
    <div
      id={`dashboardProductItem${item?.id}`}
      className="group relative w-full h-72 flex justify-center items-center  [perspective:1000px]"
    >
      <div
        className={`absolute flex justify-center items-center duration-1000 w-full h-full [transform-style:preserve-3d] `}
      >
        {/* main section */}
        <div className=" absolute w-full overflow-hidden max-w-[260px] border rounded-2xl hover:shadow-md transition-all duration-500 h-72 ">
          <div className="w-full h-44 relative">
            <Image
              src={`/images/sample/${item?.id}.jpg`}
              fill
              className="object-fill"
              alt={"/images/sample/11.jpg"}
            />
            <div className="absolute left-0 bottom-0 bg-gradient-to-r from-white to-transparent min-w-20 px-2 text-left rounded-r-full text-gray-700 font-bold text-sm ">{item?.productId}</div>
          </div>
          <div className="w-full flex flex-col gap-1 p-2">
            <Link
              href={`/dashboard/admin/edit-product/${item.id}`}
              className=" cursor-pointer font-bold text-sm line-clamp-1 "
            >
              {item?.title}
            </Link>
            <div className="flex justify-start items-center gap-1 pt-3">
              <LuBoxes
                className={`w-4 h-4 ${
                  item?.inStock == 0 ? "text-rose-600" : "text-blue-400"
                } `}
              />
              {item?.inStock == 0 ? (
                <span className="text-xs text-rose-600">ناموجود</span>
              ) : (
                <span className="text-xs text-zinc-500">
                  {item?.inStock} در انبار
                </span>
              )}
            </div>
            <div className="flex justify-between items-center gap-2  pt-2">
              <div className="h-8 gap-2 flex justify-center items-center">
                <Link  href={`/dashboard/admin/edit-product/${item.id}`}
                  className="w-7 h-7 group flex justify-center items-center rounded-lg bg-orange-700 hover:bg-orange-800 hover:w-8 hover:h-8 cursor-pointer  transition-all duration-300 ease-in-out "
                >
                  <FaEdit
                    className={`w-5 h-5  transition-all duration-300 ease-in-out text-white`}
                  />
                </Link>
                <div
                  className="w-7 h-7 group flex justify-center items-center rounded-lg bg-rose-700 hover:bg-rose-800 hover:w-8 hover:h-8 cursor-pointer  transition-all duration-300 ease-in-out "
                >
                  <RiDeleteBin5Fill
                    className={`w-5 h-5 transition-all duration-300 ease-in-out text-white`}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center gap-1">
                <span className="font-bold text-sm">
                  {formatNumberToPersian(item?.price)}
                </span>
                <span className="text-zinc-500 text-xs">تومان</span>
              </div>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  );
};

export default DashboardProductItem;
