"use client";
import { formatNumberToPersian } from "@/utiles/utils-func";
import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

const ProductAddToCart = ({ productCount, unit, price }) => {
  const [count, setCount] = useState(1);

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
      <div className=" flex justify-center items-center gap-3">
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
            className="w-8  text-center outline-none bg-zinc-200 "
          />

          <button
            className="h-full p-2 hover:bg-blue-600 transition-all duration-300 ease-in-out"
            onClick={handleIncrement}
          >
            <FiPlus />
          </button>
        </div>
        <button
         disabled={productCount == 0}
          type="button"
          className=" rounded-md overflow-hidden text-white font-bold px-3 h-10 bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out flex justify-between items-center "
        >
          افزودن به سبد خرید
        </button>
      </div>
      {/* {productCount == 0 ? (
        <span className="text-xs text-rose-600 hidden md:flex">در انبار موجود نیست</span>
      ) : (
        <span className="text-xs text-blue-600 hidden md:flex">
          {productCount} {unit} موجود در انبار
        </span>
      )} */}
      <span className="text-blue-600 md:hidden font-bold text-sm">{price != 0 ? `${formatNumberToPersian(price)} تومان` : `تماس بگیرید`}</span>
    </div>
  );
};

export default ProductAddToCart;
