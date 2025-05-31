import Link from "next/link";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";

const Basket = () => {
  return (
    <div className="relative cursor-pointer">
        <CiShoppingCart className="w-10 h-10" />
      <div className="absolute top-0 right-0 px-1 rounded-md bg-blue-700 text-white text-xs flex justify-center items-center">
        3
      </div>
    </div>
  );
};

export default Basket;
