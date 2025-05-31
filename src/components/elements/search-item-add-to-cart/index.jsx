"use client";
import { formatNumberToPersian } from "@/utiles/utils-func";
import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

const SearchItemAddToCart = ({  count , setCount, price }) => {

  const handleIncrement = () => {
    if (count < 1000) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="w-full fixed add_to_cart_button md:static flex md:flex-col bg-white md:bg-transparent md:border-none md:shadow-none border-t shadow-lg z-[4]  justify-between md:justify-center px-2 sm:px-8 md:px-0  items-center gap-1 h-16 md:pt-8">
      <div className=" w-full flex justify-center items-center gap-3">
        <div className=" rounded-md overflow-hidden h-10 bg-zinc-200 flex justify-between items-center ">
          <button
            className="h-full p-2 hover:bg-blue-600 transition-all duration-300 ease-in-out"
            onClick={handleDecrement}
          >
            <FiMinus />
          </button>
          <input
            type="number"
            value={count}
            onChange={(e) => {
              if (e.target.value < 1000 && e.target.value > 1) {
                setCount(+e.target.value);
              }
            }}
            className="w-20 text-center outline-none bg-zinc-200 "
          />

          <button
            className="h-full p-2 hover:bg-blue-600 transition-all duration-300 ease-in-out"
            onClick={handleIncrement}
          >
            <FiPlus />
          </button>
        </div>

      </div>
   
      <span className="text-blue-600 md:hidden font-bold text-sm">{price != 0 ? `${formatNumberToPersian(price)} تومان` : `تماس بگیرید`}</span>
    </div>
  );
};

export default SearchItemAddToCart;
