"use client";

import { slugify } from "@/utiles/utils-func";
import Link from "next/link";
import { CgArrowLeft } from "react-icons/cg";
import { useSelector } from "react-redux";

const CropperSliderItem = ({ item }) => {
  const prdslug = slugify(item?.title);
  return (
    <div
      dir="rtl"
      className="w-full text-blue-500 flex justify-center items-center p-4"
    >
      <div
        className="h-[14em] w-full border-2 py-8 border-[rgba(255,255,255,0.5)] rounded-[1.5em]
       bg-gradient-to-br from-[rgba(38,37,87,0.52)] to-[rgba(255,255,255,0.01)] text-white 
       font-nunito p-[1em] flex justify-between items-left flex-col gap-4 backdrop-blur-[12px]"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold mb-2">{item?.title}</h3>
          <div>
            {item?.properties?.map((prop, i) => (
              <p key={i} className="text-[0.85em] line-clamp-1">
                {prop}
              </p>
            ))}
          </div>
        </div>

        <button
          className="h-fit w-fit px-[1em] py-[0.25em] border-[1px] rounded-full flex 
        justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em]
         duration-200 backdrop-blur-[12px]"
        >
          <Link href={`/products/${item?._id}/${prdslug}`}>مشاهده محصول</Link>
          <CgArrowLeft />
        </button>
      </div>
    </div>
  );
};

export default CropperSliderItem;
