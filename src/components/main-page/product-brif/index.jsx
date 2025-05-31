"use client";

import ProductBrifImages from "@/components/elements/produc-brif-images";
import { BlurFade } from "@/components/magicui/blur-fade";
import { setShowProductBrif } from "@/features/globalSlice";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
const product = {
  id: "1",
  title: "سنسور 5KΩ چفتن (بدون سوکت)",
  company: "mio mio",
  images: [
    "/images/sample/1.jpg",
    "/images/sample/2.jpg",
    "/images/sample/3.jpg",
  ],
  rating: 4,
  rating_number: 50,
  comments_number: 21,
  properties: ["مقاومت 5KΩ", " بدون سوکت"],
};
const ProductBrif = () => {
  const showProductBrif = useSelector(
    (store) => store.globalSlice.showProductBrif
  );
  const productBrifItem = useSelector(
    (store) => store.globalSlice.productBrifItem
  ) || null;
  const dispatch = useDispatch();
  const innerDivRef = useRef(null);
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#productBrif")) {
        dispatch(setShowProductBrif(false));
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);
  useEffect(() => {
    if(productBrifItem){
      //inja serahc konam etelaat ro bgirm
    }
  },[productBrifItem])
  useEffect(() => {
    if (showProductBrif && innerDivRef.current) {
      innerDivRef.current.scrollTop = 0; // این خط اسکرول را به بالا تنظیم می‌کند
    }
  }, [showProductBrif]);


  return (
    <div
      className={`fixed flex justify-center items-center top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 z-20 ${
        showProductBrif ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300`}
    >
      <div
        className="bg-white  rounded-xl overflow-hidden w-10/12 sm:w-9/12 md:w-8/12"
        id="productBrif"
      >
        <div
          ref={innerDivRef}
          className=" overflow-y-auto  p-4 pt-8 md:pt-4 border-gray-300  h-[500px] relative "
        >
          <div className="flex flex-col md:flex-row gap-2 h-full ">
            <div className="w-full md:w-1/2 h-64 md:h-full flex justify-center items-center">
              <ProductBrifImages images={product?.images} />
            </div>
            <div className="w-full h-full md:w-1/2 border-t md:border-0 border-b py-2 flex flex-col md:justify-center gap-2 ">
              <div className=" flex flex-col gap-0.5">
                <h1 className="font-bold text-xl">{product.title}</h1>
                <span className="text-xs text-gray-400">{product.company}</span>
              </div>
              <div className="flex justify-start items-center gap-2 border-t pt-2">
                <div className="flex justify-center items-center gap-1 rounded-md bg-gray-200 px-1">
                  <FaStar className="text-white w-4 h-4 " />
                  <span className="text-sm text-gray-700">
                    {product.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-700">
                  از {product.rating_number} رای
                </span>
                <span className="text-gray-300 text-sm">|</span>
                <span className="text-blue-400 text-sm">
                  {product.comments_number} دیدگاه
                </span>
              </div>
              <div className="flex flex-col gap-2 border-t py-2">
                <h3 className="text-md font-bold style">ویژگی های محصول</h3>
                <ul className="list-disc list-inside">
                  {product?.properties?.map((item, i) => (
                    <li className="text-gray-500 text-sm " key={i}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            <div className="flex gap-2 md:absolute bottom-4 left-4 items-center justify-end pt-6 ">
              <button
                type="button"
                onClick={() => dispatch(setShowProductBrif(false))}
                className="px-2 py-1 border bg-white hover:bg-gray-100 rounded-md transition-all duration-300 "
              >
                بستن
              </button>
              <Link
                href={"/"}
                type="button"
                className="px-2 py-1 border bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-all duration-300"
              >
                مشاهده محصول
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBrif;
