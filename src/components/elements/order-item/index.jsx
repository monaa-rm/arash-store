import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaBox } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSearchedCategory } from "@/features/filterSlice";
import { formatNumberToPersian, slugify } from "@/utiles/utils-func";
import OrderAddToCart from "../order-add-to-cart";
import Link from "next/link";

const OrderItem = ({ order, cost, setCost, draftOrders }) => {
  const [count, setCount] = useState(order?.quantity);
  const [deleted, setDeleted] = useState(false);
  const [itemCost, setItemCost] = useState(0);
  const prdslug = slugify(order?.title);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (count > -1 && !deleted && draftOrders) {
      setItemCost(count * order?.price);
      if (itemCost) {
        const result = cost - itemCost;
        const newItemCost = count * order?.price;
        setCost(result + newItemCost);
      }
    }
  }, [count, deleted]);
  if (deleted) return <></>;
  return (
    <div
      className={`border rounded-[8px] p-2 flex flex-col md:flex-row items-center  gap-2 text-gray-500 w-full `}
    >
      <div className="w-full md:w-3/5 flex">
        <div className="w-20 h-20 rounded-[8px] relative">
          <Image
            src={order?.image}
            alt={order?.title}
            fill
            className="object-fill rounded-[8px]"
          />
        </div>
        <div className="flex flex-col gap-2 px-4">
          <Link
            href={`/products/${order?._id}/${prdslug}`}
            className="text-sm font-bold line-clamp-1 text-gray-900"
          >
            {order?.title}
          </Link>
          <div className="flex gap-2">
            <TbCategoryFilled className="w-4 h-4" />
            <div className="flex gap-1">
              {order?.category?.map((cat, i) => (
                <Link
                  href={`/category/${cat?.link}`}
                  key={cat._id}
                  className=" flex gap-1  text-sm text-zinc-400"

                >
                  <span className="cursor-pointer  hover:text-blue-600 transition-all duration-300 ease-in-out">
                    {cat.name}
                  </span>
                  <span>{i !== order?.category?.length - 1 ? "-" : ""}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex justify-start items-center gap-3">
            <FaBox
              className={`w-3 h-3 ${
                order?.instock == 0 ? "text-rose-600" : "text-blue-600"
              } `}
            />
            {order?.instock == 0 ? (
              <span className="text-xs ">در انبار موجود نیست</span>
            ) : (
              <span className="text-xs ">
                {order?.instock} {order?.unit} موجود در انبار
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/5 flex  items-center md:flex-row-reverse gap-4  h-10">
        <OrderAddToCart
          productCount={order?.instock}
          count={count}
          setCount={setCount}
          prodId={order?._id}
          cost={cost}
          setCost={setCost}
          setDeleted={setDeleted}
        />
        <div className="w-1/2 text-end text-sm flex gap-1 justify-end">
          <span className="text-gray-900">
            {formatNumberToPersian(count * order?.price)}
          </span>
          <span className="">تومان</span>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
