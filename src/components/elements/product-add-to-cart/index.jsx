"use client";
import { setOrderProducts } from "@/features/orderSlice";
import {
  formatNumberToPersian,
  getFromLocalStorage,
} from "@/utiles/utils-func";
import React, { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";

const ProductAddToCart = ({ productCount, id, price }) => {
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState("");
  const [reload, setReload] = useState(-1);
  const dispatch = useDispatch();
  useEffect(() => {
    let orders = getFromLocalStorage("orders");
    const orderedProduct = orders?.find((product) => product?.id == id);
    if (orderedProduct?.id) {
      setCount(Number(orderedProduct?.quantity));
      setMsg(`${orderedProduct?.quantity}`);
    } else {
      setMsg("");
    }
  }, [reload]);

  const addToCartHandler = (value ) => {
    let orders = getFromLocalStorage("orders");

    // پیدا کردن اندیس سفارش مورد نظر
    const orderIndex = orders.findIndex((order) => order.id === id);

    if (orderIndex !== -1) {
      console.log("orderIndex !== -1")
      // سفارش با این ID پیدا شد
      if (value > 0 ) {
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
        console.log("Orders updated successfully!");
      } catch (error) {
        console.error("Error setting orders in localStorage:", error);
      }
    } else {
      try {
        console.log("orderIndex !== -1 else")
        const sendOrder = {
          id: id,
          quantity: value,
        };
        if(value !== 0){
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
    <div className="w-full fixed add_to_cart_button md:static flex md:flex-col bg-white md:bg-transparent md:border-none md:shadow-none border-t shadow-lg z-[4]  justify-between md:justify-center px-2 sm:px-8 md:px-0  items-center gap-1 h-16 md:pt-8">
      <div className=" flex justify-center items-center gap-3">
        <div className={` rounded-[7px] overflow-hidden h-10 ${msg?.length ? "bg-blue-200": "bg-zinc-200 "} flex justify-between items-center `}>
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
            className={`w-8  text-center outline-none ${msg?.length ? "bg-blue-200": "bg-zinc-200 "}  `}
          />

          <button
             disabled={productCount == 0}
            className="h-full p-2 hover:bg-blue-600 hover:text-zinc-200 active:bg-blue-800  transition-all duration-300 ease-in-out"
            onClick={handleIncrement}
          >
            <FiPlus />
          </button>
        </div>
        {/* <button
          onClick={() => addToCartHandler()}
          disabled={productCount == 0}
          type="button"
          className=" rounded-[7px] overflow-hidden text-white font-bold px-3 h-10 bg-blue-600  active:bg-blue-800  hover:bg-blue-700 transition-all duration-300 ease-in-out flex justify-between items-center "
        >
       {count !== 0 && !msg.length ? "ویرایش در سبد خرید" : "   افزودن به سبد خرید"}
        </button> */}
        {/* <div
        className={`${
          msg?.length ? "bg-orange-500" : "bg-none"
        } rounded-[4px]  text-sm  flex justify-center items-center w-8 h-8 text-white`}
      >
        {msg}
      </div> */}
      </div>
     
      <span className="text-blue-600 md:hidden font-bold text-sm">
        {price != 0 ? `${formatNumberToPersian(price)} تومان` : `تماس بگیرید`}
      </span>
    </div>
  );
};

export default ProductAddToCart;
