import Image from "next/image";
import React, { useState } from "react";
import { formatNumberToPersian } from "@/utiles/utils-func";


const YourOrdersItem = ({ order }) => {

  return (
    <div
      className={`border rounded-[8px] p-2 flex flex-col md:flex-row items-center  gap-2 text-gray-500 w-full `}
    >
      <div className="w-full flex">
        <div className="w-20 h-20 rounded-[8px] relative">
          <Image
            src={order.image}
            alt={order.title}
            fill
            sizes="50px"
            className="object-fill rounded-[8px]"
          />
        </div>
        <div className="flex flex-col gap-2 px-4">
          <h1 className="text-sm font-bold line-clamp-1 text-gray-900">
            {order?.title}
          </h1>
          <div className="flex justify-start items-center gap-1  ">
            <svg className={`w-5 h-5 text-gray-500 `}>
              <use href="/sprite.svg#shopp_icon" />
            </svg>

            <span className="text-sm text-gray-500">
              {order?.quantity} {order?.unit}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <svg className={`w-5 h-5 text-gray-500 `}>
              <use href="/sprite.svg#dollar_icon" />
            </svg>
            <div className=" text-sm flex gap-1 items-center">
              <span className="text-blue-600">
                {formatNumberToPersian(order?.quantity * order?.price)}
              </span>
              <span className="text-blue-600">تومان</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourOrdersItem;
