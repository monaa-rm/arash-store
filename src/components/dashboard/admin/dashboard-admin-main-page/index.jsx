"use client";

import { setDashboardActiveItem } from "@/features/globalSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DashboradAdminMainPage = ({}) => {
  const dashboardActiveItem = useSelector(
    (store) => store?.globalSlice?.dashboardActiveItem
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setDashboardActiveItem({ title: "داشبورد ادمین", link: "mainmanager" })
    );
  }, []);
  return (
    <div className="  p-4">
      <div className="  w-full flex justify-center">
        <div className="grid  grid-cols-2 md:grid-cols-3 gap-2 max-w-fit justify-center ">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-32 md:w-40 h-32 md:h-40 font-bold md:text-lg rounded-lg shadow-lg text-white">
            <Link
              href={`/dashboard/admin/new-product`}
              className="w-full h-full  cursor-pointer hover:scale-105 transition-all duration-500 flex justify-center items-center"
            >
              افزودن محصول
            </Link>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-teal-500 w-32 md:w-40 h-32 md:h-40 font-bold md:text-lg rounded-lg  shadow-lg text-white ">
            <Link
              href={`/dashboard/admin/categories`}
              className="w-full h-full  cursor-pointer hover:scale-105 transition-all duration-500 flex justify-center items-center"
            >
              دسته بندی ها
            </Link>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-lime-500 w-32 md:w-40 h-32 md:h-40 font-bold md:text-lg rounded-lg shadow-lg text-white ">
            <Link
              href={`/dashboard/admin/order-list`}
              className="w-full h-full  cursor-pointer hover:scale-105 transition-all duration-500 flex justify-center items-center"
            >
              لیست سفارش ها
            </Link>
          </div>

          <div className="bg-gradient-to-r from-yellow-300 to-amber-500 w-32 md:w-40 h-32 md:h-40 font-bold md:text-lg rounded-lg  shadow-lg text-white ">
            <Link
              href={`/dashboard/admin/messages`}
              className="w-full h-full  cursor-pointer hover:scale-105 transition-all duration-500 flex justify-center items-center"
            >
              پیام ها
            </Link>
          </div>
          <div className="bg-gradient-to-r from-teal-500 to-sky-500 w-32 md:w-40 h-32 md:h-40 font-bold md:text-lg rounded-lg  shadow-lg text-white ">
            <Link
              href={`/dashboard/admin/pay-reports`}
              className="w-full h-full  cursor-pointer hover:scale-105 transition-all duration-500 flex justify-center items-center"
            >
             گزارش گیری
            </Link>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 w-32 md:w-40 h-32 md:h-40 font-bold md:text-lg rounded-lg  shadow-lg text-white ">
            <Link
              href={`/dashboard/admin/pay-details`}
              className="w-full h-full  cursor-pointer hover:scale-105 transition-all duration-500 flex justify-center items-center"
            >
              جزئیات پرداخت ها
            </Link>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default DashboradAdminMainPage;
