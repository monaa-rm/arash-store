import Image from "next/image";
import { MdZoomOutMap } from "react-icons/md";
import {
  IoIosHeartEmpty,
  IoIosSearch,
  IoMdHeart,
  IoMdHeartEmpty,
} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setProductBrifItem, setShowProductBrif } from "@/features/globalSlice";
import Link from "next/link";
import { formatNumberToPersian } from "@/utiles/utils-func";
import { useState } from "react";

const BestSellerSliderItem = ({ data, hideBreef }) => {
  const [isLiked, setIsLiked] = useState(false);
  const showPriceGlobal = useSelector(
    (store) => store.globalSlice.showPriceGlobal
  );
  const dispatch = useDispatch();
  const { _id, title, price, imageSrc } = data;
  return (
    <div className="px-4 w-full flex justify-center" dir="rtl">
      <div className="relative w-full flex justify-center min-w-[200px] max-w-56 group group overflow-hidden text-gray-50 h-72   border border-gray-200 rounded-2xl hover:duration-700 duration-700">
        <div className="relative top-0  w-full h-56 left-0 right-0">
          <Image
            src={imageSrc[0].file}
            alt={imageSrc[0].file}
            fill
            className="object-cover"
          />
        </div>
        {/* <div className="w-full h-72 text-gray-800">
          <div className="flex flex-row justify-between"> */}
        <div
          className={`${
            hideBreef && "hidden"
          } absolute left-2 top-2 rounded-md  bg-white bg-opacity-50 p-0.5`}
        >
          <MdZoomOutMap
            className="cursor-pointer"
            onClick={() => {
              dispatch(setProductBrifItem(_id));
              dispatch(setShowProductBrif(true));
            }}
          />
        </div>
        {/* </div>
        </div> */}
        <div className="absolute bg-gradient-to-b from-gray-50 to-gray-200 -bottom-12 w-full px-2 py-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
          <Link
            href={`/products/${data._id}`}
            className="text-blue-900 cursor-pointer font-bold text-sm line-clamp-1  group-hover:line-clamp-2"
          >
            {title}
          </Link>
          <div className=" font-bold text-left py-1 pl-2 text-yellow-600 text-xs">
            {showPriceGlobal
              ? `${formatNumberToPersian(price.howMuch)} تومان`
              : "تماس بگیرید "}
          </div>
          <div className="flex justify-center items-center gap-1 border-t pt-2">
            <Link href={`/`}>
              <IoIosSearch className="w-7 h-7 cursor-pointer text-zinc-800 hover:text-blue-700 transition-all duration-300" />
            </Link>
            {isLiked ? (
              <IoMdHeart className="w-7 h-7 cursor-pointer text-blue-700 transition-all duration-300" />
            ) : (
              <IoMdHeartEmpty className="w-7 h-7 cursor-pointer text-zinc-800 hover:text-blue-700 transition-all duration-300" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerSliderItem;
