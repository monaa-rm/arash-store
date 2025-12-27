"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavorites,
  setProductBrifItem,
  setShowProductBrif,
} from "@/features/globalSlice";
import Link from "next/link";
import { formatNumberToPersian, slugify } from "@/utiles/utils-func";
import { useEffect, useState } from "react";

const BestSellerSliderItem = ({ data, hideBreef }) => {
  let favorites = useSelector((store) => store?.globalSlice?.favorites) || [];
  const [isLiked, setIsLiked] = useState(false);
  const showPriceGlobal =
    useSelector((store) => store.globalSlice.showPriceGlobal) || false;
  const dispatch = useDispatch();
  const { _id, title, price, imageSrc } = data;
  const prdslug = slugify(title);
  useEffect(() => {
    const favs = localStorage.getItem("favorites");
    const parsedFavs = favs ? JSON.parse(favs) : [];
    dispatch(setFavorites(parsedFavs)); // به‌روزرسانی وضعیت local
  }, [data?._id]);
  useEffect(() => {
    if (favorites.length) {
      favorites.includes(data?._id) ? setIsLiked(true) : setIsLiked(false);
    }
  }, [data?._id, favorites]);

  const favoriteHandler = async () => {
    try {
      if (isLiked) {
        setIsLiked(false);
        console.log(_id);
        const newFavorites = favorites.filter((item) => item !== _id);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        dispatch(setFavorites(newFavorites));
      } else {
        setIsLiked(true);
        const newFavorites = [...favorites, _id];
        console.log(newFavorites);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        dispatch(setFavorites(newFavorites));
      }
    } catch (error) {
      setIsLiked(isLiked);
    }
  };
  return (
    <div className="px-4 w-full flex justify-center" dir="rtl">
      <div className="relative w-full flex justify-center min-w-[200px] max-w-56 group group overflow-hidden text-gray-50 h-72   border border-gray-200 rounded-[16px] hover:duration-700 duration-700">
        <div className="relative top-0  w-full h-56 left-0 right-0">
          <Image
            src={imageSrc[0].file}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width : 600px) 100vw,(max-width : 800px) 50vw , 25vw"
          />
        </div>

        <button
          type="button"
          className={`${
            hideBreef && "hidden"
          } absolute left-2 top-2 rounded-[4px] cursor-pointer  bg-white bg-opacity-50 p-0.5`}
          onClick={() => {
            dispatch(setProductBrifItem(_id));
            dispatch(setShowProductBrif(true));
          }}
        >
          <svg className="w-4 h-4 text-white ">
            <use href="/sprite.svg#arrow_pointing_out" />
          </svg>
        </button>

        <div className="absolute bg-gradient-to-b from-gray-50 to-gray-200 -bottom-12 w-full px-2 py-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
          <Link
            href={`/products/${_id}/${prdslug}`}
            className="text-blue-900 cursor-pointer font-bold text-sm line-clamp-1  group-hover:line-clamp-2"
          >
            <h3>{title}</h3>
          </Link>
          <div className=" font-bold text-left py-1 pl-2 text-yellow-600 text-xs">
            {showPriceGlobal
              ? `${formatNumberToPersian(price.howMuch)} تومان`
              : "تماس بگیرید "}
          </div>
          <div className="flex justify-center items-center gap-1 border-t pt-2">
            <button
              type="button"
              onClick={() => {
                dispatch(setProductBrifItem(_id));
                dispatch(setShowProductBrif(true));
              }}
            >
              <svg className="w-7 h-7 cursor-pointer bg-none  text-zinc-600 hover:text-blue-700 transition-all duration-300">
                <use href="/sprite.svg#search_mark" />
              </svg>
            </button>
            <button type="button" onClick={() => favoriteHandler()}>
              {isLiked ? (
                <svg className="w-7 h-7 cursor-pointer text-blue-600 hover:text-blue-700 transition-all duration-300">
                  <use href="/sprite.svg#filled_heart" />
                </svg>
              ) : (
                <svg className="w-7 h-7 cursor-pointer hover:text-blue-700 text-zinc-800 transition-all duration-300">
                  <use href="/sprite.svg#outline_heart" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerSliderItem;
