"use client";
import { setOrderProducts } from "@/features/orderSlice";
import { formatNumberToPersian, getFromLocalStorage } from "@/utiles/utils-func";
import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const SearchItemAddToCart = ({ count, setCount, price, productCount  , prdId ,msg , setReload , reload} ) => {
  const showPriceGlobal = useSelector(
    (store) => store.globalSlice.showPriceGlobal
  );
  const dispatch = useDispatch()
  const addToCartHandler = (value) => {
    let orders = getFromLocalStorage("orders");

    // پیدا کردن اندیس سفارش مورد نظر
    const orderIndex = orders.findIndex((order) => order.id === prdId);

    if (orderIndex !== -1) {
      // سفارش با این ID پیدا شد
      if (value > 0) {
        // به‌روزرسانی تعداد
        orders[orderIndex].quantity = value;
      } else {
        // حذف سفارش اگر تعداد صفر یا کمتر بود
        orders.splice(orderIndex, 1);
      }

      // ذخیره تغییرات در Local Storage
      try {
        localStorage.setItem("orders", JSON.stringify(orders));
        dispatch(setOrderProducts(orders));
      } catch (error) {
        console.error("Error setting orders in localStorage:", error);
      }
    } else {
      try {
        const sendOrder = {
          id: prdId,
          quantity: value,
        };
        if (value !== 0) {
          orders.push(sendOrder);
          localStorage.setItem("orders", JSON.stringify(orders));
          dispatch(setOrderProducts(orders));
        }
      } catch (error) {
        console.error("Error setting orders in localStorage:", error);
      }
    }
    setReload(reload * -1);
    // }
  };
  const handleIncrement = () => {
    if (count < productCount) {
      setCount(count + 1);
      addToCartHandler(count + 1)
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
      addToCartHandler(count - 1)
    }
  };

  return (
    <div
      className={`w-full add_to_cart_button md:static flex-col   md:bg-transparent  md:border-none
      z-[4] 
     justify-between md:justify-center px-2 sm:px-8 md:px-0  items-center gap-1 h-16 md:pt-8`}
    >
      <div className=" w-full flex-col justify-center items-center gap-3">
        <div className={` rounded-[6px] overflow-hidden h-10 ${msg?.length ? "bg-blue-200": "bg-zinc-200 "}  flex justify-between items-center `}>
          <button
             disabled={productCount == 0}
            className="h-full p-2 hover:bg-blue-600 hover:text-zinc-200 active:bg-blue-800  transition-all duration-300 ease-in-out"
            onClick={handleDecrement}
          >
            <FiMinus />
          </button>
          <input
            type="number"
            value={count}
            onChange={(e) => {
              if (e.target.value < productCount + 1 && e.target.value > 1) {
                setCount(+e.target.value);
              }
            }}
            className={`w-20 text-center outline-none ${msg?.length ? "bg-blue-200": "bg-zinc-200 "}  `}
          />

          <button
             disabled={productCount == 0}
            className="h-full p-2 hover:bg-blue-600 hover:text-zinc-200 active:bg-blue-800  transition-all duration-300 ease-in-out"
            onClick={handleIncrement}
          >
            <FiPlus />
          </button>
        </div>
      </div>

      <span className="text-blue-600 md:hidden font-bold text-sm w-full text-center">
        {showPriceGlobal
          ? `${formatNumberToPersian(price.howMuch)} تومان`
          : "تماس بگیرید"}
      </span>
    </div>
  );
};

export default SearchItemAddToCart;
