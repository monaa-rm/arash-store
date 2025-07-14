"use client";
import Image from "next/image";
import Link from "next/link";
import { LuBoxes, LuShoppingCart } from "react-icons/lu";
import { FaArrowRightLong, FaCartShopping } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import {
  formatNumberToPersian,
  getFromLocalStorage,
} from "@/utiles/utils-func";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import ProductAddToCart from "@/components/elements/product-add-to-cart";
import SearchItemAddToCart from "@/components/elements/search-item-add-to-cart";
import { useDispatch, useSelector } from "react-redux";
import { setOrderProducts } from "@/features/orderSlice";

const SearchBoxItem = ({ item }) => {
  const [shopping, setShopping] = useState(false);
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState("");
  const [reload, setReload] = useState(-1);
  const dispatch = useDispatch();
  const showPriceGlobal =
    useSelector((store) => store.globalSlice.showPriceGlobal) || false;
  const orderProducts =
    useSelector((store) => store.orderSlice.orderProducts) || [];
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
    console.log(orderProducts);
    if (orderedProduct?.id) {
      setCount(Number(orderedProduct?.quantity));
      setMsg(`${orderedProduct?.quantity} عدد در سبد خرید`);
    } else {
      setMsg("");
    }
  }, [reload]);
  // console.log({ orderedProduct });

  return (
    <div
      id={`searchBoxItem${item?._id}`}
      className="group relative w-full h-72 flex justify-center items-center  [perspective:1000px]"
    >
      <div
        className={`absolute flex justify-center items-center duration-1000 w-full h-full [transform-style:preserve-3d] ${
          shopping && " [transform:rotateX(180deg)]"
        } `}
      >
        {/* main section */}
        <div
          className=" absolute w-full overflow-hidden max-w-[260px] border rounded-2xl hover:shadow-md transition-all
         duration-500 h-72 "
        >
          <div className="w-full h-44 relative">
            <Image
              src={item?.imageSrc[0]?.file}
              fill
              className="object-fill"
              alt={item?.imageSrc[0]?.file}
            />
          </div>
          <div className="w-full flex flex-col gap-1 p-2">
            <Link
              href={`products/${item._id}`}
              className=" cursor-pointer font-bold text-sm line-clamp-1 "
            >
              {item?.title}
            </Link>
            <div className="flex justify-start items-center gap-1 pt-3">
              <LuBoxes
                className={`w-4 h-4 ${
                  item?.inStock == 0 ? "text-rose-600" : "text-blue-400"
                } `}
              />
              {item?.inStock == 0 ? (
                <span className="text-xs text-rose-600">ناموجود</span>
              ) : (
                <span className="text-xs text-zinc-500">
                  {item?.instock} {item?.unit} در انبار
                </span>
              )}
            </div>
            <div className="flex justify-between items-center gap-2  pt-2">
              <div className="w-8 h-8 flex justify-center items-center">
                <div
                  onClick={() => {
                    if (showPriceGlobal) setShopping(true);
                  }}
                  className="w-7 h-7 group flex justify-center items-center rounded-[6px] bg-blue-700 hover:bg-blue-800 hover:w-8 hover:h-8 cursor-pointer  transition-all duration-300 ease-in-out "
                >
                  <LuShoppingCart
                    className={`w-5 h-5 group-hover:w-[22px] group-hover:h-[22px] transition-all duration-300 ease-in-out text-white`}
                  />
                </div>
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
          className="absolute w-full overflow-hidden max-w-[260px] border rounded-2xl hover:shadow-md transition-all 
        duration-500 h-72  bg-gradient-to-br from-white to-gray-200  p-6 text-white [transform:rotateX(180deg)] 
        [backface-visibility:hidden]"
        >
          <div className="flex flex-col w-full h-full">
            <div
              onClick={() => setShopping(false)}
              className=" w-9 h-7 flex items-center justify-center cursor-pointer rounded-[4px] bg-blue-700 hover:bg-blue-800 transition-all duration-300 ease-in-out "
            >
              <FaArrowRightLong className="w-7 text-white" />
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
            {/* <div
              onClick={() => addToCartHandler()}
              className="flex justify-center items-center pt-6 "
            >
              <button className=" font-bold w-36 h-12 rounded bg-blue-600 text-white relative overflow-hidden group z-10 hover:text-white duration-1000">
                <span className="absolute bg-blue-700 w-40 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                <span className="absolute bg-blue-800 w-40 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
               {count > 0 && msg.length ? " ویرایش در سبد خرید" : " افزودن به سبد خرید"}
              </button>
            </div> */}
            {/* <div
              className={`${
                msg?.length ? "bg-orange-500" : "bg-none"
              } rounded-[6px] px-1 py-1 text-xs w-fit  absolute bottom-2 left-1/2 -translate-x-1/2`}
            >
              {msg}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBoxItem;
