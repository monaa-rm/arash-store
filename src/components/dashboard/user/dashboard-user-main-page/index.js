"use client";

import { setDashboardActiveItem, setUserDashboardActiveItem } from "@/features/globalSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DashboradUserMainPage = ({}) => {
  const dashboardActiveItem = useSelector(
    (store) => store?.globalSlice?.dashboardActiveItem
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setUserDashboardActiveItem({ title: "داشبورد", link: "mainmanager" })
    );
  }, []);
  return (
    <div className="  p-4">
      <div className="  w-full flex justify-center">
        <div className="grid  grid-cols-2 gap-2 max-w-fit justify-center ">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-32 md:w-40 h-24 md:h-28 font-bold md:text-lg rounded-[8px] shadow-lg text-white">
            <Link
              href={`/dashboard/user/comments`}
              className="w-full h-full  cursor-pointer hover:scale-105 transition-all duration-500 flex justify-center items-center"
            >
           دیدگاه ها
            </Link>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-lime-500 w-32 md:w-40 h-24 md:h-28 font-bold md:text-lg rounded-[8px] shadow-lg text-white ">
            <Link
              href={`/dashboard/user/order-list`}
              className="w-full h-full  cursor-pointer hover:scale-105 transition-all duration-500 flex justify-center items-center"
            >
              لیست سفارش ها
            </Link>
          </div>

          <div className="bg-gradient-to-r from-yellow-300 to-amber-500 w-32 md:w-40 h-24 md:h-28 font-bold md:text-lg rounded-[8px]  shadow-lg text-white ">
            <Link
              href={`/dashboard/user/order-basket`}
              className="w-full h-full  cursor-pointer hover:scale-105 transition-all duration-500 flex justify-center items-center"
            >
             سبد خرید
            </Link>
          </div>
          <div className="bg-gradient-to-r from-teal-500 to-sky-500 w-32 md:w-40 h-24 md:h-28 font-bold md:text-lg rounded-[8px]  shadow-lg text-white ">
            <Link
              href={`/dashboard/user/favorites`}
              className="w-full h-full  cursor-pointer hover:scale-105 transition-all duration-500 flex justify-center items-center"
            >
           علاقه مندی ها
            </Link>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default DashboradUserMainPage;
