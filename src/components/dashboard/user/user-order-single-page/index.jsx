"use client";

import OrderSingleItem from "@/components/elements/order-single-item";
import { setUserDashboardActiveItem } from "@/features/globalSlice";
import {
  formatNumberToPersian,
  orderStatusToPersian,
} from "@/utiles/utils-func";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";

const statusItems = [
  "pending",
  "shipped",
  "delivered",
  "cancelled",
  "returned",
  "failed",
];
const statusbg = {
  pending: "bg-yellow-100 text-yellow-800 bg-opacity-80",
  delivered: "bg-green-100 text-green-800 bg-opacity-80 ",
  shipped: "bg-cyan-100 text-cyan-800 bg-opacity-80",
  cancelled: "bg-gray-200 text-gray-800 bg-opacity-80",
  returned: "bg-orange-100 text-orange-800 bg-opacity-80",
  failed: "bg-red-100 text-red-800 bg-opacity-80",
};
const UserOrderSinglePage = ({ data }) => {
  const [showStatus, setShowStatus] = useState(false);
  const [stsItem, setStsItem] = useState(data?.status);
  const { data: session } = useSession();
  const dispatch = useDispatch()
  useEffect(() => {
 dispatch(setUserDashboardActiveItem({ title: "لیست سفارش ها", link: "order-list" }))
  }, []);

//   const statusHandler = async (sts) => {
//     try {
//       setStsItem(sts);
//       setShowStatus(false);
//       const res = await fetch(`/api/order/status`, {
//         method: "POST",
//         body: JSON.stringify({
//           status: sts,
//           user: session.user,
//           orderId: data?._id,
//         }),
//         headers: { "Content-Type": "application/json" },
//       });
//       if (!res.ok) {
//         setStsItem(stsItem);
//       }
//     } catch (error) {
//       setStsItem(stsItem);
//     }
//   };

  return (
    <div className="w-full flex flex-col gap-2 p-4 text-gray-600 text-sm 
    ">
      <div className={`w-full flex justify-center items-center gap-2 relative`}>
        <h3
          className="w-full  font-bold break-all "
        >
          {`${data?.name} ${data?.lastName}`}
        </h3>
      </div>
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-2 ">
        <div className="w-full flex  sm:justify-start items-center gap-8">
          <div className="flex gap-1 text-sm">
            <span className="">استان:</span>
            <span className="font-bold">{data?.province?.name}</span>
          </div>
          <div className="flex gap-1 text-sm">
            <span className="">شهر:</span>
            <span className="font-bold">{data?.city?.name}</span>
          </div>
          <div className=" gap-1 text-sm items-center hidden sm:flex">
            <span className="">قیمت کل:</span>
            <span className="font-bold">
              {formatNumberToPersian(data?.allCost)}{" "}
            </span>
            <span className="text-xs text-gray-500">تومان</span>
          </div>
        </div>
        <div className=" w-full sm:w-fit pt-2 sm:pt-0 relative flex justify-between sm:justify-end">
          <div className=" gap-1 text-sm items-center flex flex-nowrap sm:hidden">
            <span className="">قیمت کل:</span>
            <span className="font-bold">
              {formatNumberToPersian(data?.allCost)}{" "}
            </span>
            <span className="text-xs text-gray-500">تومان</span>
          </div>
          <div
            // onClick={() => setShowStatus(true)}
            className={`w-[150px] cursor-pointer border min-w-[150px] relative  flex items-center justify-center gap-2 ${statusbg[stsItem]} rounded-[8px] px-2 py-1 sm:py-2 text-sm font-bold`}
          >
            {/* <FaAngleDown
              className={`w-5 h-5  right-2 ${
                showStatus ? "rotate-180" : "rotate-0"
              } transition-all duration-500`}
            /> */}
            {orderStatusToPersian(stsItem)}
          </div>
          {/* <div
            id="statusitems"
            className={`absolute cursor-pointer z-[3] bg-white border top-10 left-0 right-0 rounded-[8px] overflow-hidden transition-all duration-500 ${
              showStatus ? " opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {statusItems.map((sts) => (
              <div
                onClick={() => {
                  statusHandler(sts);
                }}
                key={sts}
                className={`p-2 ${statusbg[sts]} flex justify-between items-center border-b  hover:bg-opacity-100`}
              >
                {orderStatusToPersian(sts)}
                <div className="w-5 h-5">
                  {stsItem == sts ? <FaCheck /> : <></>}
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
      <div className="w-full  border-t py-2">
        <h1 className="font-bold">لیست سفارش ها</h1>
        <div className="w-full flex flex-col gap-4 py-4 lg:grid lg:grid-cols-2">
          {data?.items?.map((order) => (
            <OrderSingleItem key={order?._id} order={order} />
          ))}
        </div>
        <div className="flex justify-start gap-2 font-bold border-b pb-2">
          <span>قیمت کل:</span>
          <span>{formatNumberToPersian(data?.allCost)}</span>
        </div>
      </div>
      <div className="w-full border-b pb-2">
        <span className="font-bold">آدرس دقیق:</span>
        <span className="pr-2">{data?.address}</span>
      </div>
      <div className="w-full border-b pb-2">
        <span className="font-bold">شماره موبایل:</span>
        <span className="pr-2">{data?.mobileNumber}</span>
      </div>
      <div
        className={`w-full border-b pb-2 ${
          data?.phoneNumber.length ? "" : "hidden"
        }`}
      >
        <span className="font-bold"> تلفن ثابت:</span>
        <span className="pr-2">{data?.phoneNumber}</span>
      </div>
      <div className="w-full border-b pb-2">
        <span className="font-bold">کد پستی:</span>
        <span className="pr-2">{data?.postalCode}</span>
      </div>
      <div
        className={`w-full border-b pb-2 ${data?.email.length ? "" : "hidden"}`}
      >
        <span className="font-bold">ایمیل:</span>
        <span className="pr-2">{data?.email}</span>
      </div>
      <div
        className={`w-full border-b pb-2 ${
          data?.additionalInfo.length ? "" : "hidden"
        }`}
      >
        <span className="font-bold">توضیحات تکمیلی:</span>
        <span className="pr-2">{data?.additionalInfo}</span>
      </div>
    </div>
  );
};

export default UserOrderSinglePage;
