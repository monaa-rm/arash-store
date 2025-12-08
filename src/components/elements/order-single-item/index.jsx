import Image from "next/image";
import React from "react";
import { formatNumberToPersian, slugify } from "@/utiles/utils-func";

import Link from "next/link";

const OrderSingleItem = ({ order }) => {
  const prdslug = slugify(order?.title);
  return (
    <div
      className={`border-b p-2 flex flex-col  items-center  gap-2 text-gray-500 w-full `}
    >
      <div className="w-full  flex">
        <div className="w-20 h-20 rounded-[8px] relative">
          <Image
            src={order?.imageSrc[0]?.file}
            alt={order.title}
            fill
            sizes="50px"
            className="object-fill rounded-[8px]"
          />
        </div>
        <div className="flex flex-col gap-2 px-4">
          <Link
            href={`/products/${order.id}/${prdslug}`}
            className="text-sm font-bold line-clamp-1  text-gray-900"
          >
            {order?.title}
          </Link>
          <div className="flex gap-1">
              <svg
                className={`w-4 h-4 text-gray-400 `}
              >
                <use href="/sprite.svg#shopp_icon" />
              </svg>
            <div className="flex gap-1">
              <div className=" flex gap-1  text-sm ">
                <span className="">{order.quantity}</span> {order.unit}
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center text-sm gap-1">
            <svg
                className={`w-4 h-4 text-gray-400 `}
              >
                <use href="/sprite.svg#dollar_icon" />
              </svg>
            <span className="">{formatNumberToPersian(order?.price)}</span>{" "}
            تومان
          </div>
        </div>
      </div>
      <div className="flex justify-start gap-2 w-full text-xs text-gray-400">
        <span>دسته بندی:</span>
        <div className="flex gap-1">
          {order?.category?.map((cat, i) => (
            <Link
              href={`/category/${cat?.link}`}
              key={cat._id}
              className=" flex gap-1"
            >
              <span className="cursor-pointer  hover:text-blue-600 transition-all duration-300 ease-in-out">
                {cat.name}
              </span>
              <span>{i !== order?.category?.length - 1 ? "-" : ""}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSingleItem;
