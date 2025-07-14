import Image from "next/image";
import React, { useState } from "react";
import { FaBox, FaMoneyCheck, FaShoppingCart } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSearchedCategory } from "@/features/filterSlice";
import { formatNumberToPersian } from "@/utiles/utils-func";
import OrderAddToCart from "../order-add-to-cart";
import { MdPriceCheck } from "react-icons/md";
import { HiCurrencyDollar } from "react-icons/hi";
import { PiCurrencyCircleDollar, PiCurrencyDollar } from "react-icons/pi";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";
import { CgDollar } from "react-icons/cg";

const YourOrdersItem = ({ order }) => {
  const [count, setCount] = useState(order?.quantity);
  const [deleted, setDeleted] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  if (deleted) return <></>;
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
            className="object-fill rounded-[8px]"
          />
        </div>
        <div className="flex flex-col gap-2 px-4">
          <h1 className="text-sm font-bold line-clamp-1 text-gray-900">
            {order?.title}
          </h1>
          <div className="flex justify-start items-center gap-1  ">
            <FaShoppingCart className={`w-3.5 h-3.5 text-gray-500 `} />

            <span className="text-sm text-gray-500">
              {order?.quantity} {order?.unit}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <CgDollar className="w-4 h-4 text-gray-500" />
            <div className=" text-sm flex gap-1 items-center">
              <span className="text-blue-600">
                {formatNumberToPersian(count * order?.price)}
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
