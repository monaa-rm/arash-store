"use client";

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="mb-8">
          <h2 className="mt-6 text-6xl font-extrabold text-gray-900 dark:text-gray-100">
            404
          </h2>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
            صفحه پیدا نشد
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            متاسفانه صفحه ای که دنبال آن هستید پیدا نشد
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center group max-h-12 px-4 py-2 gap-2 border border-transparent text-base font-medium
             rounded-[8px] text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-indigo-500"
          >
            رفتن به خانه
            <svg className=" w-6 pl-2 group-hover:pl-0 transition-all duration-300 ">
              <use href="/sprite.svg#item_arrow_left" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="mt-16 w-full max-w-2xl">
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-gray-100 dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400">
              اگر فکر میکنید اشتباهی رخ داده، با پشتیبانی تماس بگیرید
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
