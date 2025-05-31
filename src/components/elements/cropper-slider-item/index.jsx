"use client";

import Link from "next/link";
import { CgArrowLeft } from "react-icons/cg";

const CropperSliderItem = () => {
  return (
    /* From Uiverse.io by Uncannypotato69 */
    <div
      dir="rtl"
      className="w-full text-blue-500 flex justify-center items-center p-4"
    >
      <div className="h-[14em] w-full border-2 border-[rgba(255,255,255,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(38,37,87,0.52)] to-[rgba(255,255,255,0.01)] text-white font-nunito p-[1em] flex justify-center items-left flex-col gap-4 backdrop-blur-[12px]">
        <div>
          <h1 className="text-xl font-bold mb-2">لوله مسی 3/4 (کلاف) </h1>
          <p className="text-[0.85em] line-clamp-1">لوله شماره 20</p>
          <p className="text-[0.85em] line-clamp-1">
            قطر داخلی لوله 3/4 اینچ یا 19.05 میلی متر
          </p>
        </div>

        <button
          className="h-fit w-fit px-[1em] py-[0.25em] border-[1px] rounded-full flex 
        justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em]
         duration-200 backdrop-blur-[12px]"
        >
          <Link href={"/product/id"}>مشاهده محصول</Link>
          <CgArrowLeft />
        </button>
      </div>
    </div>
  );
};

export default CropperSliderItem;
