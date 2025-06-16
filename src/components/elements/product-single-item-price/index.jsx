"use client";
import { formatNumberToPersian } from "@/utiles/utils-func";
import { useSelector } from "react-redux";

const ProductSingleItemPrice = ({ price }) => {
  const showPriceGlobal =
    useSelector((store) => store.globalSlice.showPriceGlobal);
    console.log(showPriceGlobal)
  return (
    <div className="flex  justify-center items-center gap-1 px-1.5 sm:pt-0">
      <span className="">قیمت:</span>
      {showPriceGlobal ? (
        <span className="text-blue-600 text-sm ">
          {formatNumberToPersian(price)} تومان
        </span>
      ) : (
        <span className="text-blue-600 text-xs ">تماس بگیرید</span>
      )}
    </div>
  );
};

export default ProductSingleItemPrice;
