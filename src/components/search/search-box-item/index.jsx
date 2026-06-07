"use client";
import Image from "next/image";
import Link from "next/link";
import {
  formatNumberToPersian,
  getFromLocalStorage,
  slugify,
} from "@/utiles/utils-func";
import { useEffect, useState } from "react";
import SearchItemAddToCart from "@/components/elements/search-item-add-to-cart";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "@/features/globalSlice";

const SearchBoxItem = ({ item }) => {
  const [shopping, setShopping] = useState(false);
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState("");
  const [reload, setReload] = useState(-1);
  const prdslug = slugify(item?.title);
  let favorites = useSelector((store) => store?.globalSlice?.favorites) || [];
  const [isLiked, setIsLiked] = useState(false);
  const showPriceGlobal =
    useSelector((store) => store.globalSlice.showPriceGlobal) || false;
  const orderProducts =
    useSelector((store) => store.orderSlice.orderProducts) || [];
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest(`#searchBoxItem${item?._id}`)) {
        setShopping(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);
  useEffect(() => {
    let orders = getFromLocalStorage("orders");
    const orderedProduct = orders?.find((product) => product?.id == item?._id);
    if (orderedProduct?.id) {
      setCount(Number(orderedProduct?.quantity));
      setMsg(`${orderedProduct?.quantity} عدد در سبد خرید`);
    } else {
      setMsg("");
    }
  }, [reload]);
  useEffect(() => {
    const favs = localStorage.getItem("favorites");
    const parsedFavs = favs ? JSON.parse(favs) : [];
    dispatch(setFavorites(parsedFavs)); // به‌روزرسانی وضعیت local
  }, [item?._id]);
  useEffect(() => {
    if (favorites.length) {
      favorites.includes(item?._id) ? setIsLiked(true) : setIsLiked(false);
    }
  }, [item?._id, favorites]);

  const favoriteHandler = async () => {
    try {
      if (isLiked) {
        console.log("is liked")
        setIsLiked(false);
        const newFavorites = favorites.filter((item) => item !== item?._id);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        dispatch(setFavorites(newFavorites));
      } else {
        console.log("isnt like")
        setIsLiked(true);
        const newFavorites = [...favorites, item?._id];
        console.log(newFavorites);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        dispatch(setFavorites(newFavorites));
      }
    } catch (error) {
      setIsLiked(isLiked);
    }
  };
  return (
    <article
      id={`searchBoxItem${item?._id}`}
      className="group mb-2 relative w-full h-[300px] flex justify-center items-center z-0  [perspective:1000px]"
    >
      <div
        className={`absolute flex justify-center items-center duration-1000 w-full h-full [transform-style:preserve-3d] ${
          shopping && " [transform:rotateX(180deg)]"
        } `}
      >
        {/* main section */}
        <div
          className=" absolute w-full overflow-hidden max-w-[260px] border rounded-[10px] hover:shadow-md transition-all
         duration-500 h-[300px] "
        >
          <div className="w-full h-48 relative">
            <Image
              src={item?.imageSrc[0]?.file}
              fill
              sizes="256px"
              className="object-fill"
              alt={item?.title}
            />
          </div>
          <div className="w-full flex flex-col gap-0.5 p-2">
            <Link
              href={`/products/${item._id}/${prdslug}`}
              className=" cursor-pointer font-bold text-sm line-clamp-1 "
            >
              {item?.title}
            </Link>
            <div className="flex justify-start items-center gap-1 pt-3">
              {/* <LuBoxes
                className={`w-4 h-4 ${
                  item?.instock == 0 ? "text-rose-600" : "text-blue-400"
                } `}
              /> */}
              <svg
                className={`w-4 h-4 ${
                  item?.instock == 0 ? "text-rose-600" : "text-blue-400"
                } `}
              >
                <use href="/sprite.svg#instock_icon" />
              </svg>
              {item?.instock == 0 ? (
                <span className="text-xs text-rose-600">ناموجود</span>
              ) : (
                <span className="text-xs text-zinc-500">
                  {item?.instock} {item?.unit} در انبار
                </span>
              )}
            </div>
            <div className="flex justify-between items-center gap-2  pt-2">
              <div className=" flex justify-center items-center gap-1">
                <div
                  onClick={() => {
                    if (showPriceGlobal) setShopping(true);
                  }}
                  className={`w-7 h-7 relative group flex justify-center items-center rounded-[6px] ${
                    count > 0
                      ? "bg-green-500 hover:bg-green-600"
                      : " bg-blue-700 hover:bg-blue-800"
                  }
                       cursor-pointer  transition-all duration-300 ease-in-out `}
                >
                  <div
                    className={`px-1 h-4 rounded-full justify-center items-center border bg-white text-xs absolute -top-2 right-5 ${
                      count > 0 ? "flex" : "hidden"
                    }`}
                  >
                    {count}
                  </div>
                  <svg
                    className={`w-6 h-6  transition-all
                       duration-300 ease-in-out text-white`}
                  >
                    <use href="/sprite.svg#shopp_icon" />
                  </svg>
                </div>
                <button
                  type="button"
                  className=""
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
                </button>
              </div>
              {showPriceGlobal ? (
                <div className="flex justify-center items-center gap-1">
                  <span className="font-bold text-sm">
                    {formatNumberToPersian(item?.price?.howMuch)}
                  </span>
                  <span className="text-zinc-500 text-xs">تومان</span>
                </div>
              ) : (
                <div className="flex justify-center items-center gap-1">
                  <span className="text-blue-600 text-sm">تماس بگیرید</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* add to cart section */}
        <div
          className="absolute w-full overflow-hidden max-w-[260px] border rounded-[10px] hover:shadow-md transition-all 
        duration-500 h-[300px]  bg-gradient-to-br from-white to-gray-200  p-6 text-white [transform:rotateX(180deg)] 
        [backface-visibility:hidden]"
        >
          <div className="flex flex-col w-full h-full">
            <div
              onClick={() => setShopping(false)}
              className=" w-9 h-7 flex items-center justify-center cursor-pointer rounded-[4px] bg-blue-700 hover:bg-blue-800 transition-all duration-300 ease-in-out "
            >
              <svg className="w-6 h-6 text-white rotate-180">
                <use href="/sprite.svg#item_arrow_left" />
              </svg>
            </div>
            <div className="flex flex-col gap-4 w-full pt-4 text-blue-950 font-bold relative ">
              <p className="text-sm line-clamp-2">{item?.title}</p>
              <SearchItemAddToCart
                count={count}
                setCount={setCount}
                price={item?.price}
                hidebg={true}
                productCount={item?.instock}
                prdId={item?._id}
                msg={msg}
                setReload={setReload}
                reload={reload}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SearchBoxItem;
