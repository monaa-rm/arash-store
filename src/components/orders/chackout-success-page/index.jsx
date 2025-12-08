"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const CheckoutSuccessPage = () => {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <main className="w-full fixed top-0 left-0 right-0 bottom-0 bg-white z-[2] flex flex-col gap-4 items-center justify-center">
      <div className=" w-full flex  justify-center items-center gap-2">
         <svg className="w-14 h-14 text-green-500">
          <use href="/sprite.svg#checked_icon" />
        </svg>
        <h2 className="font-bold text-lg">خرید با موفقیت انجام شد</h2>
      </div>
      <div className="w-full flex justify-center items-center gap-4">
        <Link
          href={`/dashboard/${session?.user?.role}`}
          className="font-bold text-gray-700 border-b-2 border-transparent hover:border-blue-600 transition-all duration-300 hover:text-blue-600"
        >
          داشبورد
        </Link>
        <Link
          href={`/`}
          className="font-bold text-gray-700 border-b-2 border-transparent hover:border-blue-600 transition-all duration-300 hover:text-blue-600"
        >
          خانه
        </Link>
      </div>
    </main>
  );
};

export default CheckoutSuccessPage;
