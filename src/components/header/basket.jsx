"use client";
import Link from "next/link";
import { useSelector } from "react-redux";

const Basket = () => {
  const orderProducts =
    useSelector((store) => store.orderSlice.orderProducts) || [];
  return (
    <Link href={"/orders"} className="relative cursor-pointer">
      <svg className="w-10 h-10 text-gray-600 hover:text-zinc-700 transition-all duration-300 ease-in-out">
        <use href="/sprite.svg#shopp_icon" />
      </svg>
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
