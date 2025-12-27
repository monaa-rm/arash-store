"use client";

import ProductAddToCart from "@/components/elements/product-add-to-cart";
import Link from "next/link";
import SimiliarProducts from "../similar-products";
import ProductDescComment from "../product-desc-comment";
import ProductSingleItemImage from "@/components/elements/product-single-item-image";
import ProductSingleItemPrice from "@/components/elements/product-single-item-price";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setFavorites } from "@/features/globalSlice";

const ProductSingleItemPage = ({ data, similiarProducts }) => {
  let favorites = useSelector((store) => store?.globalSlice?.favorites) || [];
  let freeSending =
    useSelector((store) => store?.globalSlice?.freeSending) || false;
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const favs = localStorage.getItem("favorites");
    const parsedFavs = favs ? JSON.parse(favs) : [];
    dispatch(setFavorites(parsedFavs)); // به‌روزرسانی وضعیت local
  }, [data?._id]);
  useEffect(() => {
    favorites.includes(data?._id) ? setIsLiked(true) : setIsLiked(false);
  }, [data?._id, favorites]);

  const favoriteHandler = async () => {
    try {
      if (isLiked) {
        setIsLiked(false);
        const newFavorites = favorites.filter((item) => item !== data?._id);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        dispatch(setFavorites(newFavorites));
      } else {
        setIsLiked(true);
        const newFavorites = [...favorites, data?._id];
        console.log(newFavorites);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        dispatch(setFavorites(newFavorites));
      }
    } catch (error) {
      // setIsLiked(isLiked);
    }
  };
  return (
    <div className="w-full px-4 py-8 flex flex-col gap-4 relative">
      <div className=" w-full p-4 md:h-[500px] border rounded-xl bg-zinc-50 flex flex-col gap-10 md:gap-0 md:flex-row  justify-center items-center ">
        {/* قسمت عکس */}
        <ProductSingleItemImage imageSrc={data?.imageSrc} alt={data?.title} />
        {/* مشخصات */}
        <div className="w-full h-full ">
          <div className=" w-full h-full xl:h-[460px] rounded-xl border shadow-sm px-2 pb-12 flex flex-col  py-4 lg:px-8 lg:py-6 relative">
            {/* title  */}
            <div className="  lg:text-xl w-full font-[vazirbold] border-b pb-2">
              <h2 className="w-full ">{data?.title}</h2>
            </div>
            {/* comment score price  */}
            <div className=" w-full flex flex-wrap justify-between items-start gap-1 pt-2">
              <div className="flex justify-start items-center gap-1">
                <div className="flex text-white justify-center items-center gap-0.5 bg-zinc-400 rounded-[4px] px-1.5">
                  <svg className="w-3.5 h-3.5 text-inherit">
                    <use href="/sprite.svg#filled_star" />
                  </svg>
                  <span className="text-sm mt-0.5">{data?.score}</span>
                </div>
                <svg className="h-3 w-3 text-zinc-300">
                  <use href="/sprite.svg#dot_icon" />
                </svg>
                <div className="flex justify-center items-center gap-0.5">
                  <span className="text-sm text-zinc-400 mt-0.5">
                    {data?.commentsNumber
                      ? `${data?.commentsNumber} دیدگاه`
                      : "بدون دیدگاه"}
                  </span>
                </div>
              </div>
              <div className="flex  justify-center items-center gap-0.5 px-1.5">
                <span className="text-sm">شناسه محصول:</span>
                <span className="text-sm text-zinc-400 mt-0.5">
                  {data?.productId}
                </span>
              </div>
              {/* قسمت قیمت */}
              <ProductSingleItemPrice price={data?.price?.howMuch} />
            </div>
            {/* product properties */}
            <div className="w-full pt-4  xl:pt-8 flex flex-col gap-2">
              <h1 className="font-bold ">ویژگی های محصول</h1>
              {data?.properties?.length ? (
                <div
                  className={` properties w-full h-28 ${
                    data?.properties?.length > 3 && "overflow-y-scroll"
                  }  flex flex-col gap-2 pr-2 py-2 `}
                  dir="ltr"
                >
                  {data?.properties?.map((item, i) => (
                    <div
                      dir="rtl"
                      key={i}
                      className="flex justify-start items-start gap-2  text-sm "
                    >
                      <svg className="h-3 w-3 min-w-3 min-h-3 text-zinc-300 mt-1">
                        <use href="/sprite.svg#dot_icon" />
                      </svg>
                      <span> {item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-zinc-400 text-sm">
                  هیج ویژگی ثبت نشده است.
                </div>
              )}
            </div>
            {/* add to cart */}
            <ProductAddToCart
              price={data?.price?.howMuch}
              productCount={data?.instock}
              unit={data?.unit}
              id={data?._id}
            />
            {/* like and share  and category */}
            <div className=" h-10 flex bg-transparent justify-between items-center px-2 lg:px-8 gap-3 absolute bottom-0 left-0 right-0 border-t">
              <div className="flex justify-center items-center gap-2">
                <span className="">دسته:</span>
                {data?.category?.length ? (
                  <div className="flex gap-1">
                    {data?.category?.map((cat, i) => (
                      <Link
                        key={cat._id}
                        className=" flex gap-1  text-sm text-zinc-400"
                        href={`/category/${cat?.link}`}
                      >
                        <span className="cursor-pointer  hover:text-blue-600 transition-all duration-300 ease-in-out">
                          {cat.name}
                        </span>
                        <span>
                          {i !== data?.category?.length - 1 ? "-" : ""}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href="/"
                    className="text-zinc-400 text-sm  transition-all duration-300 ease-in-out"
                  >
                    بدون دسته بندی{" "}
                  </Link>
                )}
              </div>
              <div className=" flex items-center text-zinc-500 gap-2">
                <div className=" cursor-pointer">
                  <svg className="w-6 h-6 hover:text-blue-600 transition-all duration-300 ease-in-out">
                    <use href="/sprite.svg#share_icon" />
                  </svg>
                </div>
                <div
                  className=" cursor-pointer"
                  onClick={() => favoriteHandler()}
                >
                  {isLiked ? (
                    <svg className="w-7 h-7 cursor-pointer text-blue-600 hover:text-blue-700 transition-all duration-300">
                      <use href="/sprite.svg#filled_heart" />
                    </svg>
                  ) : (
                    <svg className="w-7 h-7 cursor-pointer hover:text-blue-700 text-zinc-800 transition-all duration-300">
                      <use href="/sprite.svg#outline_heart" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            {/* is available or not */}
            <div className="rounded-xl w-full flex flex-col md:flex-row justify-around gap-3 lg:gap-2 xl:gap-3 p-4 border mt-8 md:mt-4 lg:mt-6 ">
              <div className="flex justify-start items-center gap-3">
                <svg
                  className={`w-5 h-5 ${
                    data?.instock == 0 ? "text-rose-600" : "text-blue-600"
                  } `}
                >
                  <use href="/sprite.svg#instock_icon" />
                </svg>
                {data?.instock == 0 ? (
                  <span className="text-xs ">در انبار موجود نیست</span>
                ) : (
                  <span className="text-xs ">
                    {data?.instock} {data?.unit} موجود در انبار
                  </span>
                )}
              </div>
              <div className="flex justify-start items-center gap-3">
                <div className="item">
                  <div className="loader-pulse"></div>
                </div>
                {freeSending ? (
                  <span className="text-xs font-bold">
                    ارسال رایگان توسط فروشگاه آرش
                  </span>
                ) : (
                  <span className="text-xs font-bold">
                    ارسال مطمئن توسط فروشگاه آرش
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SimiliarProducts similiarProducts={similiarProducts} />

      <ProductDescComment
        rate={data?.score}
        id={data?._id}
        description={data?.description}
        title={data?.title}
      />
    </div>
  );
};

export default ProductSingleItemPage;
