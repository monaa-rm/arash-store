"use client";

import Link from "next/link";

const MainCategoryItem = ({ title, icon, cat, children }) => {
  return (
    <Link
      href={`/category/${cat?.link}`}
      className="pt-2 hover:pt-0 transition-all duration-300 ease-in-out relative  w-full h-24"
    >
      <div
        className=" z-[1] relative w-full group border overflow-hidden border-zinc-300  shadow-2xl rounded-[10px] h-[88px] bg-white
   hover:bg-blue-700 hover:border-blue-700 cursor-pointer text-blue-700 hover:text-white font-bold flex items-center justify-center transition-all duration-300 ease-in-out"
      >
        <span className="text-zinc-600  text-4xl absolute top-1/2 -translate-y-1/2 right-4 z-[3]">
          <svg className="w-10 h-10 text-gray-600 group-hover:text-white">
            <use href={`/sprite.svg#${icon}`} />
          </svg>
        </span>
        <h2>{title}</h2>
        <span className="bg-neutral-200 shadow-neutral-400 absolute -top-[150%] left-0 w-full h-24 inline-flex rounded-md opacity-10 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
      </div>
      <div className="w-11/12 absolute rounded-br-[16px] rounded-bl-[16px] bg-[rgba(29,79,216,0.16)] h-10 bottom-0 left-1/2 -translate-x-1/2 "></div>
    </Link>
  );
};

export default MainCategoryItem;
