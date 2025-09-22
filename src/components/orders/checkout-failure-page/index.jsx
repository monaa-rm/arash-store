"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaSadTear } from "react-icons/fa";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const CheckoutFailurePage = () => {
  const { data: session, status } = useSession();
  return (
    <div className="w-full fixed top-0 left-0 right-0 bottom-0 bg-white z-[2] flex flex-col gap-4 items-center justify-center">
      <div className=" w-full flex  justify-center items-center gap-2">
        <FaSadTear className="w-10 h-10 text-red-500" />
        <span className="font-bold text-lg">متاسفانه مشکلی در فرآیند خرید پیش آمد</span>
      </div>
      <div className="w-full flex justify-center items-center gap-4">
        <Link
          href={`/search`}
          className="font-bold text-gray-700 border-b-2 border-transparent hover:border-blue-600 transition-all duration-300 hover:text-blue-600"
        >
          محصولات
        </Link>
        <Link
          href={`/`}
          className="font-bold text-gray-700 border-b-2 border-transparent hover:border-blue-600 transition-all duration-300 hover:text-blue-600"
        >
          خانه
        </Link>
      </div>
    </div>
  );
};

export default CheckoutFailurePage;
