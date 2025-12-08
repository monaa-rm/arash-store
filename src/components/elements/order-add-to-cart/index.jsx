"use client";
import { setOrderProducts } from "@/features/orderSlice";
import { getFromLocalStorage } from "@/utiles/utils-func";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const OrderAddToCart = ({
  count,
  setCount,
  productCount,
  prodId,
  setDeleted,
}) => {
  const dispatch = useDispatch();

  const countHandler = (value) => {
    let orders = getFromLocalStorage("orders");

    // پیدا کردن اندیس سفارش مورد نظر
    const orderIndex = orders.findIndex((order) => order.id === prodId);

    if (orderIndex !== -1) {
      // سفارش با این ID پیدا شد
      if (value > 0) {
        // به‌روزرسانی تعداد
        orders[orderIndex].quantity = value;
      } else {
        // حذف سفارش اگر تعداد صفر یا کمتر بود
        orders.splice(orderIndex, 1);
        setDeleted(true);
      }

      // ذخیره تغییرات در Local Storage
      try {
        localStorage.setItem("orders", JSON.stringify(orders));
        dispatch(setOrderProducts(orders));
        console.log("Orders updated successfully!");
      } catch (error) {
        console.error("Error setting orders in localStorage:", error);
      }
    } else {
      try {
        const sendOrder = {
          id: prodId,
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
  };
  const handleIncrement = async () => {
    if (count < productCount) {
      setCount(count + 1);
      try {
        const res = await fetch(`/api/order/getInStock`, {
          method: "POST",
          body: JSON.stringify({ id: prodId, quantity: count + 1 }),
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.data == "yes") {
            countHandler(count + 1);
          } else {
            setCount(count);
          }
        }
      } catch (error) {
        setCount(count);
      }
    }
  };

  const handleDecrement = async () => {
    if (count > 0) {
      setCount(count - 1);
      try {
        const res = await fetch(`/api/order/getInStock`, {
          method: "POST",
          body: JSON.stringify({ id: prodId, quantity: count - 1 }),
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.data == "yes") {
            countHandler(count - 1);
          } else {
            setCount(count);
          }
        }
      } catch (error) {
        setCount(count);
      }
    }
  };

  return (
    <div
      className={`w-fit    md:bg-transparent md:border-none
      z-[4] 
     justify-between md:justify-center   items-center gap-1 h-10 `}
    >
      <div className=" w-full flex-col justify-center items-center gap-3">
        <div className=" rounded-[6px] overflow-hidden h-10 bg-zinc-200 flex justify-between items-center ">
          <button
            disabled={productCount == 0}
            className="h-full p-2 hover:bg-blue-600 hover:text-zinc-200 active:bg-blue-800 transition-all duration-300 ease-in-out"
            onClick={handleDecrement}
          >
            {/* <FiMinus /> */}
            <svg className="w-3 h-3 text-inherit">
              <use href="/sprite.svg#minus_icon" />
            </svg>
          </button>
          <input
            type="number"
            value={count}
            onChange={(e) => {
              if (e.target.value < productCount + 1 && e.target.value > 1) {
                setCount(+e.target.value);
                countHandler(+e.target.value);
              }
            }}
            className="w-20 text-center outline-none bg-zinc-200 "
          />

          <button
            disabled={productCount == 0}
            className="h-full p-2 hover:bg-blue-600 hover:text-zinc-200 active:bg-blue-800 transition-all duration-300 ease-in-out"
            onClick={handleIncrement}
          >
            {/* <FiPlus /> */}
            <svg className="w-3 h-3 text-inherit">
              <use href="/sprite.svg#plus_icon" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderAddToCart;
