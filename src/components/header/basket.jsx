"use client";
import Link from "next/link";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useSelector } from "react-redux";

const Basket = () => {
  const orderProducts =
    useSelector((store) => store.orderSlice.orderProducts) || [];
  return (
    <Link href={"/orders"} className="relative cursor-pointer">
      <CiShoppingCart className="w-10 h-10" />
      {orderProducts?.length ? (
        <div className="absolute top-0 right-0 px-1 rounded-[5px] bg-blue-700 text-white text-xs flex justify-center items-center">
          {orderProducts?.length}
        </div>
      ) : (
        <></>
      )}
    </Link>
  );
};

export default Basket;
